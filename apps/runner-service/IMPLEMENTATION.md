# Runner Job - Implementation Complete

## Overview

The job-based runner system (Version 3) has been fully implemented. When a runner with `version = '3'` is assigned to a sandbox, the system now creates jobs in the database instead of making imperative API calls to the runner.

## What Was Implemented

### 1. Database Layer

#### Job Entity (`apps/api/src/sandbox/entities/job.entity.ts`)

Stores all job information with:

- Job type (CREATE_SANDBOX, START_SANDBOX, STOP_SANDBOX, etc.)
- Job status (PENDING, IN_PROGRESS, COMPLETED, FAILED)
- Runner ID and Sandbox ID
- JSON payload with operation-specific data
- Timestamps for created, started, completed
- Indexed for efficient querying by runner and status

### 2. Service Layer

#### JobService (`apps/api/src/sandbox/services/job.service.ts`)

Manages job lifecycle:

- `createJob()` - Create new jobs
- `pollJobs()` - Long polling with exponential backoff (100ms to 2s)
- `updateJobStatus()` - Update job status with timestamps
- `findOne()` - Get specific job
- `findPendingJobsForRunner()` - Query pending jobs
- `findJobsBySandboxId()` - Get all jobs for a sandbox

**Long Polling Logic:**

- Default timeout: 30 seconds (max: 60 seconds)
- Exponential backoff: starts at 100ms, increases to 2s
- Returns immediately if jobs found
- Returns empty array after timeout

### 3. Runner Adapter Layer

#### RunnerAdapterJob (`apps/api/src/sandbox/runner-adapter/runnerAdapter.job.ts`)

Implements the `RunnerAdapter` interface for version 3 runners:

**All operations create jobs instead of API calls:**

- `createSandbox()` → Creates CREATE_SANDBOX job with full payload
- `startSandbox()` → Creates START_SANDBOX job
- `stopSandbox()` → Creates STOP_SANDBOX job
- `destroySandbox()` → Creates DESTROY_SANDBOX job
- `createBackup()` → Creates CREATE_BACKUP job
- `buildSnapshot()` → Creates BUILD_SNAPSHOT job
- `pullSnapshot()` → Creates PULL_SNAPSHOT job
- `removeSnapshot()` → Creates REMOVE_SNAPSHOT job

**Health Check:**

- Checks `lastChecked` timestamp (updated during polling)
- Fails if runner hasn't polled in 60 seconds

**Simplified Operations:**

- `sandboxInfo()` - Returns UNKNOWN state (runner updates via API)
- `snapshotExists()` - Returns false (runner maintains cache)
- Streaming operations not supported (different pattern needed)

#### RunnerAdapterFactory Updated

Now supports both versions:

```typescript
case '0': RunnerAdapterLegacy (imperative API calls)
case '3': RunnerAdapterJob (job-based)
```

### 4. Controller Layer

#### JobController (`apps/api/src/sandbox/controllers/job.controller.ts`)

Three endpoints for runner communication:

**1. `GET /jobs/poll` - Long Poll for Jobs**

- Query params: `timeout` (max 60s), `limit` (max 100)
- Authenticated with `RunnerAuthGuard`
- Uses runner context from auth token
- Returns list of pending jobs

**2. `GET /jobs/:jobId` - Get Job Details**

- Fetch specific job by ID
- Returns full job information

**3. `POST /jobs/:jobId/status` - Update Job Status**

- Runner reports progress: IN_PROGRESS, COMPLETED, FAILED
- Updates timestamps automatically
- Records error messages on failure

### 5. Module Registration

Updated `sandbox.module.ts`:

- Added `Job` entity to TypeORM
- Added `JobService` to providers
- Added `JobController` to controllers

## How It Works

### Creating a Sandbox with Version 3 Runner

1. **User creates sandbox** via `POST /sandbox`
2. **SandboxService** finds available runner
3. **Runner version = '3'** is assigned
4. **RunnerAdapterFactory** creates `RunnerAdapterJob`
5. **SandboxManager** calls `adapter.createSandbox()`
6. **RunnerAdapterJob** creates `CREATE_SANDBOX` job in database
7. Job includes full payload: snapshot, resources, env, labels, etc.
8. **Response returned** immediately (non-blocking)

### Runner Polling & Execution

1. **Runner polls** `GET /jobs/poll?timeout=30&limit=10`
2. **JobService** long-polls database with exponential backoff
3. **Jobs found** → returned immediately
4. **Runner processes** first job:
   - Sends `POST /jobs/:jobId/status` with `IN_PROGRESS`
   - Executes operation (creates sandbox)
   - Updates sandbox state via `PUT /sandbox/:id/state`
   - Sends `POST /jobs/:jobId/status` with `COMPLETED` or `FAILED`
