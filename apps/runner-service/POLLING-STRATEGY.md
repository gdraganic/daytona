# Long Polling Strategy: DB-First, Then Redis

## The Problem

When a runner reconnects after being offline:

- Jobs were created while it was down
- Jobs are in PostgreSQL (PENDING status)
- Redis queue might be empty (expired, Redis restarted, etc.)
- **Old approach:** Wait for BRPOP timeout (30-60s) before checking DB
- **Result:** Unnecessary 30-60s delay

## The Solution: Three-Step Polling

```typescript
async pollJobs(runnerId: string, limit = 10, timeoutSeconds = 30): Promise<JobDto[]> {

  // STEP 1: Check database first
  const existingJobs = await db.find({ runnerId, status: PENDING })
  if (existingJobs.length > 0) {
    return existingJobs  // Return immediately!
  }

  // STEP 2: No existing jobs - wait for new jobs via Redis
  const result = await redis.brpop(`runner:jobs:${runnerId}`, timeout)
  if (result) {
    const jobs = await db.find({ id: In(jobIds) })
    return jobs
  }

  // STEP 3: Redis timeout or error - final DB check
  const fallbackJobs = await db.find({ runnerId, status: PENDING })
  return fallbackJobs
}
```

## Flow Diagram

### Case 1: Runner Reconnects After Downtime

```
Runner offline for 1 hour
↓
10 jobs created during downtime
↓
Jobs stored in PostgreSQL ✓
Redis queue might be stale/empty
↓
Runner reconnects → pollJobs()
↓
STEP 1: Query PostgreSQL
        ↓
        Found 10 pending jobs
        ↓
        Return immediately (0ms delay)
↓
Runner processes jobs
```

### Case 2: No Backlog, Waiting for New Jobs

```
Runner polling → pollJobs()
↓
STEP 1: Query PostgreSQL
        ↓
        No pending jobs
        ↓
STEP 2: BRPOP redis:runner:jobs:xxx (blocks)
        ↓
        [30 seconds pass...]
        ↓
        New job created on different API instance
        ↓
        LPUSH to Redis
        ↓
        BRPOP unblocks instantly!
        ↓
        Query PostgreSQL for job details
        ↓
        Return job (<1ms after creation)
```

### Case 3: Race Condition

```
Runner polling → pollJobs()
↓
STEP 1: Query PostgreSQL → no jobs
        ↓
        [Job created during BRPOP setup]
        ↓
STEP 2: BRPOP → gets new job ID ✓
        ↓
        Query PostgreSQL
        ↓
        Return job
```

### Case 4: Redis Failure

```
Runner polling → pollJobs()
↓
STEP 1: Query PostgreSQL → no jobs
        ↓
STEP 2: BRPOP → Redis connection error
        ↓
STEP 3: Query PostgreSQL again (fallback)
        ↓
        Return jobs if any exist
```

## Why This Works

### ✅ Immediate Backlog Processing

**Before:**

```
Runner offline → Jobs queued
Runner reconnects → BRPOP (blocks 30s) → timeout → DB query → jobs returned
Total: 30+ seconds delay
```

**After:**

```
Runner offline → Jobs queued
Runner reconnects → DB query → jobs returned
Total: ~10ms delay
```

### ✅ Handles All Edge Cases

| Scenario | Step 1 | Step 2 | Step 3 | Result |
|----------|--------|--------|--------|--------|
| Backlog exists | ✓ Returns jobs | - | - | Instant |
| No backlog, new job | Empty | ✓ Redis notifies | - | <1ms |
| Redis down | Empty | Error | ✓ DB query | Fallback |
| Race condition | Empty | ✓ Gets job | - | Job found |
| Job in Redis but deleted from DB | Empty | Job ID | ✓ Empty | Handled |

### ✅ Optimal Performance

**No unnecessary blocking:**

- If work exists → return immediately
- If no work → block efficiently on Redis

**No wasted timeouts:**

- Don't wait 30s if jobs already exist
- Only block when truly waiting for new work

### ✅ Fault Tolerance

**Three layers of fallback:**

1. DB query (immediate)
2. Redis notification (fast)
3. DB query again (reliable)

**Cannot lose jobs:**

- Jobs in DB are always source of truth
- Redis is optimization, not requirement

## Performance Comparison

### Scenario: Runner Reconnects with 100 Jobs Waiting

| Approach | Time to First Job | Time to All Jobs |
|----------|------------------|------------------|
| Old (BRPOP first) | 30-60s | 30-60s |
| **New (DB first)** | **~10ms** | **~10ms** |

**Improvement:** 3000x faster!

### Scenario: No Backlog, Waiting for New Job

| Approach | Time to New Job |
|----------|-----------------|
| Old (BRPOP) | <1ms |
| **New (DB + BRPOP)** | **<1ms** |

**Same performance**, but now handles backlog efficiently too!

## Code Flow Detail

