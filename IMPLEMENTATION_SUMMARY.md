# Job-Based Runner Implementation - Complete Summary

## Overview

Successfully implemented a **complete job-based runner system (v3)** that replaces synchronous HTTP calls with asynchronous job queues. This allows runners to work independently and scale horizontally.

---

## Architecture

### API Layer (apps/api)

**Jobs are created synchronously in the same transaction as sandbox state changes:**

```typescript
User API Call → @Transactional {
  1. Update sandbox.desiredState
  2. Create job in database
  3. Commit transaction atomically
} → Emit event → Redis notification
```

**Key Files Modified:**

- `apps/api/src/sandbox/services/sandbox.service.ts` - Job creation in create/start/stop/destroy
- `apps/api/src/sandbox/services/job.service.ts` - Job management and polling
- `apps/api/src/sandbox/controllers/job.controller.ts` - Job API endpoints
- `apps/api/src/sandbox/managers/sandbox-actions/*` - Skip adapter calls for v3

**Key Changes:**

- Added `@Transactional()` decorator to create/start/stop/destroy methods
- Jobs created using `jobService.createJob(this.manager, ...)`
- Only for v3 runners (checks `runner.version === '3'`)
- Legacy v0 runners continue to use adapters imperatively
- **Deleted** `runnerAdapter.job.ts` - no longer needed!

### Runner Service (apps/runner-service)

**Simple, clean job handlers using Docker client directly:**

```go
Job Poller → Executor → Handler Function → Docker Client → Docker API
```

**New Files Created:**

- `internal/handlers/create_sandbox.go` - CREATE_SANDBOX handler
- `internal/handlers/start_sandbox.go` - START_SANDBOX handler
- `internal/handlers/stop_sandbox.go` - STOP_SANDBOX handler
- `internal/handlers/destroy_sandbox.go` - DESTROY_SANDBOX handler

**Key Changes:**

- Docker client initialized in `main.go` and passed to executor
- Simple handler functions - no abstractions, no wrappers
- Clean error handling with proper context
- Structured logging throughout

---

## Flow Comparison

### V0 Runners (Legacy - Unchanged)

```
User API → Update state → Event → Reconciliation → Adapter → HTTP call → Runner executes
```

### V3 Runners (New)

```
User API → Transaction { Update state + Create job } → Runner polls → Executes job
```

**Key Difference:** Job creation happens **atomically** with state change, not during reconciliation!

---

## Job Types Implemented

### 1. CREATE_SANDBOX

- Pulls Docker image with registry authentication
- Creates container with resource limits (CPU, memory, disk)
- Configures volumes, environment, labels
- Starts container
- Returns container ID

### 2. START_SANDBOX

- Starts stopped container
- Simple and idempotent

### 3. STOP_SANDBOX

- Stops running container gracefully (SIGTERM)
- 10-second timeout

### 4. DESTROY_SANDBOX

- Force removes container
- Preserves volumes for potential restore

---

## Database Schema

### Job Table

```sql
CREATE TABLE job (
  id VARCHAR PRIMARY KEY,
  type VARCHAR NOT NULL,  -- CREATE_SANDBOX, START_SANDBOX, etc.
  status VARCHAR NOT NULL, -- PENDING, IN_PROGRESS, COMPLETED, FAILED
  "sandboxId" VARCHAR NOT NULL,
  "runnerId" VARCHAR NOT NULL,
  payload JSONB,
  "errorMessage" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP,
  "claimedAt" TIMESTAMP
);

CREATE INDEX idx_job_runner_status ON job("runnerId", status);
```

---

## API Endpoints

### For Runners

- `GET /api/jobs/poll?timeout=30&limit=10` - Long-polling for jobs
- `POST /api/jobs/:jobId/status` - Update job status
- `POST /api/runner/healthcheck` - Report health metrics

### For Users (No Changes)

- `POST /api/sandboxes` - Create sandbox
- `POST /api/sandboxes/:id/start` - Start sandbox
- `POST /api/sandboxes/:id/stop` - Stop sandbox
- `POST /api/sandboxes/:id/destroy` - Destroy sandbox

---

## Configuration

### API (apps/api)

```bash
# Database
DATABASE_URL=postgresql://...

# Redis for job notifications
REDIS_URL=redis://localhost:6379
```

### Runner Service (apps/runner-service)

```bash
# API connection
API_URL=http://localhost:3000
API_KEY=runner-secret-key

# Docker
DOCKER_HOST=unix:///var/run/docker.sock

# Polling
POLL_TIMEOUT=30s
POLL_LIMIT=10
HEALTHCHECK_INTERVAL=30s
```

---

## Testing

### 1. Setup Test Runner

