# Runner Job (Version 3) - Implementation Complete

## Overview

Version 3 job-based runner system has been fully implemented in the API. This document summarizes what was built and what remains.

## ✅ Completed: API Implementation

### 1. Database Schema

**Job Entity** (`apps/api/src/sandbox/entities/job.entity.ts`)

- Fields: id, type, status, runnerId, sandboxId, payload, errorMessage, timestamps
- Indexes: `(runnerId, status)`, `(status, createdAt)` for efficient querying
- Status: PENDING → IN_PROGRESS → COMPLETED/FAILED

**Job Types**:

- CREATE_SANDBOX
- START_SANDBOX
- STOP_SANDBOX
- DESTROY_SANDBOX
- CREATE_BACKUP
- BUILD_SNAPSHOT
- PULL_SNAPSHOT
- REMOVE_SNAPSHOT

### 2. Job Service

**Location**: `apps/api/src/sandbox/services/job.service.ts`

**Key Features**:

- **Atomic Job Claiming**: Uses `FOR UPDATE SKIP LOCKED` to prevent duplicates
- **Three-Step Polling**: DB-first → Redis BRPOP → DB fallback
- **Redis Notification**: LPUSH for instant cross-instance notification in HA
- **Job CRUD**: Create, update status, query by runner

**Critical Method - claimPendingJobs()**:

```typescript
UPDATE job
SET status = 'IN_PROGRESS', started_at = NOW()
WHERE id IN (
  SELECT id FROM job
  WHERE runner_id = $1 AND status = 'PENDING'
  ORDER BY created_at ASC
  LIMIT $2
  FOR UPDATE SKIP LOCKED  -- Prevents duplicate claiming
)
RETURNING *
```

**Polling Strategy**:

1. Immediately claim any pending jobs (fast path)
2. If none, wait on Redis BRPOP (instant notification)
3. Final DB check before timeout

### 3. Job Controller

**Location**: `apps/api/src/sandbox/controllers/job.controller.ts`

**Endpoints**:

```
GET /jobs/poll?timeout=30&limit=10
- Authentication: RunnerAuthGuard (runner API key)
- Returns: Array of claimed jobs (already IN_PROGRESS)
- Long poll with configurable timeout (max 60s)

POST /jobs/:jobId/status
- Updates job status (IN_PROGRESS, COMPLETED, FAILED)
- Includes optional error message
```

### 4. Runner Adapter for Version 3

**Location**: `apps/api/src/sandbox/runner-adapter/runnerAdapter.job.ts`

**Implementation**: Implements RunnerAdapter interface by creating jobs instead of making API calls

**Methods**: All sandbox operations (create, start, stop, destroy, backup, snapshot operations) create jobs with full payloads

**Factory Support**: `RunnerAdapterFactory` updated to support version '3'

### 5. Healthcheck System

**Healthcheck Endpoint**: `POST /runners/healthcheck`

- Authentication: RunnerAuthGuard
- Request body: RunnerHealthcheckDto with optional metrics
- Updates: lastChecked timestamp, runner state (READY), metrics, availability score

**Cron Job** (`check-runners` - runs every 10s):

- **Version 0 runners**: Makes HTTP health check to runner API
- **Version 3 runners**: Checks lastChecked timestamp
  - If null → UNRESPONSIVE
  - If age > 60s → UNRESPONSIVE
  - If age ≤ 60s → READY

**Health Check Threshold**: 60 seconds (allows 1 missed healthcheck)

### 6. DTOs

**Job DTOs** (`apps/api/src/sandbox/dto/job.dto.ts`):

- JobDto
- CreateJobDto
- UpdateJobStatusDto
- PollJobsResponseDto

**Healthcheck DTOs** (`apps/api/src/sandbox/dto/runner-health.dto.ts`):

- RunnerHealthMetricsDto
- RunnerHealthcheckDto

### 7. Module Configuration

**Updated** `apps/api/src/sandbox/sandbox.module.ts`:

