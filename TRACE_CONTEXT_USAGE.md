# OpenTelemetry Trace Context Propagation in Jobs

## Overview

The job system now includes OpenTelemetry trace context propagation, allowing distributed tracing across the API and runner services. When the API creates a job, it automatically captures the current trace context and stores it in the job's `traceContext` field.

## Architecture

### API Side (apps/api)

When a job is created (e.g., for CREATE_SANDBOX, START_SANDBOX, etc.), the API:

1. **Captures trace context** from the current OpenTelemetry context using `propagation.inject()`
2. **Stores trace context** in the `job.traceContext` JSONB column
3. **Returns trace context** in the job payload when runner polls for jobs

The trace context is automatically captured in `JobService.createJob()`:

```typescript
private captureTraceContext(): Record<string, string> | null {
  const carrier: Record<string, string> = {}
  propagation.inject(otelContext.active(), carrier)
  return carrier
}
```

### Runner-Service Side (apps/runner-service)

After regenerating the OpenAPI client, runner-service will receive jobs with a `traceContext` field containing:

```json
{
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  "tracestate": "..."
}
```

## Implementation Steps for Runner-Service

### 1. Regenerate OpenAPI Client

After the database migration runs and OpenAPI spec is updated:

```bash
cd apps/runner-service
# Regenerate the Go client (update the command as needed)
make generate-client
```

### 2. Extract Trace Context from Job

In the executor, when processing a job:

```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/propagation"
    "go.opentelemetry.io/otel/trace"
)

func (e *Executor) executeJob(ctx context.Context, job *apiclient.Job) error {
    // Extract trace context from job
    ctx = e.extractTraceContext(ctx, job)

    // Start a new span that continues the trace
    tracer := otel.Tracer("runner-service")
    ctx, span := tracer.Start(ctx, fmt.Sprintf("execute_%s", job.GetType()))
    defer span.End()

    // Execute job with trace context
    switch job.GetType() {
    case "CREATE_SANDBOX":
        return e.createSandbox(ctx, job)
    // ...
    }
}

func (e *Executor) extractTraceContext(ctx context.Context, job *apiclient.Job) context.Context {
    traceContext := job.GetTraceContext()
    if traceContext == nil || len(traceContext) == 0 {
        e.log.Debug("no trace context in job")
        return ctx
    }

    // Extract trace context using W3C Trace Context propagator
    propagator := propagation.TraceContext{}
    ctx = propagator.Extract(ctx, propagation.MapCarrier(traceContext))

    e.log.Debug("extracted trace context",
        "job_id", job.GetId(),
        "trace_id", trace.SpanContextFromContext(ctx).TraceID().String())

    return ctx
}
```

### 3. Pass Context to All Operations

Ensure the context with trace information is passed to all Docker operations:

```go
func (e *Executor) createSandbox(ctx context.Context, job *apiclient.Job) error {
    // Context already contains trace information from extractTraceContext

    // All Docker operations will be traced
    reader, err := e.dockerClient.ImagePull(ctx, snapshot, pullOptions)
    // ...

    resp, err := e.dockerClient.ContainerCreate(ctx, ...)
    // ...

    err = e.dockerClient.ContainerStart(ctx, sandboxId, startOptions)
    // ...
}
```

## Trace Context Format

The trace context follows the [W3C Trace Context](https://www.w3.org/TR/trace-context/) specification:

### traceparent Format

```
00-<trace-id>-<parent-span-id>-<trace-flags>
```

Example:

```
00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
```

- Version: `00`
- Trace ID: `4bf92f3577b34da6a3ce929d0e0e4736` (128-bit)
- Parent Span ID: `00f067aa0ba902b7` (64-bit)
- Trace Flags: `01` (sampled)

### tracestate (optional)

Vendor-specific trace information:

```
vendorname1=value1,vendorname2=value2
```

## Benefits

1. **End-to-End Visibility**: Trace requests from user API call → job creation → job execution → completion
2. **Performance Analysis**: Identify bottlenecks across service boundaries
3. **Error Correlation**: Link errors in runner-service back to originating API request
4. **Service Dependencies**: Visualize how jobs flow through the system

## Example Trace Flow

```
User Request (API)
  └─ POST /api/sandboxes
      └─ SandboxService.createFromSnapshot() [span 1]
          └─ JobService.createJob() [span 2]
              └─ PostgreSQL INSERT [span 3]
              └─ Redis LPUSH notification [span 4]

Runner Service
  └─ Poll jobs [span 5] (parent: span 2)
      └─ Execute CREATE_SANDBOX [span 6] (parent: span 2)
          └─ Docker ImagePull [span 7]
          └─ Docker ContainerCreate [span 8]
          └─ Docker ContainerStart [span 9]
          └─ waitForDaemonRunning [span 10]
```

All spans will be linked by the same `trace-id`, making the entire operation visible in your tracing backend (Jaeger, Tempo, etc.).

## Testing

### Verify Trace Context is Captured

1. Enable OpenTelemetry in API: `OTEL_ENABLED=true`
2. Create a sandbox via API
3. Check logs for: `"Captured trace context: {...}"`
4. Verify job in database has `traceContext` populated:

```sql
SELECT id, type, "traceContext" FROM job WHERE type = 'CREATE_SANDBOX' ORDER BY "createdAt" DESC LIMIT 1;
```

### Verify Trace Continuation in Runner

1. Enable OpenTelemetry in runner-service
2. Runner processes job
3. Check that traces in your observability backend show:
   - Same trace ID across API and runner spans
   - Parent-child relationships between spans
   - Complete timeline from API request to job completion

## Troubleshooting

### No trace context in jobs

- Ensure `OTEL_ENABLED=true` in API environment
- Check that OpenTelemetry SDK is initialized before job creation
- Verify incoming request has trace headers

### Trace context not continuing in runner

- Ensure OpenTelemetry Go SDK is initialized
- Check that `propagation.TraceContext{}` is used (not `TextMapPropagator`)
- Verify context is passed to all Docker operations

### Broken trace chains

- Ensure context is passed through all function calls
- Check that spans are properly started with parent context
- Verify span.End() is called (use defer)
