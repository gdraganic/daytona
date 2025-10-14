# CreateSandboxDTO

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cpuQuota** | **number** |  | [optional] [default to undefined]
**entrypoint** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**env** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**fromVolumeId** | **string** |  | [optional] [default to undefined]
**gpuQuota** | **number** |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**memoryQuota** | **number** |  | [optional] [default to undefined]
**metadata** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**networkAllowList** | **string** |  | [optional] [default to undefined]
**networkBlockAll** | **boolean** |  | [optional] [default to undefined]
**osUser** | **string** |  | [default to undefined]
**registry** | [**RegistryDTO**](RegistryDTO.md) |  | [optional] [default to undefined]
**snapshot** | **string** |  | [default to undefined]
**storageQuota** | **number** |  | [optional] [default to undefined]
**userId** | **string** |  | [default to undefined]
**volumes** | [**Array&lt;DtoVolumeDTO&gt;**](DtoVolumeDTO.md) |  | [optional] [default to undefined]

## Example

```typescript
import { CreateSandboxDTO } from './api';

const instance: CreateSandboxDTO = {
    cpuQuota,
    entrypoint,
    env,
    fromVolumeId,
    gpuQuota,
    id,
    memoryQuota,
    metadata,
    networkAllowList,
    networkBlockAll,
    osUser,
    registry,
    snapshot,
    storageQuota,
    userId,
    volumes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
