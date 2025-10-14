# Runner Healthcheck System

## Overview

Version 3 (job-based) runners use a **push-based** healthcheck system instead of the imperative API calls used by version 0 runners.

## Comparison: v0 vs v3

| Aspect | Version 0 (Imperative) | Version 3 (Job-Based) |
|--------|------------------------|------------------------|
| **Health Check Method** | API calls runner's `/health` endpoint | Runner sends `POST /runners/healthcheck` |
| **Direction** | API → Runner (pull) | Runner → API (push) |
| **Frequency** | Every 10s (cron job) | Runner decides (recommended: 30s) |
| **Metrics Update** | Fetched via `/info` endpoint | Sent in healthcheck payload |
| **State Detection** | HTTP response | `lastChecked` timestamp |
| **Failure Detection** | HTTP timeout/error | No healthcheck > 60s |

## Version 3 Healthcheck Endpoint

### `POST /runners/healthcheck`

**Authentication:** RunnerAuthGuard (runner API key)

**Request Body:**

```typescript
{
  "metrics": {
    "currentCpuUsagePercentage": 45.5,
    "currentMemoryUsagePercentage": 60.2,
    "currentDiskUsagePercentage": 35.8,
    "currentAllocatedCpu": 8,
    "currentAllocatedMemoryGiB": 16,
    "currentAllocatedDiskGiB": 100,
    "currentSnapshotCount": 5
  }
}
```

**Response:** `200 OK` (empty body)

**What It Does:**

1. Updates `lastChecked` timestamp to current time
2. Updates runner metrics (if provided)
3. Calculates availability score based on metrics
4. Sets runner state to `READY`

## Runner Implementation

### Recommended Healthcheck Loop

```go
package main

import (
    "time"
)

func healthcheckLoop(apiClient *APIClient) {
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()

    for range ticker.C {
        metrics := collectMetrics()

        err := apiClient.SendHealthcheck(context.Background(), &HealthcheckRequest{
            Metrics: &Metrics{
                CurrentCpuUsagePercentage:     metrics.CPU,
                CurrentMemoryUsagePercentage:  metrics.Memory,
                CurrentDiskUsagePercentage:    metrics.Disk,
                CurrentAllocatedCpu:           metrics.AllocatedCPU,
                CurrentAllocatedMemoryGiB:     metrics.AllocatedMemory,
                CurrentAllocatedDiskGiB:       metrics.AllocatedDisk,
                CurrentSnapshotCount:          metrics.SnapshotCount,
            },
        })

        if err != nil {
            log.Errorf("Failed to send healthcheck: %v", err)
            // Continue trying - don't crash
        }
    }
}

func collectMetrics() *RunnerMetrics {
    // Collect real metrics from system
    return &RunnerMetrics{
        CPU:             getCPUUsage(),
        Memory:          getMemoryUsage(),
        Disk:            getDiskUsage(),
        AllocatedCPU:    getAllocatedCPU(),
        AllocatedMemory: getAllocatedMemory(),
        AllocatedDisk:   getAllocatedDisk(),
        SnapshotCount:   countSnapshots(),
    }
}
```

## Cron Health Check (API Side)

**Runs every 10 seconds:** `check-runners` cron job

### For Version 0 Runners

```typescript
// Make HTTP call to runner's health endpoint
await runnerAdapter.healthCheck()

// Fetch metrics
const runnerInfo = await runnerAdapter.runnerInfo()

// Update status
await updateRunnerStatus(runnerId, runnerInfo)
```

### For Version 3 Runners

```typescript
// Check lastChecked timestamp
if (!runner.lastChecked) {
  // Never sent healthcheck
  setRunnerState(UNRESPONSIVE)
  return
}

const age = now() - runner.lastChecked
const threshold = 60000 // 60 seconds

if (age > threshold) {
  // Stale healthcheck
  setRunnerState(UNRESPONSIVE)
} else {
  // Healthy
  setRunnerState(READY)
}
```

## Health Check Threshold

