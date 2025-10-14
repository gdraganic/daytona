# Job

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | The ID of the job | [default to undefined]
**type** | **string** | The type of the job | [default to undefined]
**status** | **string** | The status of the job | [default to undefined]
**resourceType** | **string** | The type of resource this job operates on | [optional] [default to undefined]
**resourceId** | **string** | The ID of the resource this job operates on (sandboxId, snapshotRef, etc.) | [optional] [default to undefined]
**payload** | **{ [key: string]: any; }** | Job-specific payload data (operational metadata) | [optional] [default to undefined]
**traceContext** | **{ [key: string]: any; }** | OpenTelemetry trace context for distributed tracing (W3C Trace Context format) | [optional] [default to undefined]
**errorMessage** | **string** | Error message if the job failed | [optional] [default to undefined]
**createdAt** | **string** | The creation timestamp of the job | [default to undefined]
**updatedAt** | **string** | The last update timestamp of the job | [optional] [default to undefined]

## Example

```typescript
import { Job } from './api';

const instance: Job = {
    id,
    type,
    status,
    resourceType,
    resourceId,
    payload,
    traceContext,
    errorMessage,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
