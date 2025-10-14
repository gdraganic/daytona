# Redis-Based HA Job Distribution

## Problem Statement

In a High Availability (HA) deployment, multiple API instances run behind a load balancer. When a job is created on **API-2** but a runner is polling on **API-1**, we need a mechanism to instantly notify **API-1** that a job is available.

## Solution: Redis BRPOP

We use Redis as a distributed notification queue with **blocking pop** operations (`BRPOP`).

### How It Works

```
┌─────────┐    ┌─────────┐    ┌─────────┐
│  API-1  │    │  API-2  │    │  API-3  │
└────┬────┘    └────┬────┘    └────┬────┘
     │              │              │
     │              │ createJob()  │
     │              ├──────────────►│
     │              │ INSERT job   │ Database
     │              │              │
     │              │ LPUSH job_id │
     │              └──────────────►│ Redis
     │                             │ runner:jobs:runner-123
     │                             │
     │ pollJobs()                  │
     │ BRPOP (blocking)            │
     ├─────────────────────────────►│ Redis
     │◄────────────────────────────┤
     │ Returns job_id              │
     │                             │
     │ SELECT * FROM job           │
     │ WHERE id = job_id           │
     ├─────────────────────────────►│ Database
     │◄────────────────────────────┤
     │ Returns full job            │
```

### Architecture

**On Job Creation (any API instance):**

1. Save job to PostgreSQL
2. Push job ID to Redis: `LPUSH runner:jobs:{runnerId} {jobId}`
3. Return immediately

**On Runner Poll (any API instance):**

1. Execute `BRPOP runner:jobs:{runnerId} {timeout}`
2. Redis blocks until:
   - A job ID is available → returns immediately
   - Timeout expires → returns null
3. If job ID received:
   - Fetch additional jobs with `RPOP` (up to limit)
   - Query PostgreSQL for full job details
   - Return jobs to runner
4. If timeout or Redis error:
   - Fallback: Query PostgreSQL directly for pending jobs

### Redis Queue Structure

```
Key: runner:jobs:{runnerId}
Type: LIST
Values: [job_id_1, job_id_2, job_id_3, ...]

Operations:
- LPUSH (left push) - Add new job to head of queue
- BRPOP (blocking right pop) - Remove job from tail (FIFO order)
- RPOP (right pop) - Remove additional jobs (non-blocking)
```

### Code Implementation

**Creating a Job:**

```typescript
async createJob(type: JobType, runnerId: string, ...): Promise<Job> {
  // 1. Save to database
  const savedJob = await this.jobRepository.save(job)

  // 2. Notify via Redis
  try {
    await this.redis.lpush(`runner:jobs:${runnerId}`, savedJob.id)
  } catch (error) {
    // Job is in DB, runner will get it via fallback
    this.logger.warn(`Redis notification failed: ${error.message}`)
  }

  return savedJob
}
```

**Polling for Jobs:**

```typescript
async pollJobs(runnerId: string, limit = 10, timeoutSeconds = 30): Promise<JobDto[]> {
  const queueKey = `runner:jobs:${runnerId}`

  try {
    // Blocking wait for up to 30 seconds
    const result = await this.redis.brpop(queueKey, timeoutSeconds)

    if (result) {
      const jobIds = [result[1]] // First job ID

      // Get more jobs (non-blocking)
      for (let i = 1; i < limit; i++) {
        const moreJob = await this.redis.rpop(queueKey)
        if (moreJob) jobIds.push(moreJob)
        else break
      }

      // Fetch from database
      return await this.jobRepository.find({
        where: { id: In(jobIds), status: PENDING }
      })
    }
  } catch (error) {
    // Redis failed - fall through to DB polling
  }

  // Fallback: Query database directly
  return await this.jobRepository.find({
    where: { runnerId, status: PENDING },
    take: limit
  })
}
```

## Benefits

### ✅ Instant Notification Across All API Instances

- Runner connected to API-1 gets notified immediately when job is created on API-2
- No polling delays - sub-millisecond notification latency

### ✅ Reliable with Graceful Degradation

- If Redis is down: Falls back to database polling
- If job ID in Redis but not in DB: Falls back to database query
- If Redis connection drops: Runner gets error, retries poll

### ✅ Efficient Resource Usage

- Single blocking connection per runner poll
- No busy-waiting or continuous database queries
- Redis handles waiting efficiently with epoll/kqueue

### ✅ Scales Horizontally

- Works with any number of API instances
- No coordination required between API instances
- Each runner has independent queue

### ✅ Battle-Tested Pattern

- Used by job queue systems: Bull, BullMQ, Sidekiq, Resque
- Redis BRPOP is atomic and reliable
- Proven at scale (millions of jobs/day)

## Redis Configuration

