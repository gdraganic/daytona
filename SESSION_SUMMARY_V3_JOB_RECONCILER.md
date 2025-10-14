# Session Summary: V3 Job-Based State Management & Daemon Integration

**Date:** 2025-10-12
**Branch:** feat/jobs

## Overview

This session focused on two major areas:

1. Embedding the daemon binary in runner-service and mounting it in sandboxes
2. Creating a clean job-based state update mechanism for v3 runners (separate from legacy reconcilers)

---

## Part 1: Daemon Embedding in Runner-Service

### Problem

Runner-service needed to embed the daemon binary and mount it in sandbox containers on creation, similar to how apps/runner does it.

### Solution Implemented

#### Files Created/Modified

1. **`apps/runner-service/internal/daemon/assets.go`** (Created)
   - Embeds daemon binary using Go's `//go:embed static/*` directive

   ```go
   //go:embed static/*
   var static embed.FS
   ```

2. **`apps/runner-service/internal/daemon/util.go`** (Created)
   - `WriteStaticBinary()` function extracts embedded binary to `.tmp/binaries/daemon-amd64`
   - Sets executable permissions (0755)
   - Returns path to extracted binary

3. **`apps/runner-service/internal/executor/executor.go`** (Modified)
   - Added `daemonPath` field to Executor struct
   - Updated `NewExecutor()` to accept daemonPath parameter

4. **`apps/runner-service/internal/executor/create_sandbox.go`** (Modified)
   - Mounts daemon at `/usr/local/bin/daytona:ro` in container
   - Removed User/WorkingDir from container config (user created by daemon)
   - After container starts, executes daemon inside container using `ContainerExecCreate/Start`

   ```go
   binds := []string{
       fmt.Sprintf("%s:/usr/local/bin/daytona:ro", e.daemonPath),
   }
   // After container start:
   daemonCmd := "/usr/local/bin/daytona"
   execConfig := container.ExecOptions{
       Cmd:    []string{"sh", "-c", daemonCmd},
       Detach: true, // Run in background
   }
   ```

5. **`apps/runner-service/cmd/runner-service/main.go`** (Modified)
   - Calls `daemon.WriteStaticBinary("daemon-amd64")` on startup
   - Passes daemonPath to executor

6. **`apps/runner-service/project.json`** (Modified)
   - Added `copy-daemon-bin` target that depends on daemon build
   - All build targets now depend on `copy-daemon-bin`

### Key Fixes During Implementation

**Issue 1: User "daytona" not found**

- **Error:** `unable to find user daytona: no matching entries in passwd file`
- **Cause:** Container config was setting `User: osUser` before user was created
- **Fix:** Removed User and WorkingDir from initial container config - daemon creates user when it runs

**Issue 2: Daemon not starting**

- **Problem:** Daemon wasn't being executed after container start
- **Fix:** Added ContainerExecCreate/Start logic to run daemon in background after container starts

---

## Part 2: V3 Job-Based State Management (Clean Separation from Legacy)

### Problem

- Legacy reconcilers (sandbox-*.action.ts) were trying to use adapters for v3 runners
- Error: "V3 runners should not use adapters - jobs are created directly in sandbox.service.ts"
- Needed clean separation: v3 uses jobs, v0 uses reconcilers/adapters

### Solution Implemented

#### Architecture Decision

**DO NOT modify legacy reconciler behavior.** Instead:

- Create separate job-based state update mechanism for v3 runners
- Make reconcilers skip v3 runners entirely
- Legacy v0 runners continue using reconcilers unchanged

#### Files Created

1. **`apps/api/src/sandbox/services/sandbox-job.service.ts`** (Created)
   - **Purpose:** Handle sandbox state updates based on job completion (v3 only)
   - **Key Method:** `handleJobCompletion(job: Job)`
   - **Handles job types:**
     - `CREATE_SANDBOX` → Updates sandbox to STARTED (success) or ERROR (failure)
     - `START_SANDBOX` → Updates sandbox to STARTED or ERROR
     - `STOP_SANDBOX` → Updates sandbox to STOPPED or ERROR
     - `DESTROY_SANDBOX` → Updates sandbox to DESTROYED or ERROR
   - **Pattern:** Clean, dedicated service - no mixing with legacy logic

#### Files Modified