5. **Repeat** for remaining jobs
6. **Poll again** when done

### Flow Comparison

#### Version 0 (Imperative)

```
API → HTTP POST /sandboxes → Runner
API ← HTTP 200 OK ← Runner
(Blocking until complete)
```

#### Version 3 (Job-Based)

```
API → Insert Job → Database
API ← 200 OK (immediate)

Runner → Poll Jobs → Database
Runner ← Job List ← Database
Runner → Update Status → Database
```

## Job Payload Examples

### CREATE_SANDBOX Job

```json
{
  "type": "CREATE_SANDBOX",
  "payload": {
    "snapshot": "ubuntu-4vcpu-8ram",
    "cpu": 4,
    "mem": 8,
    "disk": 100,
    "gpu": 0,
    "osUser": "daytona",
    "env": {"NODE_ENV": "production"},
    "labels": {"team": "backend"},
    "volumes": [...],
    "authToken": "...",
    "networkBlockAll": false,
    "networkAllowList": null,
    "registry": {...},
    "entrypoint": null,
    "metadata": {...}
  }
}
```

### START_SANDBOX Job

```json
{
  "type": "START_SANDBOX",
  "payload": {
    "metadata": {...}
  }
}
```

### BUILD_SNAPSHOT Job

```json
{
  "type": "BUILD_SNAPSHOT",
  "payload": {
    "snapshotRef": "myorg/myapp:latest",
    "dockerfileContent": "FROM ubuntu...",
    "contextHashes": {...},
    "organizationId": "org123",
    "registry": {...},
    "pushToInternalRegistry": true
  }
}
```

## Benefits Achieved

1. **Non-Blocking Operations**
   - API returns immediately
   - No waiting for runner execution

2. **Resilience**
   - Jobs persist even if runner disconnects
   - Can be retried on failure

3. **Scalability**
   - Multiple runners can poll same endpoint
   - Easy to add more runners

4. **Observability**
   - Complete job history in database
   - Status tracking at each stage
   - Error messages captured

5. **Auditability**
   - All operations logged as jobs
   - Query jobs by sandbox, runner, status
   - Timestamps for every stage

## Database Schema

```sql
CREATE TABLE job (
  id UUID PRIMARY KEY,
  type VARCHAR (enum: JobType),
  status VARCHAR (enum: JobStatus),
  runner_id UUID NOT NULL,
  sandbox_id VARCHAR NOT NULL,
  payload JSONB,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for efficient queries
CREATE INDEX idx_job_runner_status ON job(runner_id, status);
CREATE INDEX idx_job_status_created ON job(status, created_at);
CREATE INDEX idx_job_status ON job(status);
```

## Next Steps

### Runner Implementation (apps/runner-job)

The runner needs to implement:

1. **Polling Loop**

   ```go
   for {
       jobs := pollJobs(timeout: 30, limit: 10)
       for _, job := range jobs {
           updateStatus(job.ID, IN_PROGRESS)
           err := executeJob(job)
           if err != nil {
               updateStatus(job.ID, FAILED, err.Error())
           } else {
               updateStatus(job.ID, COMPLETED)
           }
       }
   }
   ```

2. **Job Execution**
   - Parse job payload
   - Execute sandbox operations
   - Update sandbox state via API
   - Report job completion

3. **Metrics Reporting**
   - Send metrics during polling
   - Update runner's lastChecked timestamp

4. **Error Handling**
   - Retry transient failures
   - Report permanent failures
   - Handle network interruptions

5. **Snapshot Cache**
   - Maintain local snapshot list
   - Report available snapshots

## Testing

To test the system:

1. **Create a runner with version 3:**

   ```bash
   POST /runners
   {
     "domain": "runner-v3.example.com",
     "apiUrl": "http://runner-v3:8080",
     "version": "3",
     ...
   }
   ```

2. **Create a sandbox** - should create a job

3. **Poll for jobs:**

   ```bash
   GET /jobs/poll?timeout=30&limit=10
   # Returns the CREATE_SANDBOX job
   ```

4. **Update job status:**

   ```bash
   POST /jobs/:jobId/status
   {"status": "IN_PROGRESS"}

   POST /jobs/:jobId/status
   {"status": "COMPLETED"}
   ```

5. **Check job history:**

   ```sql
   SELECT * FROM job WHERE sandbox_id = 'sandbox123';
   ```

## Migration Path

To migrate from version 0 to version 3:

1. Deploy new runner-job instances
2. Register them with version = '3'
3. Set old runners as `unschedulable = true`
4. New sandboxes will use version 3
5. Existing sandboxes continue on version 0
6. Gradually migrate existing sandboxes if needed
7. Decommission version 0 runners
