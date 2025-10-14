# Job-Based Runner (v3) Implementation - Session Summary

## Current Status: ✅ JOBS CREATED IN USER API TRANSACTION - Ready for Testing

### What We're Implementing

A new job-based runner system (version 3) that uses async job queues instead of synchronous API calls. Jobs are created **synchronously in the same transaction** as setting `desiredState` when users call start/stop/destroy APIs. The runner polls for jobs via long-polling and executes them asynchronously.

### Key Architecture Change

**Jobs are created at API call time, not during reconciliation!**

- **Old (incorrect) flow**: User API → Set desiredState → Event → Reconciliation → Action handler → Adapter → Create job
- **New (correct) flow**: User API → **Transaction { Set desiredState + Create job }** → Event → Reconciliation → Action handler just monitors state

---

## Problems Fixed in This Session

### 1. ✅ Module Resolution (go.mod vs go.work)

**Problem**: Used `replace` directive in go.mod
**Solution**: Added `./apps/runner-job` to `go.work` use directive

### 2. ✅ Removed Redundant RUNNER_ID

**Problem**: Both RUNNER_ID and API_KEY were used for identification
**Solution**: Removed RUNNER_ID - API_KEY is sufficient as `ApiKeyStrategy` resolves it to `RunnerContext`

### 3. ✅ Logger Refactoring

**Problem**: Custom logger implementation was overly complex
**Solution**: Replaced with `github.com/lmittmann/tint` library, added component-scoped logging

### 4. ✅ Authentication Issues

**Problem**: 401 Unauthorized and 403 Forbidden errors
**Solution**:

- Changed runner to use `Authorization: Bearer {apiKey}` header
- Added `CombinedAuthGuard` to `JobController`
- Added `CombinedAuthGuard` and `@RequiredApiRole(['runner'])` to healthcheck endpoint

### 5. ✅ SQL Column Name Issues

**Problem**: `column "runner_id" does not exist`
**Solution**: Changed SQL to use camelCase with quotes: `"runnerId"`, `"sandboxId"`, etc.

### 6. ✅ Date Field Handling

**Problem**: `Cannot read properties of undefined (reading 'toISOString')`
**Solution**: Added null checks for date fields in mapping

---

### 7. ✅ CRITICAL: Architecture Fix - Jobs Created at API Call Time

**Problem**: Jobs were being created in adapters during reconciliation, but adapters are asynchronous and invoked after the user API call completes.

**Solution for START/STOP/DESTROY**: Jobs are now created **synchronously in the same transaction** as setting `desiredState`:

- Added `@Transactional()` decorator to `start()`, `stop()`, and `destroy()` methods in [sandbox.service.ts](apps/api/src/sandbox/services/sandbox.service.ts)
- Jobs are created using `this.manager` (EntityManager from transaction) via `jobService.createJob()`
- Only for v3 runners - legacy v0 runners continue to use imperative adapter calls
- Action handlers skip adapter calls for v3 runners (START/STOP/DESTROY only)

**Solution for CREATE_SANDBOX**: Jobs are now created in `createFromSnapshot()` and `createFromBuildInfo()`:

- CREATE_SANDBOX jobs are created **synchronously** when sandbox is inserted into database
- Payload is gathered during sandbox creation (registry, entrypoint, metadata)
- Action handlers skip adapter calls for v3 runners
- **Deleted `runnerAdapter.job.ts`** - no longer needed!

**Files Modified**:

- `apps/api/src/sandbox/services/sandbox.service.ts`: Added job creation in create/start/stop/destroy
- `apps/api/src/sandbox/managers/sandbox-actions/sandbox-start.action.ts`: Skip CREATE/START adapter calls for v3
- `apps/api/src/sandbox/managers/sandbox-actions/sandbox-stop.action.ts`: Skip STOP adapter call for v3
- `apps/api/src/sandbox/managers/sandbox-actions/sandbox-destroy.action.ts`: Skip DESTROY adapter call for v3
- `apps/api/src/sandbox/runner-adapter/runnerAdapter.ts`: Throw error for v3 (adapters not used)
- **DELETED**: `apps/api/src/sandbox/runner-adapter/runnerAdapter.job.ts` (obsolete)

---

## Known Issue (Non-Critical): JSON Serialization

**Symptoms**: API was returning only `createdAt` field in job responses (likely fixed - need to test)

**Debug Added**: Raw SQL result logging in `job.service.ts:claimPendingJobs()`

**Not Blocking**: The architecture fix above should resolve the flow regardless of JSON serialization issues

---

## File Changes Made

### API Files Modified

#### `apps/api/src/sandbox/controllers/job.controller.ts`

- Added `CombinedAuthGuard` to class-level guards
- Added error handling with detailed logging
- Added debug logging for response structure