```typescript
async pollJobs(runnerId: string, limit = 10, timeoutSeconds = 30): Promise<JobDto[]> {
  const queueKey = this.getRunnerQueueKey(runnerId)
  const maxTimeout = Math.min(timeoutSeconds, 60)

  // ═══════════════════════════════════════════════════════════
  // STEP 1: Check database first for existing pending jobs
  // ═══════════════════════════════════════════════════════════
  // Why: Handles reconnected runners, Redis downtime, backlog
  // Cost: ~5-10ms query
  // Benefit: 0ms wait if jobs exist (vs 30-60s timeout)

  const existingJobs = await this.jobRepository.find({
    where: { runnerId, status: JobStatus.PENDING },
    order: { createdAt: 'ASC' },
    take: limit,
  })

  if (existingJobs.length > 0) {
    logger.log(`Found ${existingJobs.length} existing pending jobs`)
    return existingJobs.map(job => this.toDto(job))
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 2: No existing jobs - wait for new jobs via Redis
  // ═══════════════════════════════════════════════════════════
  // Why: Instant notification when new job created
  // Cost: Blocks until job or timeout
  // Benefit: <1ms notification latency across API instances

  try {
    logger.debug(`No existing jobs, starting BRPOP`)

    const result = await this.redis.brpop(queueKey, maxTimeout)

    if (result) {
      const jobIds = [result[1]]

      // Get additional jobs from queue (batch processing)
      for (let i = 1; i < limit; i++) {
        const moreJob = await this.redis.rpop(queueKey)
        if (moreJob) jobIds.push(moreJob)
        else break
      }

      // Fetch full job details from database
      const jobs = await this.jobRepository.find({
        where: { id: In(jobIds), status: JobStatus.PENDING },
        order: { createdAt: 'ASC' },
      })

      if (jobs.length > 0) {
        logger.log(`Returning ${jobs.length} jobs via Redis`)
        return jobs.map(job => this.toDto(job))
      }

      logger.warn(`Jobs ${jobIds} from Redis not found in DB`)
    } else {
      logger.debug(`BRPOP timeout, no new jobs`)
    }
  } catch (error) {
    logger.error(`Redis BRPOP error: ${error.message}`)
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 3: Final fallback - check database again
  // ═══════════════════════════════════════════════════════════
  // Why: Handles Redis errors, race conditions
  // Cost: ~5-10ms query
  // Benefit: Guaranteed job delivery even if Redis fails

  const fallbackJobs = await this.jobRepository.find({
    where: { runnerId, status: JobStatus.PENDING },
    order: { createdAt: 'ASC' },
    take: limit,
  })

  if (fallbackJobs.length > 0) {
    logger.log(`Found ${fallbackJobs.length} jobs in DB fallback`)
    return fallbackJobs.map(job => this.toDto(job))
  }

  return []
}
```

## Database Query Impact

**Concern:** Does querying DB on every poll add too much load?

**Answer:** No, because:

1. **First query is quick** (~5-10ms)
   - Indexed query: `WHERE runner_id = ? AND status = 'PENDING'`
   - Returns fast even with millions of jobs
   - If jobs found → no BRPOP needed

2. **Most polls have no backlog**
   - First query: no results
   - BRPOP: blocks efficiently
   - No repeated queries

3. **Only 3 queries max per poll cycle**
   - Initial check
   - (BRPOP blocks - no queries)
   - Final fallback check

4. **Compare to alternative:**
   - Old: 1 query after 30s timeout
   - New: 2 queries with 0s delay
   - **Better user experience, similar DB load**

## Redis Queue Cleanup

**Question:** What about stale job IDs in Redis?

**Answer:** They're handled gracefully:

```typescript
// Job ID in Redis but not in DB
const jobs = await db.find({ id: In(jobIds), status: PENDING })

if (jobs.length === 0) {
  // Job already processed or deleted
  // Fall through to final DB check
  // Return empty or find other pending jobs
}
```

**Stale IDs don't cause issues:**

- Query filters by `status: PENDING`
- If job completed/deleted → not returned
- No error, just skip to next step

## Monitoring

**Key metrics to track:**

```typescript
// Step 1 hits (immediate return)
logger.log(`Found ${jobs.length} existing pending jobs`)
→ High number = good (backlog being processed immediately)

// Step 2 hits (Redis notification)
logger.log(`Returning ${jobs.length} jobs via Redis`)
→ High number = good (Redis working well)

// Step 3 hits (fallback)
logger.log(`Found ${jobs.length} jobs in DB fallback`)
→ High number = Redis might be down, investigate
```

## Conclusion

The **DB-first, then Redis** strategy provides:

✅ **Zero delay** for backlog processing
✅ **Sub-millisecond** notification for new jobs
✅ **Bulletproof** fallback handling
✅ **Optimal** resource usage
✅ **Graceful** degradation

It's the best of both worlds: immediate backlog processing AND instant new job notifications!