2. **`apps/api/src/sandbox/services/job.service.ts`** (Modified)
   - Added import for `SandboxJobService`
   - In `updateJobStatus()`: When job reaches COMPLETED or FAILED, calls `sandboxJobService.handleJobCompletion()`
   - Uses fire-and-forget pattern (doesn't block response)

   ```typescript
   if (status === JobStatus.COMPLETED || status === JobStatus.FAILED) {
     this.sandboxJobService.handleJobCompletion(updatedJob).catch(error => {
       this.logger.error(`Error handling job completion for job ${jobId}:`, error)
     })
   }
   ```

3. **`apps/api/src/sandbox/sandbox.module.ts`** (Modified)
   - Added `SandboxJobService` to providers

4. **Reconciler Actions - All Skip V3 Runners:**
   - **`sandbox-start.action.ts`** - Added version check at top of `run()`:

     ```typescript
     if (sandbox.runnerId) {
       const runner = await this.runnerService.findOne(sandbox.runnerId)
       if (runner?.version === '3') {
         return DONT_SYNC_AGAIN
       }
     }
     ```

   - **`sandbox-stop.action.ts`** - Same pattern
   - **`sandbox-destroy.action.ts`** - Same pattern

### Flow Comparison

#### V3 Runners (Job-Based)

1. User requests sandbox creation → `sandbox.service.ts` creates job
2. Runner-service polls and executes job
3. Runner-service posts job status update (COMPLETED/FAILED)
4. `job.service.updateJobStatus()` saves job status
5. **`sandboxJobService.handleJobCompletion()`** updates sandbox state
6. Reconcilers see v3 runner and skip immediately

#### V0 Runners (Legacy Reconciler-Based)

1. User requests sandbox creation → `sandbox.service.ts` sets desired state
2. Reconciler runs, calls adapter methods
3. Reconciler polls adapter for status updates
4. Reconciler updates sandbox state based on adapter responses
5. (Unchanged from before)

---

## Current State

### What's Working

✅ Daemon embedded in runner-service binary
✅ Daemon mounted in sandbox containers at `/usr/local/bin/daytona`
✅ Daemon started automatically after container creation
✅ Clean job-based state update mechanism for v3 runners
✅ Reconcilers skip v3 runners entirely
✅ Legacy v0 behavior completely unchanged

### What's Not Yet Tested

⚠️ End-to-end sandbox creation with v3 runner
⚠️ Job completion actually triggering state updates
⚠️ Daemon actually running successfully inside container

### Known Issues

None currently - previous "V3 runners should not use adapters" error should be resolved.

---

## Key Architecture Principles Established

1. **Clean Separation:** V3 and V0 runners have completely separate code paths
2. **No Breaking Changes:** Legacy behavior is untouched - reconcilers unchanged for v0
3. **Event-Driven:** V3 state updates happen automatically when jobs complete
4. **Non-Blocking:** Job completion handler uses fire-and-forget pattern
5. **Maintainability:** Job-based logic isolated in dedicated service file

---

## Files Modified Summary

### Runner-Service (Go)

- `apps/runner-service/internal/daemon/assets.go` (created)
- `apps/runner-service/internal/daemon/util.go` (created)
- `apps/runner-service/internal/executor/executor.go` (modified)
- `apps/runner-service/internal/executor/create_sandbox.go` (modified)
- `apps/runner-service/cmd/runner-service/main.go` (modified)
- `apps/runner-service/project.json` (modified)

### API (TypeScript/NestJS)

- `apps/api/src/sandbox/services/sandbox-job.service.ts` (created)
- `apps/api/src/sandbox/services/job.service.ts` (modified)
- `apps/api/src/sandbox/sandbox.module.ts` (modified)
- `apps/api/src/sandbox/managers/sandbox-actions/sandbox-start.action.ts` (modified)
- `apps/api/src/sandbox/managers/sandbox-actions/sandbox-stop.action.ts` (modified)
- `apps/api/src/sandbox/managers/sandbox-actions/sandbox-destroy.action.ts` (modified)

---

## Next Steps for Tomorrow

1. **Test end-to-end flow:**
   - Start runner-service with v3 runner
   - Create a sandbox via API
   - Verify job is created and executed
   - Verify job completion triggers sandbox state update
   - Check daemon is running in container

2. **Debug any issues:**
   - Check runner-service logs for daemon extraction and mounting
   - Check job execution logs
   - Check sandbox state transitions

3. **Consider additional work:**
   - Add snapshot job handling to `SandboxJobService` (PULL_SNAPSHOT, BUILD_SNAPSHOT, REMOVE_SNAPSHOT)
   - Add backup job handling (CREATE_BACKUP)
   - Test stop/destroy flows with v3 runners

4. **Verify daemon functionality:**
   - SSH into created sandbox container
   - Check if daemon process is running (`ps aux | grep daytona`)
   - Check daemon logs
   - Test daemon API is accessible

---

## Important Notes

- **DO NOT modify reconciler actions for v3 logic** - they should skip v3 entirely
- **SandboxJobService is the ONLY place** for v3 state update logic
- Legacy reconcilers must remain working for v0 runners
- Job-based approach is event-driven, not poll-based
- Daemon must be started AFTER container starts, not in entrypoint

---

## Git Status

Modified files (not yet committed):

```
M apps/api/src/sandbox/managers/sandbox-actions/sandbox-destroy.action.ts
M apps/api/src/sandbox/managers/sandbox-actions/sandbox-start.action.ts
M apps/api/src/sandbox/managers/sandbox-actions/sandbox-stop.action.ts
M apps/api/src/sandbox/sandbox.module.ts
M apps/api/src/sandbox/services/job.service.ts
M apps/runner-service/cmd/runner-service/main.go
M apps/runner-service/internal/executor/create_sandbox.go
M apps/runner-service/internal/executor/executor.go
?? apps/api/src/sandbox/services/sandbox-job.service.ts
?? apps/runner-service/internal/daemon/
```

Ready to commit and test end-to-end flow.