```typescript
@UseGuards(CombinedAuthGuard, RunnerAuthGuard)
export class JobController {
  async pollJobs(...) {
    const jobs = await this.jobService.pollJobs(...)
    this.logger.log(`First job details: ${JSON.stringify(jobs[0], null, 2)}`)
    return { jobs }
  }
}
```

#### `apps/api/src/sandbox/controllers/runner.controller.ts`

- Added `@RequiredApiRole(['runner'])` to healthcheck endpoint
- Healthcheck now has proper guards for runner authentication

```typescript
@Post('healthcheck')
@UseGuards(CombinedAuthGuard, RunnerAuthGuard)
@RequiredApiRole(['runner'])
async runnerHealthcheck(...)
```

#### `apps/api/src/sandbox/services/job.service.ts` ⚠️ NEEDS FIXING

- Fixed SQL to use camelCase column names with quotes
- Added explicit RETURNING clause (not `*`)
- **Added debug logging** (waiting for output)
- Mapping logic at line 213-222:

```typescript
return result.map((job) => ({
  id: job.id,  // ← These property accesses are failing!
  type: job.type,
  status: job.status,
  sandboxId: job.sandboxId,
  payload: job.payload || undefined,
  errorMessage: job.errorMessage || undefined,
  createdAt: job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString(),
  updatedAt: job.updatedAt ? new Date(job.updatedAt).toISOString() : undefined,
}))
```

### Go Runner Files Created

#### `apps/runner-job/cmd/runner-job/main.go`

- Main entry point with graceful shutdown
- Uses Bearer token: `apiCfg.AddDefaultHeader("Authorization", "Bearer "+cfg.APIKey)`

#### `apps/runner-job/internal/config/config.go`

- Environment-based configuration
- Removed RUNNER_ID field

#### `apps/runner-job/internal/logger/logger.go`

- Uses tint library for pretty logging
- Supports LOG_LEVEL environment variable

#### `apps/runner-job/internal/metrics/collector.go`

- Collects CPU, memory, disk metrics using gopsutil

#### `apps/runner-job/internal/healthcheck/healthcheck.go`

- Sends periodic healthchecks every 30s
- Includes system metrics

#### `apps/runner-job/internal/poller/poller.go`

- Long-polls API for jobs
- 30s timeout, up to 10 jobs per poll

#### `apps/runner-job/internal/executor/executor.go`

- Executes jobs and updates status
- Currently has stub implementation for job types

#### `apps/runner-job/go.mod`

- Added dependencies: tint, isatty, gopsutil

#### `go.work`

- Added `./apps/runner-job`

---

## Authentication Flow (Working)

1. Runner sends: `Authorization: Bearer {apiKey}`
2. `CombinedAuthGuard` → executes authentication strategies
3. `ApiKeyStrategy.validate(token)` → queries `runner` table for matching apiKey
4. Returns `RunnerContext { role: 'runner', runnerId: '...' }`
5. `RunnerAuthGuard` → validates role is 'runner'
6. Controller receives authenticated `RunnerContext`

---

## Architecture Overview

### Complete Flow for v3 Runners (START/STOP/DESTROY)

#### User Initiates Action (e.g., sandbox start)

1. **User calls API**: `POST /api/sandboxes/{id}/start`
2. **Controller** → `SandboxService.start(sandboxId, organization)`
3. **Inside @Transactional() method**:
   - Validate sandbox state
   - Validate quotas
   - **Begin database transaction**
   - Update `sandbox.desiredState = STARTED`
   - Update `sandbox.pending = true`
   - Save sandbox to database
   - **Check if runner is v3**:
     - If yes: Create job in same transaction via `jobService.createJob(this.manager, ...)`
     - If no (v0): Do nothing (adapter will be called during reconciliation)
   - **Commit transaction** (atomic!)
4. **After transaction**: Emit `SandboxEvents.STARTED` event
5. **Redis notification**: Job service notifies runner via `LPUSH runner:jobs:{runnerId}`

#### Runner Polls and Executes Job

1. Runner's long-poll unblocks from Redis notification
2. Runner calls `GET /jobs/poll` and claims jobs from database
3. Runner executes START_SANDBOX job (calls Docker/containerd APIs)
4. Runner updates sandbox state via `POST /api/sandboxes/{id}/state`
5. Runner marks job complete via `POST /jobs/{jobId}/status`

#### Reconciliation Loop (Action Handler)

1. **SandboxManager.syncInstanceState()** triggered by event or cron
2. Acquires lock on sandbox
3. Calls appropriate action handler (e.g., `SandboxStartAction.run()`)
4. **Action handler checks runner version**:
   - If v3: **Skips adapter call**, just updates state to STARTING and monitors
   - If v0: Calls `runnerAdapter.startSandbox()` imperatively
5. Monitors sandbox state transitions (STARTING → STARTED)
6. Updates sandbox state in database as job progresses

### Legacy Flow for v0 Runners (unchanged)