**Default: 60 seconds**

```typescript
const healthCheckThreshold = 60000 // 60 seconds
```

**Rationale:**

- Runner sends healthcheck every 30s
- Allows for 1 missed healthcheck (network blip)
- Marks unresponsive after 2 consecutive misses

**Configurable via:**

```typescript
// In runner.service.ts
const healthCheckThreshold = this.configService.get('runner.healthCheckThreshold', 60000)
```

## State Transitions

### Healthy Runner

```
Initial State: INITIALIZING
↓
Runner sends first healthcheck
↓
State: READY
↓
Runner sends healthcheck every 30s
↓
State remains: READY
```

### Unhealthy Runner

```
State: READY
↓
Runner stops sending healthchecks
↓
Cron detects: lastChecked > 60s ago
↓
State: UNRESPONSIVE
↓
Runner resumes healthchecks
↓
State: READY
```

### Never Initialized

```
Runner created but never started
↓
lastChecked: null
↓
Cron detects: lastChecked is null
↓
State: UNRESPONSIVE
```

## Metrics Collection

### What Metrics to Send

**System Metrics:**

```go
// CPU usage percentage (0-100)
currentCpuUsagePercentage := getCurrentSystemCPU()

// Memory usage percentage (0-100)
currentMemoryUsagePercentage := getCurrentSystemMemory()

// Disk usage percentage (0-100)
currentDiskUsagePercentage := getCurrentSystemDisk()
```

**Allocation Metrics:**

```go
// Total CPU cores allocated to all sandboxes
currentAllocatedCpu := sumSandboxCPUAllocations()

// Total memory GiB allocated to all sandboxes
currentAllocatedMemoryGiB := sumSandboxMemoryAllocations()

// Total disk GiB allocated to all sandboxes
currentAllocatedDiskGiB := sumSandboxDiskAllocations()

// Number of container images/snapshots stored
currentSnapshotCount := countStoredImages()
```

### Example Metrics

```json
{
  "metrics": {
    "currentCpuUsagePercentage": 45.5,      // System showing 45.5% CPU usage
    "currentMemoryUsagePercentage": 60.2,   // System showing 60.2% memory usage
    "currentDiskUsagePercentage": 35.8,     // System showing 35.8% disk usage
    "currentAllocatedCpu": 8,               // 8 CPU cores allocated to sandboxes
    "currentAllocatedMemoryGiB": 16,        // 16 GiB memory allocated to sandboxes
    "currentAllocatedDiskGiB": 100,         // 100 GiB disk allocated to sandboxes
    "currentSnapshotCount": 5               // 5 container images stored
  }
}
```

## Availability Score Calculation

The API uses metrics to calculate an availability score (0-100) using TOPSIS algorithm:

**Factors:**

- CPU usage (lower is better)
- Memory usage (lower is better)
- Disk usage (lower is better)
- CPU allocation (closer to 100% = better utilization)
- Memory allocation (closer to 100% = better utilization)
- Disk allocation (closer to 100% = better utilization)

**Score determines scheduling:**

- Higher score = more likely to be selected
- Runners with low scores may be skipped
- Threshold can be configured

## Monitoring

### Check Runner Health

```sql
-- View all runners with health status
SELECT
  id,
  domain,
  version,
  state,
  last_checked,
  EXTRACT(EPOCH FROM (NOW() - last_checked)) as seconds_since_check,
  availability_score
FROM runner
WHERE state != 'DECOMMISSIONED'
ORDER BY last_checked DESC;
```

### Find Unresponsive Runners

```sql
-- Runners that should be marked unresponsive
SELECT id, domain, version, last_checked
FROM runner
WHERE state != 'DECOMMISSIONED'
  AND (last_checked IS NULL
       OR last_checked < NOW() - INTERVAL '60 seconds');
```

### Track Healthcheck Frequency

