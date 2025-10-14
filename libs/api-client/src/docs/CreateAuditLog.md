# CreateAuditLog

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**actorId** | **string** |  | [default to undefined]
**actorEmail** | **string** |  | [default to undefined]
**organizationId** | **string** |  | [optional] [default to undefined]
**action** | **string** |  | [default to undefined]
**targetType** | **string** |  | [optional] [default to undefined]
**targetId** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateAuditLog } from './api';

const instance: CreateAuditLog = {
    actorId,
    actorEmail,
    organizationId,
    action,
    targetType,
    targetId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