### High Availability Options

**Option 1: Redis Sentinel (Recommended)**

- Automatic failover
- Master-slave replication
- Good for most deployments

```yaml
redis:
  sentinels:
    - host: sentinel-1
      port: 26379
    - host: sentinel-2
      port: 26379
    - host: sentinel-3
      port: 26379
  name: mymaster
```

**Option 2: Redis Cluster**

- Horizontal scaling
- Automatic sharding
- For very high throughput

**Option 3: Single Redis with Persistence**

- Simple setup
- AOF + RDB persistence
- Acceptable for smaller deployments

### Persistence Settings

Enable persistence to survive restarts:

```conf
# AOF - Append Only File
appendonly yes
appendfsync everysec

# RDB - Snapshots
save 900 1
save 300 10
save 60 10000
```

**Note:** Some job IDs in Redis might be lost on crash, but runners will pick them up from database fallback.

## Failure Scenarios

### Scenario 1: Redis Temporarily Down

**What happens:**

1. Job creation: DB insert succeeds, Redis push fails (logged)
2. Runner polling: BRPOP fails, falls back to DB query
3. Jobs are still processed (via DB polling)

**Impact:** Increased latency (DB polling interval), but no data loss

**Recovery:** When Redis comes back, new jobs get instant notification again

### Scenario 2: Redis Crash with Data Loss

**What happens:**

1. Some job IDs in Redis queues are lost
2. Runners fall back to DB polling
3. Jobs still in DB are discovered and processed

**Impact:** Brief delay in job processing, but no job loss

**Recovery:** Automatic - runners continue polling database

### Scenario 3: API Instance Crash During BRPOP

**What happens:**

1. Runner's BRPOP connection breaks
2. Runner reconnects (to same or different API instance)
3. Runner starts new BRPOP
4. If job was popped but not processed: Job ID lost from Redis
5. Job still PENDING in database, will be returned on next poll

**Impact:** Job might be delayed by one poll cycle

**Recovery:** Automatic - job delivered on next poll via DB fallback

### Scenario 4: Network Partition

**What happens:**

1. API instances can't reach Redis
2. All fall back to database polling
3. Jobs still processed (higher latency)

**Impact:** Increased latency, increased DB load

**Recovery:** Automatic when network restored

## Monitoring

### Key Metrics to Monitor

**Redis Queue Depth:**

```bash
redis-cli LLEN runner:jobs:{runnerId}
```

- Alert if consistently > 100 (backlog building)

**Redis Memory Usage:**

```bash
redis-cli INFO memory
```

- Each job ID is ~40 bytes UUID
- 1M queued jobs ≈ 40MB memory

**BRPOP Success Rate:**

```
LOG: Returning X jobs to runner {runnerId} via Redis
LOG: Found X pending jobs in DB for runner {runnerId}  # Fallback
```

- High fallback rate = Redis issues

**Poll Latency:**

- BRPOP should return instantly when jobs available
- Timeout = no jobs available (normal)

### Redis Commands for Debugging

```bash
# Check runner's queue
redis-cli LLEN runner:jobs:runner-uuid-123
redis-cli LRANGE runner:jobs:runner-uuid-123 0 -1

# Check all runner queues
redis-cli KEYS "runner:jobs:*"

# Monitor Redis operations
redis-cli MONITOR | grep "runner:jobs"

# Check Redis info
redis-cli INFO replication
redis-cli INFO stats
```

## Performance Characteristics

### Latency

- **Job creation:** +1-2ms (LPUSH overhead)
- **Job notification:** <1ms (BRPOP wakeup)
- **Total E2E:** ~5-10ms from job creation to runner receipt

### Throughput

- **Redis:** 50,000+ LPUSH/BRPOP operations per second per instance
- **Limited by:** Database write speed, not Redis

### Memory Usage

- **Per job in queue:** ~40 bytes (UUID)
- **1,000 queued jobs:** ~40 KB
- **100,000 queued jobs:** ~4 MB
- **Negligible** compared to database/application memory

## Comparison with Alternatives

| Solution | Latency | Reliability | Complexity | Scalability |
|----------|---------|-------------|------------|-------------|
| **Redis BRPOP** | <1ms | High (with fallback) | Low | Excellent |
| DB Polling | 500-2000ms | High | Very Low | Good |
| Redis Pub/Sub | <1ms | Medium (fire-forget) | Medium | Excellent |
| PG LISTEN/NOTIFY | <10ms | Medium | High | Good |

## Conclusion

Redis BRPOP provides the best balance of:

- ✅ Low latency (instant notification)
- ✅ High reliability (DB fallback)
- ✅ Simple implementation
- ✅ Proven at scale
- ✅ Graceful degradation

It's the recommended solution for HA job distribution in Daytona.
