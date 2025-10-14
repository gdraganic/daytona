# Organization

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Organization ID | [default to undefined]
**name** | **string** | Organization name | [default to undefined]
**createdBy** | **string** | User ID of the organization creator | [default to undefined]
**personal** | **boolean** | Personal organization flag | [default to undefined]
**createdAt** | **Date** | Creation timestamp | [default to undefined]
**updatedAt** | **Date** | Last update timestamp | [default to undefined]
**suspended** | **boolean** | Suspended flag | [default to undefined]
**suspendedAt** | **Date** | Suspended at | [default to undefined]
**suspensionReason** | **string** | Suspended reason | [default to undefined]
**suspendedUntil** | **Date** | Suspended until | [default to undefined]
**suspensionCleanupGracePeriodHours** | **number** | Suspension cleanup grace period hours | [default to undefined]
**totalCpuQuota** | **number** | Total CPU quota | [default to undefined]
**totalMemoryQuota** | **number** | Total memory quota | [default to undefined]
**totalDiskQuota** | **number** | Total disk quota | [default to undefined]
**maxCpuPerSandbox** | **number** | Max CPU per sandbox | [default to undefined]
**maxMemoryPerSandbox** | **number** | Max memory per sandbox | [default to undefined]
**maxDiskPerSandbox** | **number** | Max disk per sandbox | [default to undefined]
**sandboxLimitedNetworkEgress** | **boolean** | Sandbox default network block all | [default to undefined]

## Example

```typescript
import { Organization } from './api';

const instance: Organization = {
    id,
    name,
    createdBy,
    personal,
    createdAt,
    updatedAt,
    suspended,
    suspendedAt,
    suspensionReason,
    suspendedUntil,
    suspensionCleanupGracePeriodHours,
    totalCpuQuota,
    totalMemoryQuota,
    totalDiskQuota,
    maxCpuPerSandbox,
    maxMemoryPerSandbox,
    maxDiskPerSandbox,
    sandboxLimitedNetworkEgress,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