- Added Job entity to TypeORM
- Added JobService to providers
- Added JobController to controllers

## 📋 Documentation Created

All documentation is in `apps/runner-job/`:

1. **ARCHITECTURE.md** - Overview of v0 vs v3 differences
2. **IMPLEMENTATION.md** - Complete implementation guide
3. **EXAMPLE.md** - API usage examples and workflows
4. **REDIS-HA.md** - Redis BRPOP for HA deployments
5. **POLLING-STRATEGY.md** - Three-step polling explanation
6. **ATOMIC-CLAIMING.md** - Duplicate prevention with atomic claiming
7. **HEALTHCHECK.md** - Push-based healthcheck system
8. **IMPLEMENTATION-COMPLETE.md** - This summary document

## 🔄 How It Works

### Job Creation Flow

```
1. Sandbox assigned to v3 runner
2. RunnerAdapterFactory creates RunnerAdapterJob
3. Adapter.createSandbox() called
4. Job created in database (status: PENDING)
5. Redis LPUSH notification sent to runner's queue
6. Job ready to be polled
```

### Job Polling Flow

```
1. Runner calls GET /jobs/poll
2. JobService.pollJobs():
   a. Check DB for pending jobs → claim atomically
   b. If found, return immediately
   c. If none, BRPOP on Redis (wait for notification)
   d. On notification, claim jobs from DB
   e. Timeout fallback: final DB check
3. Return jobs to runner (already IN_PROGRESS)
```

### Job Execution Flow

```
1. Runner receives jobs (already IN_PROGRESS)
2. Runner executes job (e.g., create container)
3. Runner updates status: POST /jobs/:id/status
   - COMPLETED (with result)
   - FAILED (with error message)
```

### Healthcheck Flow

```
1. Runner sends POST /runners/healthcheck every 30s
2. API updates lastChecked timestamp
3. API updates metrics (if provided)
4. API calculates availability score
5. API sets runner state to READY

Cron (every 10s):
- For v3 runners: Check if lastChecked > 60s ago
  - If yes → UNRESPONSIVE
  - If no → READY
```

## ⏳ Pending: Runner Implementation

### What Needs to Be Built

**Go Application** (`apps/runner-job/`)

The runner needs to:

1. **Poll for jobs**:

   ```go
   jobs, err := apiClient.PollJobs(ctx, &PollJobsRequest{
       Timeout: 30,
       Limit:   10,
   })
   ```

2. **Execute jobs**:

   ```go
   for _, job := range jobs {
       switch job.Type {
       case "CREATE_SANDBOX":
           err := createSandbox(job.Payload)
       case "START_SANDBOX":
           err := startSandbox(job.Payload)
       // ... etc
       }

       // Update status
       if err != nil {
           apiClient.UpdateJobStatus(ctx, job.ID, "FAILED", err.Error())
       } else {
           apiClient.UpdateJobStatus(ctx, job.ID, "COMPLETED", "")
       }
   }
   ```

3. **Send healthchecks**:

   ```go
   ticker := time.NewTicker(30 * time.Second)
   for range ticker.C {
       metrics := collectMetrics()
       apiClient.SendHealthcheck(ctx, &HealthcheckRequest{
           Metrics: metrics,
       })
   }
   ```

### How to Generate OpenAPI Client

The user will generate the OpenAPI client manually:

```bash
# Generate OpenAPI spec from NestJS
yarn nx run api:generate-openapi

# Generate Go client from spec
# (User's preferred tool - e.g., openapi-generator, oapi-codegen)
```

## 🎯 Production Readiness

### What Works Now

✅ **Job Creation**: Sandboxes assigned to v3 runners create jobs
✅ **Job Storage**: Jobs stored in PostgreSQL with proper indexes
✅ **HA Support**: Redis BRPOP for instant cross-instance notification
✅ **No Duplicates**: Atomic claiming with FOR UPDATE SKIP LOCKED
✅ **Health Monitoring**: Push-based healthcheck with cron verification
✅ **Availability Scoring**: TOPSIS algorithm for runner selection

