# Runner Job Architecture (Version 3)

## Overview

Runner Job is the version 3 runner implementation that uses a **job polling** mechanism instead of imperative API calls for sandbox management.

## Key Differences from Version 0 (Current Runner)

### Version 0 Runner (apps/runner)

- **Communication**: Imperative API calls from apps/api to runner
- **Flow**: API → Runner (push model)
- **Implementation**: Go-based HTTP API that receives direct commands
- **Example**: API calls `POST /sandboxes` on runner to create sandbox

### Version 3 Runner Job (apps/runner-job)

- **Communication**: Long polling from runner to apps/api
- **Flow**: Runner → API (pull model)
- **Implementation**: Go-based client that polls for jobs
- **Example**: Runner polls `GET /jobs/poll` and receives job to create sandbox

## Components Created

### 1. apps/runner-job (Go Application)

Structure:

```
apps/runner-job/
├── cmd/runner-job/
│   └── main.go          # Entry point (placeholder)
├── internal/            # Internal packages (to be implemented)
├── pkg/                 # Public packages (to be implemented)
├── project.json         # Nx project configuration
├── go.mod              # Go module definition
├── .gitignore
└── README.md
```

### 2. apps/api - Job Polling API

#### DTOs (apps/api/src/sandbox/dto/job.dto.ts)

**JobType Enum:**

- `CREATE_SANDBOX` - Create a new sandbox
- `START_SANDBOX` - Start a stopped sandbox
- `STOP_SANDBOX` - Stop a running sandbox
- `DESTROY_SANDBOX` - Destroy a sandbox
- `CREATE_BACKUP` - Create sandbox backup
- `BUILD_SNAPSHOT` - Build a snapshot from buildInfo
- `PULL_SNAPSHOT` - Pull a snapshot to runner
- `REMOVE_SNAPSHOT` - Remove a snapshot from runner

**JobStatus Enum:**

- `PENDING` - Job created, waiting to be picked up
- `IN_PROGRESS` - Job picked up by runner
- `COMPLETED` - Job successfully completed
- `FAILED` - Job failed with error

**Main DTOs:**

- `JobDto` - Job representation
- `PollJobsRequestDto` - Long poll request parameters
- `PollJobsResponseDto` - Long poll response
- `UpdateJobStatusDto` - Update job status

#### Controller (apps/api/src/sandbox/controllers/job.controller.ts)

**Endpoints:**

1. `GET /jobs/poll` - Long poll for pending jobs
   - Query params: `timeout` (default: 30s, max: 60s), `limit` (default: 10, max: 100)
   - Returns immediately if jobs available, otherwise waits
   - Authenticated with `RunnerAuthGuard`

2. `GET /jobs/:jobId` - Get specific job details
   - Returns job information by ID

3. `POST /jobs/:jobId/status` - Update job status
   - Runner reports job progress (IN_PROGRESS, COMPLETED, FAILED)

## Runner Entity Version Field

The `Runner` entity (apps/api/src/sandbox/entities/runner.entity.ts:105) has a `version` field:

```typescript
@Column({
  default: '0',
})
version: string
```

**Version Mapping:**

- `'0'` - Current imperative runner (apps/runner)
- `'3'` - Job poll-based runner (apps/runner-job)

## Integration Points

### RunnerAdapterFactory

Location: `apps/api/src/sandbox/runner-adapter/runnerAdapter.ts`

Currently handles version '0'. Will need to be extended for version '3':

```typescript
async create(runner: Runner): Promise<RunnerAdapter> {
  switch (runner.version) {
    case '0': {
      const adapter = await this.moduleRef.create(RunnerAdapterLegacy)
      await adapter.init(runner)
      return adapter
    }
    case '3': {
      // TODO: Implement job-based adapter
      // This adapter will create jobs instead of making direct API calls
      throw new Error('Job-based runner adapter not yet implemented')
    }
    default:
      throw new Error(`Unsupported runner version: ${runner.version}`)
  }
}
```

## Next Steps for Implementation

### Phase 1: Job Storage & Management

- [ ] Create Job entity (TypeORM)
- [ ] Implement JobService for CRUD operations
- [ ] Add job creation logic in SandboxManager

### Phase 2: Long Polling Implementation

- [ ] Implement long polling mechanism in JobController
- [ ] Add job queue/priority logic
- [ ] Implement job timeout and retry logic

### Phase 3: Runner Implementation

- [ ] Implement job polling client in apps/runner-job
- [ ] Add job processing logic
- [ ] Implement sandbox operations (create, start, stop, etc.)
- [ ] Add job status reporting

### Phase 4: Runner Adapter

- [ ] Create RunnerAdapterJob for version 3
- [ ] Implement job creation instead of direct API calls
- [ ] Update RunnerAdapterFactory to handle version 3

### Phase 5: Testing & Integration

- [ ] Test job polling mechanism
- [ ] Test sandbox lifecycle with job-based runner
- [ ] Integration tests with apps/api
- [ ] Load testing for concurrent runners

## Benefits of Job-Based Architecture

1. **Resilience**: Jobs persist even if runner disconnects
2. **Scalability**: Multiple runners can poll for jobs
3. **Auditability**: Complete job history
4. **Retry Logic**: Failed jobs can be retried
5. **Priority**: Jobs can be prioritized in queue
6. **Observability**: Easy to monitor job status and performance
