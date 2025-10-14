# Runner Job - Usage Example

## Quick Start Guide

### 1. Register a Version 3 Runner

```bash
POST /runners
Authorization: Bearer <admin-token>

{
  "domain": "runner-job-1.example.com",
  "apiUrl": "http://runner-job-1:8080",
  "proxyUrl": "http://runner-job-1:8081",
  "apiKey": "runner-secret-key-123",
  "cpu": 16,
  "memoryGiB": 32,
  "diskGiB": 500,
  "gpu": 0,
  "gpuType": "",
  "region": "us-east-1",
  "class": "SMALL",
  "version": "3"  // 👈 This makes it a job-based runner
}
```

### 2. Create a Sandbox

When you create a sandbox, the system will automatically create a job if a version 3 runner is selected:

```bash
POST /sandbox
Organization-Id: org123
Authorization: Bearer <user-token>

{
  "name": "my-dev-environment",
  "snapshot": "ubuntu-4vcpu-8ram",
  "user": "daytona",
  "env": {
    "NODE_ENV": "development"
  },
  "target": "us-east-1"
}
```

**What happens internally:**

1. API selects runner with version="3"
2. `RunnerAdapterJob` creates a `CREATE_SANDBOX` job in database
3. API returns immediately (non-blocking)
4. Sandbox state is `CREATING`

### 3. Runner Polls for Jobs

The runner continuously polls for jobs:

```bash
GET /jobs/poll?timeout=30&limit=10
Authorization: Bearer <runner-api-key>

Response:
{
  "jobs": [
    {
      "id": "job-uuid-123",
      "type": "CREATE_SANDBOX",
      "status": "PENDING",
      "sandboxId": "sandbox-uuid-456",
      "payload": {
        "snapshot": "ubuntu-4vcpu-8ram",
        "cpu": 4,
        "mem": 8,
        "disk": 100,
        "osUser": "daytona",
        "env": {"NODE_ENV": "development"},
        "authToken": "...",
        ...
      },
      "createdAt": "2025-10-11T10:00:00Z"
    }
  ]
}
```

### 4. Runner Updates Job Status

**When starting work:**

```bash
POST /jobs/job-uuid-123/status
Authorization: Bearer <runner-api-key>

{
  "status": "IN_PROGRESS"
}
```

**When completed:**

```bash
POST /jobs/job-uuid-123/status
Authorization: Bearer <runner-api-key>

{
  "status": "COMPLETED"
}
```

**If failed:**

```bash
POST /jobs/job-uuid-123/status
Authorization: Bearer <runner-api-key>

{
  "status": "FAILED",
  "errorMessage": "Failed to pull image: connection timeout"
}
```

### 5. Runner Updates Sandbox State

After completing the job, runner updates the sandbox state:

```bash
PUT /sandbox/sandbox-uuid-456/state
Authorization: Bearer <runner-api-key>

{
  "state": "STARTED"
}
```

## Complete Flow Example

### Scenario: User Creates and Starts a Sandbox

**Step 1: User creates sandbox**

```bash
POST /sandbox
-> API creates CREATE_SANDBOX job
<- Returns sandbox with state=CREATING
```

**Step 2: Runner polls (within 30s)**

```bash
GET /jobs/poll
<- Returns CREATE_SANDBOX job
```

**Step 3: Runner starts job**

```bash
POST /jobs/:id/status {"status": "IN_PROGRESS"}
```

**Step 4: Runner executes (docker run, etc.)**

```bash
# Runner internally:
# - Pulls image
# - Creates container
# - Configures network
# - Starts sandbox
```

**Step 5: Runner updates sandbox state**

```bash
PUT /sandbox/:id/state {"state": "STARTED"}
```

**Step 6: Runner completes job**

```bash
POST /jobs/:id/status {"status": "COMPLETED"}
```

**Step 7: User checks sandbox**

```bash
GET /sandbox/:id
<- Returns sandbox with state=STARTED
```

## Monitoring Jobs

### Get all jobs for a sandbox (for debugging)

```bash
# This endpoint could be added if needed:
GET /sandbox/:sandboxId/jobs

Response:
[
  {
    "id": "job-1",
    "type": "CREATE_SANDBOX",
    "status": "COMPLETED",
    "createdAt": "2025-10-11T10:00:00Z",
    "startedAt": "2025-10-11T10:00:05Z",
    "completedAt": "2025-10-11T10:00:45Z"
  },
  {
    "id": "job-2",
    "type": "START_SANDBOX",
    "status": "IN_PROGRESS",
    "createdAt": "2025-10-11T11:00:00Z",
    "startedAt": "2025-10-11T11:00:02Z"
  }
]
```

### Query database directly

```sql
-- Find all pending jobs
SELECT * FROM job WHERE status = 'PENDING' ORDER BY created_at;

-- Find failed jobs
SELECT * FROM job WHERE status = 'FAILED' ORDER BY created_at DESC;

-- Find jobs for a specific runner
SELECT * FROM job WHERE runner_id = 'runner-uuid' ORDER BY created_at DESC;

-- Find all jobs for a sandbox
SELECT * FROM job WHERE sandbox_id = 'sandbox-uuid' ORDER BY created_at;
```

## Error Handling

### Job Times Out (Runner Doesn't Pick Up)

If a job sits in PENDING state for too long:

- Add a scheduled job to mark stale jobs as FAILED
- Retry mechanism could create a new job
- Alert on jobs pending > threshold

### Runner Crashes Mid-Job

If runner crashes while job is IN_PROGRESS:

- Job stays IN_PROGRESS (orphaned)
- Add cleanup job to reset IN_PROGRESS jobs after timeout
- New runner can pick up reset jobs

### Network Failure During Polling

If runner loses connection:

- Long poll times out on runner side
- Runner retries immediately
- Jobs remain PENDING
- No state lost

## Performance Tuning

### Polling Configuration

**Aggressive (low latency):**

```bash
GET /jobs/poll?timeout=10&limit=5
# Poll every 10s, process 5 jobs at a time
```

**Balanced (recommended):**

```bash
GET /jobs/poll?timeout=30&limit=10
# Poll every 30s, process 10 jobs at a time
```

**Conservative (high throughput):**

```bash
GET /jobs/poll?timeout=60&limit=100
# Poll every 60s, process up to 100 jobs
```

### Database Indexes

Already created for optimal performance:

- `(runner_id, status)` - Fast runner-specific queries
- `(status, created_at)` - Fast PENDING job queries
- `(status)` - Fast status filtering

## Debugging

### Check if jobs are being created

```sql
SELECT COUNT(*), status FROM job GROUP BY status;
```

### Check runner health

```sql
SELECT id, domain, last_checked, state
FROM runner
WHERE version = '3'
ORDER BY last_checked DESC;
```

### Find stuck jobs

```sql
SELECT * FROM job
WHERE status = 'IN_PROGRESS'
  AND started_at < NOW() - INTERVAL '5 minutes';
```

### Trace sandbox lifecycle

```sql
SELECT j.type, j.status, j.created_at, j.started_at, j.completed_at, j.error_message
FROM job j
WHERE j.sandbox_id = 'your-sandbox-id'
ORDER BY j.created_at;
```
