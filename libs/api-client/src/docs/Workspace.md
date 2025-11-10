# Workspace

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | The ID of the sandbox | [default to undefined]
**organizationId** | **string** | The organization ID of the sandbox | [default to undefined]
**name** | **string** | The name of the sandbox | [default to undefined]
**snapshot** | **string** | The snapshot used for the sandbox | [optional] [default to undefined]
**user** | **string** | The user associated with the project | [default to undefined]
**env** | **{ [key: string]: string; }** | Environment variables for the sandbox | [default to undefined]
**labels** | **{ [key: string]: string; }** | Labels for the sandbox | [default to undefined]
**_public** | **boolean** | Whether the sandbox http preview is public | [default to undefined]
**networkBlockAll** | **boolean** | Whether to block all network access for the sandbox | [default to undefined]
**networkAllowList** | **string** | Comma-separated list of allowed CIDR network addresses for the sandbox | [optional] [default to undefined]
**target** | **string** | The target environment for the sandbox | [default to undefined]
**cpu** | **number** | The CPU quota for the sandbox | [default to undefined]
**gpu** | **number** | The GPU quota for the sandbox | [default to undefined]
**memory** | **number** | The memory quota for the sandbox | [default to undefined]
**disk** | **number** | The disk quota for the sandbox | [default to undefined]
**state** | [**SandboxState**](SandboxState.md) | The state of the sandbox | [optional] [default to undefined]
**desiredState** | [**SandboxDesiredState**](SandboxDesiredState.md) | The desired state of the sandbox | [optional] [default to undefined]
**errorReason** | **string** | The error reason of the sandbox | [optional] [default to undefined]
**backupState** | **string** | The state of the backup | [optional] [default to undefined]
**backupCreatedAt** | **string** | The creation timestamp of the last backup | [optional] [default to undefined]
**autoStopInterval** | **number** | Auto-stop interval in minutes (0 means disabled) | [optional] [default to undefined]
**autoArchiveInterval** | **number** | Auto-archive interval in minutes | [optional] [default to undefined]
**autoDeleteInterval** | **number** | Auto-delete interval in minutes (negative value means disabled, 0 means delete immediately upon stopping) | [optional] [default to undefined]
**volumes** | [**Array&lt;SandboxVolume&gt;**](SandboxVolume.md) | Array of volumes attached to the sandbox | [optional] [default to undefined]
**buildInfo** | [**BuildInfo**](BuildInfo.md) | Build information for the sandbox | [optional] [default to undefined]
**createdAt** | **string** | The creation timestamp of the sandbox | [optional] [default to undefined]
**updatedAt** | **string** | The last update timestamp of the sandbox | [optional] [default to undefined]
**_class** | **string** | The class of the sandbox | [optional] [default to undefined]
**daemonVersion** | **string** | The version of the daemon running in the sandbox | [optional] [default to undefined]
**image** | **string** | The image used for the workspace | [optional] [default to undefined]
**snapshotState** | **string** | The state of the snapshot | [optional] [default to undefined]
**snapshotCreatedAt** | **string** | The creation timestamp of the last snapshot | [optional] [default to undefined]
**info** | [**SandboxInfo**](SandboxInfo.md) | Additional information about the sandbox | [optional] [default to undefined]

## Example

```typescript
import { Workspace } from './api';

const instance: Workspace = {
    id,
    organizationId,
    name,
    snapshot,
    user,
    env,
    labels,
    _public,
    networkBlockAll,
    networkAllowList,
    target,
    cpu,
    gpu,
    memory,
    disk,
    state,
    desiredState,
    errorReason,
    backupState,
    backupCreatedAt,
    autoStopInterval,
    autoArchiveInterval,
    autoDeleteInterval,
    volumes,
    buildInfo,
    createdAt,
    updatedAt,
    _class,
    daemonVersion,
    image,
    snapshotState,
    snapshotCreatedAt,
    info,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