```sql
-- View healthcheck patterns
SELECT
  id,
  domain,
  version,
  EXTRACT(EPOCH FROM (NOW() - last_checked)) as seconds_ago,
  CASE
    WHEN last_checked > NOW() - INTERVAL '30 seconds' THEN 'On time'
    WHEN last_checked > NOW() - INTERVAL '60 seconds' THEN 'Late'
    ELSE 'Missed'
  END as status
FROM runner
WHERE version = '3'
  AND state != 'DECOMMISSIONED'
ORDER BY last_checked DESC;
```

## Error Handling

### Runner Side

**If healthcheck fails:**

```go
err := apiClient.SendHealthcheck(ctx, req)
if err != nil {
    log.Errorf("Healthcheck failed: %v", err)
    // Don't crash - keep trying
    // Implement exponential backoff if needed
    return
}
```

**Retry strategy:**

```go
func sendHealthcheckWithRetry(client *APIClient) error {
    maxRetries := 3
    backoff := time.Second

    for i := 0; i < maxRetries; i++ {
        err := client.SendHealthcheck(context.Background(), req)
        if err == nil {
            return nil
        }

        log.Warnf("Healthcheck attempt %d failed: %v", i+1, err)
        if i < maxRetries-1 {
            time.Sleep(backoff)
            backoff *= 2
        }
    }

    return errors.New("all healthcheck attempts failed")
}
```

### API Side

**If runner doesn't send healthcheck:**

- Cron marks runner as UNRESPONSIVE after 60s
- Sandboxes on unresponsive runners aren't affected
- New sandboxes won't be scheduled to unresponsive runners

**When runner resumes:**

- Next healthcheck automatically sets state to READY
- Runner becomes schedulable again

## Configuration

### Runner Configuration (apps/runner-job)

```yaml
healthcheck:
  interval: 30s          # How often to send healthcheck
  timeout: 10s           # HTTP request timeout
  retries: 3             # Number of retries on failure
  backoff: exponential   # Retry backoff strategy
```

### API Configuration

```typescript
// In runner.service.ts
const healthCheckThreshold = this.configService.get(
  'runner.healthCheckThreshold',
  60000  // 60 seconds default
)
```

## Best Practices

### For Runner Implementation

1. **Send healthcheck every 30 seconds**
   - Consistent interval
   - Allows 1 missed check before marked unresponsive

2. **Include accurate metrics**
   - Real system metrics (not hardcoded)
   - Update allocations when sandboxes start/stop

3. **Handle failures gracefully**
   - Retry with backoff
   - Log errors but don't crash
   - Continue sending healthchecks even after failures

4. **Start healthcheck early**
   - Begin sending as soon as runner starts
   - Don't wait for first job

### For API Operations

1. **Monitor unresponsive runners**
   - Alert when multiple runners go unresponsive
   - Investigate patterns (network issues, config problems)

2. **Adjust threshold if needed**
   - 60s works for most cases
   - Increase for unreliable networks
   - Decrease for stricter health requirements

3. **Track availability scores**
   - Ensure scores are being calculated
   - Verify runners with low scores aren't being scheduled

## Troubleshooting

### Runner Shows as UNRESPONSIVE

**Possible causes:**

1. Runner not sending healthchecks
   - Check runner logs
   - Verify healthcheck loop is running

2. Network connectivity issues
   - Check network between runner and API
   - Verify API endpoint is reachable

3. Authentication failures
   - Verify runner API key is correct
   - Check RunnerAuthGuard logs

4. API not receiving healthchecks
   - Check API logs for healthcheck endpoint
   - Verify endpoint is registered

### Healthchecks Being Sent But Not Recorded

**Debug steps:**

1. Check API logs for healthcheck endpoint calls
2. Verify runner authentication is successful
3. Check database for `lastChecked` updates
4. Verify runner ID matches

### Metrics Not Updating

**Possible causes:**

1. Runner sending `null` metrics
2. Metrics calculation failing
3. Database update failing

**Fix:**

- Ensure metrics are included in healthcheck payload
- Check API logs for calculation errors
- Verify database permissions
