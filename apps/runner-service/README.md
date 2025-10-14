# Daytona Runner Job (Version 3)

Job-based runner implementation for Daytona sandboxes using long-polling architecture.

## Architecture

This runner implements a **job-based architecture** where:

1. **API creates jobs** in the database when operations need to be performed
2. **Runner polls for jobs** using long-polling (30s timeout by default)
3. **Runner executes jobs** and reports status back to API
4. **Runner sends healthchecks** every 30 seconds with system metrics

### Components

```
┌─────────────────────────────────────────────────────────┐
│                     Runner Job                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐         ┌─────────────────┐         │
│  │   Poller     │────────▶│    Executor     │         │
│  │              │         │                 │         │
│  │ - Long poll  │         │ - Create        │         │
│  │ - 30s timeout│         │ - Start         │         │
│  │ - Batch jobs │         │ - Stop          │         │
│  └──────────────┘         │ - Destroy       │         │
│                           │ - Backup        │         │
│  ┌──────────────┐         │ - Snapshot ops  │         │
│  │ Healthcheck  │         └─────────────────┘         │
│  │              │                                      │
│  │ - Every 30s  │         ┌─────────────────┐         │
│  │ - Push-based │────────▶│    Metrics      │         │
│  │ - With metrics│         │                 │         │
│  └──────────────┘         │ - CPU/Mem/Disk  │         │
│                           │ - Allocations   │         │
│                           │ - Snapshots     │         │
│                           └─────────────────┘         │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
                  ┌────────────────┐
                  │   Daytona API  │
                  │                │
                  │ - Job Queue    │
                  │ - Health Check │
                  └────────────────┘
```

## Configuration

Configuration is loaded from environment variables:

### Required Variables

```bash
# API Configuration
API_URL=http://localhost:3000          # Daytona API URL
API_KEY=your-runner-api-key            # Runner API key (identifies the runner)
```

**Note**: The runner is identified by its API key. The API resolves the runner ID from the API key via `RunnerAuthGuard`, so no separate `RUNNER_ID` is needed.

### Optional Variables

```bash
# Job Polling (defaults shown)
POLL_TIMEOUT=30s                       # Long poll timeout (1-60s)
POLL_LIMIT=10                          # Max jobs per poll (1-100)

# Healthcheck (defaults shown)
HEALTHCHECK_INTERVAL=30s               # Healthcheck frequency (min 10s)
HEALTHCHECK_TIMEOUT=10s                # Healthcheck request timeout

# Metrics (defaults shown)
METRICS_ENABLED=true                   # Enable metrics collection
```

## Running the Runner

### From Source

```bash
# Set environment variables
export API_URL=http://localhost:3000
export API_KEY=your-runner-api-key

# Run
cd apps/runner-job
go run cmd/runner-job/main.go
```

### Build Binary

```bash
cd apps/runner-job
go build -o runner-job cmd/runner-job/main.go
./runner-job
```

### Using Nx

```bash
# Build
nx build runner-job

# Run
nx serve runner-job
```

## Job Types

The runner handles the following job types:

### Sandbox Operations

- **CREATE_SANDBOX**: Create a new sandbox container
- **START_SANDBOX**: Start an existing sandbox
- **STOP_SANDBOX**: Stop a running sandbox
- **DESTROY_SANDBOX**: Remove a sandbox and clean up resources

### Backup Operations

- **CREATE_BACKUP**: Create a backup of a sandbox

### Snapshot Operations

- **BUILD_SNAPSHOT**: Build a new snapshot/image
- **PULL_SNAPSHOT**: Pull a snapshot from registry
- **REMOVE_SNAPSHOT**: Remove a snapshot from local storage

## Implementation Status

### ✅ Completed

- **Configuration**: Environment-based configuration with validation
- **Job Polling**: Long-polling with 3-step fallback (DB → Redis → DB)
- **Healthcheck**: Push-based healthcheck with metrics
- **Metrics Collection**: System metrics (CPU, memory, disk) + allocations
- **Job Executor**: Dispatcher framework for all job types
- **Graceful Shutdown**: SIGINT/SIGTERM handling