```sql
-- Set runner to v3
UPDATE runner SET version = '3' WHERE id = 'runner-001';
```

### 2. Create Sandbox

```bash
curl -X POST http://localhost:3000/api/sandboxes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "test-sandbox",
    "snapshot": "ubuntu:22.04"
  }'
```

### 3. Verify Job Created

```sql
SELECT * FROM job WHERE "sandboxId" = 'sandbox-id';
-- Should show CREATE_SANDBOX job with status=PENDING
```

### 4. Check Runner Logs

```bash
# Runner service logs should show:
# "polling for jobs"
# "handling CREATE_SANDBOX job"
# "container created"
# "sandbox created successfully"
```

### 5. Verify Job Completed

```sql
SELECT status FROM job WHERE id = 'job-id';
-- Should be COMPLETED
```

---

## Monitoring

### Metrics Available

- `job_poll_total` - Number of poll requests
- `job_execution_total{type, status}` - Job executions
- `job_execution_duration_seconds{type}` - Job duration
- `runner_allocations{resource}` - Resource usage

### Logs

All logs are structured JSON with context:

```json
{
  "level": "info",
  "msg": "handling CREATE_SANDBOX",
  "job_id": "job-123",
  "sandbox_id": "sandbox-456"
}
```

---

## Migration Strategy

### Phase 1: Deploy V3 System

1. Deploy updated API with job tables
2. Deploy runner-service (v3)
3. Keep apps/runner (v0) running

### Phase 2: Test V3 Runners

1. Create new runners with `version='3'`
2. Test create/start/stop/destroy operations
3. Monitor job execution and errors

### Phase 3: Gradual Migration

1. Set select runners to `version='3'`
2. Monitor performance and reliability
3. Migrate more runners gradually

### Phase 4: Complete Migration

1. All runners on v3
2. Remove apps/runner (legacy)
3. Remove adapter code

---

## Known Limitations / Future Work

### Not Yet Implemented

- CREATE_BACKUP handler
- BUILD_SNAPSHOT handler
- PULL_SNAPSHOT handler
- REMOVE_SNAPSHOT handler
- Network configuration (iptables)
- Daytona daemon management

### Edge Cases

- Backup/restore from different runner (v3) - needs job creation during reconciliation
- Runner version migration - need to handle in-flight operations

---

## Key Improvements Over apps/runner

### Code Quality

✅ No global singletons
✅ Dependency injection
✅ Clean separation of concerns
✅ Testable architecture
✅ Structured logging
✅ Proper error handling

### Reliability

✅ Atomic job creation (transaction)
✅ Job persistence (survives crashes)
✅ Retry-able operations
✅ Idempotent handlers
✅ Long-polling with timeout

### Scalability

✅ Horizontal scaling (multiple runners)
✅ Independent execution
✅ No blocking API calls
✅ Efficient Redis notifications

---

## Success Criteria ✅

- [x] Jobs created atomically with state changes
- [x] Runner polls for jobs via long-polling
- [x] CREATE_SANDBOX handler implemented
- [x] START_SANDBOX handler implemented
- [x] STOP_SANDBOX handler implemented
- [x] DESTROY_SANDBOX handler implemented
- [x] Docker client integration
- [x] Job status updates
- [x] Error handling
- [x] Structured logging
- [x] Legacy v0 runners continue to work

---

## Files Changed

### API (apps/api/src)

- `sandbox/services/sandbox.service.ts` ✏️ Modified
- `sandbox/services/job.service.ts` ✨ Created
- `sandbox/controllers/job.controller.ts` ✨ Created
- `sandbox/entities/job.entity.ts` ✨ Created
- `sandbox/dto/job.dto.ts` ✨ Created
- `sandbox/migrations/xxx-create-job-table.ts` ✨ Created
- `sandbox/managers/sandbox-actions/*.ts` ✏️ Modified (skip adapters for v3)
- `sandbox/runner-adapter/runnerAdapter.job.ts` ❌ Deleted
- `sandbox/runner-adapter/runnerAdapter.ts` ✏️ Modified (throw for v3)

### Runner Service (apps/runner-service)

- `cmd/runner-service/main.go` ✏️ Modified (add Docker client)
- `internal/executor/executor.go` ✏️ Modified (use handlers)
- `internal/handlers/create_sandbox.go` ✨ Created
- `internal/handlers/start_sandbox.go` ✨ Created
- `internal/handlers/stop_sandbox.go` ✨ Created
- `internal/handlers/destroy_sandbox.go` ✨ Created

---

## Conclusion

The job-based runner system (v3) is **complete and ready for testing**. It provides a clean, scalable architecture that decouples the API from runners, allowing for better reliability and horizontal scaling. The implementation maintains backward compatibility with v0 runners while providing a clear migration path forward.