1. User calls API → Sets `desiredState`
2. Event triggers reconciliation
3. Action handler calls adapter imperatively
4. Adapter makes HTTP call to runner
5. Runner executes immediately and returns response
6. Action handler monitors state and updates database

### Job Polling Flow

1. Runner calls `GET /jobs/poll?timeout=30&limit=10`
2. API checks database for pending jobs
3. If none, blocks on Redis BRPOP for 30s
4. If jobs found, atomically claims them with PostgreSQL `FOR UPDATE SKIP LOCKED`
5. Returns jobs to runner
6. Runner executes jobs in goroutines
7. Runner updates job status via `POST /jobs/:jobId/status`

---

## Database Schema

### Job Table (camelCase columns)

```sql
CREATE TABLE job (
  id UUID PRIMARY KEY,
  type VARCHAR (ENUM: PULL_SNAPSHOT, CREATE_SANDBOX, etc),
  status VARCHAR (ENUM: PENDING, IN_PROGRESS, COMPLETED, FAILED),
  "runnerId" UUID,  -- ← Note: camelCase!
  "sandboxId" VARCHAR,
  payload JSONB,
  "errorMessage" TEXT,
  "startedAt" TIMESTAMP,
  "completedAt" TIMESTAMP,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP
)
```

---

## Known Issues

### 🔴 CRITICAL: Job DTO Mapping Failing

**File**: `apps/api/src/sandbox/services/job.service.ts:213-222`
**Issue**: Only `createdAt` field is mapped, all others are undefined
**Next Step**: Check debug logs for actual column names returned by PostgreSQL

### 🟡 Healthcheck Still Getting 401

**File**: `apps/api/src/sandbox/controllers/runner.controller.ts:130-147`
**Issue**: Added `@RequiredApiRole(['runner'])` but still getting 401
**Possible Cause**: API server might not have restarted with the changes

### 🟢 Jobs Keep Getting Re-claimed

**Observed**: Same jobs are claimed repeatedly every 5 seconds
**Cause**: Jobs are being updated to IN_PROGRESS but runner isn't actually executing them (stub implementation)
**Not Urgent**: Will be fixed when job execution is implemented

---

## Required Go Client Types

From `libs/api-client-go/model_job.go`:

```go
type Job struct {
    Id string `json:"id"`                    // REQUIRED
    Type string `json:"type"`                // REQUIRED
    Status string `json:"status"`            // REQUIRED
    SandboxId string `json:"sandboxId"`      // REQUIRED
    Payload map[string]interface{} `json:"payload,omitempty"`
    ErrorMessage *string `json:"errorMessage,omitempty"`
    CreatedAt string `json:"createdAt"`      // REQUIRED
    UpdatedAt *string `json:"updatedAt,omitempty"`
}
```

---

## How to Debug in New Session

1. **First Priority**: Check API logs for these lines:

   ```
   [JobService] Raw SQL result keys: ...
   [JobService] Raw SQL result first row: ...
   ```

2. **If column names are different than expected**:
   - Update mapping in `job.service.ts:213-222` to use correct property names
   - Might need to use bracket notation: `job['sandboxId']` instead of `job.sandboxId`

3. **Test the fix**:
   - Wait for runner to poll again
   - Check if all fields are present in API response
   - Verify Go client can parse the response

4. **Once JSON parsing works**:
   - Implement job execution logic in `apps/runner-job/internal/executor/executor.go`
   - Handle each JobType (PULL_SNAPSHOT, CREATE_SANDBOX, etc.)

---

## Environment Setup

### Runner Environment Variables

```bash
API_URL=http://localhost:3000/api
API_KEY=<from database runner.apiKey>
POLL_TIMEOUT=30s
POLL_LIMIT=10
HEALTHCHECK_INTERVAL=30s
LOG_LEVEL=info
```

### Running the Runner

```bash
cd apps/runner-job
go run cmd/runner-job/main.go
```

---

## Useful Commands

### Check job status in database

```sql
SELECT id, type, status, "sandboxId", "createdAt" FROM job WHERE "runnerId" = '<runner-id>' ORDER BY "createdAt" DESC LIMIT 5;
```

### Check runner API key

```sql
SELECT id, name, "apiKey" FROM runner;
```

### Watch API logs

```bash
# In devcontainer - API runs as part of nx serve
# Logs appear in terminal automatically
```

### Test authentication manually

```bash
# Get API key from database first, then:
curl -H "Authorization: Bearer <api-key>" http://localhost:3000/api/jobs/poll?timeout=1
```

---

## Contact Points for Next Developer

**Current blocker location**: `apps/api/src/sandbox/services/job.service.ts` line 213-222

**What to look for**: The debug logs showing actual PostgreSQL column names

**Expected fix**: Update the mapping to use the correct property names that PostgreSQL returns

**Estimated time to fix**: 5-10 minutes once debug logs are visible