### 🚧 TODO (Container Runtime Integration)

The current implementation has **placeholder job handlers**. To make this production-ready, you need to integrate with a container runtime:

#### Option 1: Docker

```go
import "github.com/docker/docker/client"

func (e *Executor) createSandbox(ctx context.Context, job *apiclient.Job) error {
    cli, err := client.NewClientWithOpts(client.FromEnv)
    if err != nil {
        return err
    }

    // Pull image
    reader, err := cli.ImagePull(ctx, snapshot, types.ImagePullOptions{})
    // ... handle reader

    // Create container
    resp, err := cli.ContainerCreate(ctx, &container.Config{
        Image: snapshot,
        Env:   envVars,
        // ... other config
    }, &container.HostConfig{
        Resources: container.Resources{
            NanoCPUs: int64(cpu * 1e9),
            Memory:   int64(memory * 1024 * 1024 * 1024),
        },
    }, nil, nil, "")

    // Start container
    return cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{})
}
```

## Metrics

The runner collects and reports metrics with each healthcheck:

### System Metrics (Real-time)

- **CPU Usage**: Current CPU utilization percentage (0-100)
- **Memory Usage**: Current memory utilization percentage (0-100)
- **Disk Usage**: Current disk utilization percentage (0-100)

### Allocation Metrics (Tracked)

- **Allocated CPU**: Total CPU cores allocated to sandboxes
- **Allocated Memory**: Total memory (GiB) allocated to sandboxes
- **Allocated Disk**: Total disk (GiB) allocated to sandboxes
- **Snapshot Count**: Number of snapshots/images stored locally

These metrics are used by the API to calculate an **availability score** (TOPSIS algorithm) for intelligent runner selection.

## Troubleshooting

### Runner Not Receiving Jobs

1. **Check connectivity to API**:

   ```bash
   curl -H "x-runner-api-key: $API_KEY" $API_URL/jobs/poll?timeout=5
   ```

2. **Verify runner is registered**:
   - Check API logs for runner registration
   - Ensure runner version is '3' in database

3. **Check logs**:

   ```bash
   # Runner should show:
   # - "Starting job poller..."
   # - Polling attempts every 30s
   ```

### Runner Marked as UNRESPONSIVE

1. **Check healthcheck logs**:

   ```bash
   # Should see every 30s:
   # "Healthcheck sent successfully"
   ```

2. **Verify API connectivity**:

   ```bash
   curl -X POST -H "x-runner-api-key: $API_KEY" \
        $API_URL/runners/healthcheck
   ```

## Development

### Project Structure

```
apps/runner-job/
├── cmd/
│   └── runner-job/
│       └── main.go              # Entry point
├── internal/
│   ├── config/
│   │   └── config.go            # Configuration loader
│   ├── executor/
│   │   └── executor.go          # Job execution logic
│   ├── healthcheck/
│   │   └── healthcheck.go       # Healthcheck service
│   ├── metrics/
│   │   └── collector.go         # Metrics collection
│   └── poller/
│       └── poller.go            # Job polling service
├── go.mod
└── README.md
```

### Adding a New Job Type

1. **Define constant** in `executor/executor.go`:

   ```go
   const JobTypeNewOperation = "NEW_OPERATION"
   ```

2. **Add case** in `executeJob()`:

   ```go
   case JobTypeNewOperation:
       return e.newOperation(ctx, job)
   ```

3. **Implement handler**:

   ```go
   func (e *Executor) newOperation(ctx context.Context, job *apiclient.Job) error {
       // Implementation
       return nil
   }
   ```

## Related Documentation

- [HEALTHCHECK.md](HEALTHCHECK.md) - Healthcheck system details
- [ATOMIC-CLAIMING.md](ATOMIC-CLAIMING.md) - How duplicate prevention works
- [POLLING-STRATEGY.md](POLLING-STRATEGY.md) - Polling implementation
- [IMPLEMENTATION-COMPLETE.md](IMPLEMENTATION-COMPLETE.md) - Full implementation summary

## License

AGPL-3.0 - Copyright 2025 Daytona Platforms Inc.
