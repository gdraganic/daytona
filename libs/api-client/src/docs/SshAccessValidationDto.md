# SshAccessValidationDto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**valid** | **boolean** | Whether the SSH access token is valid | [default to undefined]
**sandboxId** | **string** | ID of the sandbox this SSH access is for | [default to undefined]
**runnerId** | **string** | ID of the runner hosting the sandbox | [optional] [default to undefined]
**runnerDomain** | **string** | Domain of the runner hosting the sandbox | [optional] [default to undefined]

## Example

```typescript
import { SshAccessValidationDto } from './api';

const instance: SshAccessValidationDto = {
    valid,
    sandboxId,
    runnerId,
    runnerDomain,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
