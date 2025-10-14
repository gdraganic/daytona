# SshAccessDto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique identifier for the SSH access | [default to undefined]
**sandboxId** | **string** | ID of the sandbox this SSH access is for | [default to undefined]
**token** | **string** | SSH access token | [default to undefined]
**expiresAt** | **Date** | When the SSH access expires | [default to undefined]
**createdAt** | **Date** | When the SSH access was created | [default to undefined]
**updatedAt** | **Date** | When the SSH access was last updated | [default to undefined]

## Example

```typescript
import { SshAccessDto } from './api';

const instance: SshAccessDto = {
    id,
    sandboxId,
    token,
    expiresAt,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