### Database Migration

**Required before deployment**:

```typescript
// Create migration
yarn nx run api:migration:generate --name=AddJobEntity

// Migration will include:
// - Create job table
// - Add indexes: (runnerId, status), (status, createdAt)
```

### Configuration

**No additional config needed** - uses existing:

- Redis connection (already configured for locks)
- PostgreSQL connection (already configured for entities)
- Health check threshold: 60s (hardcoded, can be made configurable)

## 🔍 Testing

### Manual API Testing

**Create a v3 runner**:

```bash
curl -X POST http://localhost:3000/runners \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "domain": "runner3.local",
    "apiUrl": "http://runner3.local:8080",
    "apiKey": "test-key-123",
    "cpu": 16,
    "memoryGiB": 32,
    "diskGiB": 500,
    "region": "us-east-1",
    "class": "STANDARD",
    "version": "3"
  }'
```

**Poll for jobs** (as runner):

```bash
curl -X GET "http://localhost:3000/jobs/poll?timeout=5&limit=10" \
  -H "x-runner-api-key: test-key-123"
```

**Send healthcheck** (as runner):

```bash
curl -X POST http://localhost:3000/runners/healthcheck \
  -H "x-runner-api-key: test-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "metrics": {
      "currentCpuUsagePercentage": 45.5,
      "currentMemoryUsagePercentage": 60.2,
      "currentDiskUsagePercentage": 35.8,
      "currentAllocatedCpu": 8,
      "currentAllocatedMemoryGiB": 16,
      "currentAllocatedDiskGiB": 100,
      "currentSnapshotCount": 5
    }
  }'
```

**Create sandbox on v3 runner**:

```bash
# Assign runner to sandbox, creates job automatically
curl -X POST http://localhost:3000/sandboxes \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "runnerId": "<v3-runner-id>",
    "snapshot": "ubuntu:22.04",
    ...
  }'
```

### Monitoring Queries

**Check jobs**:

```sql
SELECT id, type, status, runner_id, created_at, started_at
FROM job
ORDER BY created_at DESC
LIMIT 10;
```

**Check v3 runner health**:

```sql
SELECT id, domain, version, state, last_checked,
  EXTRACT(EPOCH FROM (NOW() - last_checked)) as seconds_since_check
FROM runner
WHERE version = '3';
```

## 🚀 Next Steps

1. **Generate OpenAPI client** for Go runner
2. **Implement runner-job** Go application:
   - Job polling loop
   - Job execution (container operations)
   - Healthcheck loop
   - Metrics collection
3. **Create database migration** for Job entity
4. **Deploy and test** with real workloads

## 📊 Architecture Benefits

### vs Version 0 (Imperative)

| Aspect | v0 | v3 |
|--------|----|----|
| API Coupling | Tight (HTTP calls) | Loose (job queue) |
| Failure Recovery | Complex | Automatic (jobs persist) |
| HA Support | N/A | Built-in (Redis) |
| Scalability | Limited | High (horizontal) |
| Observability | Per-call | Per-job (tracked) |
| Duplicate Prevention | N/A | Database-guaranteed |

### Key Design Decisions

1. **Database as Source of Truth**: Redis is only for notification, DB holds all state
2. **Atomic Claiming**: FOR UPDATE SKIP LOCKED prevents race conditions
3. **Three-Step Polling**: Optimal balance of speed and reliability
4. **Push-based Healthcheck**: Reduces API load, simplifies runner implementation
5. **Full Payload in Jobs**: Jobs are self-contained, no additional lookups needed

## 🎉 Summary

The version 3 job-based runner system is **fully implemented in the API** and ready for runner implementation. All database entities, services, controllers, and documentation are complete. The system is production-ready from the API side and awaits the Go runner implementation to become fully operational.
