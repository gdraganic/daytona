# PreviewApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**hasSandboxAccess**](#hassandboxaccess) | **GET** /preview/{sandboxId}/access | Check if user has access to the sandbox|
|[**isSandboxPublic**](#issandboxpublic) | **GET** /preview/{sandboxId}/public | Check if sandbox is public|
|[**isValidAuthToken**](#isvalidauthtoken) | **GET** /preview/{sandboxId}/validate/{authToken} | Check if sandbox auth token is valid|

# **hasSandboxAccess**
>
> hasSandboxAccess()

### Example

```typescript
import {
    PreviewApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PreviewApi(configuration);

let sandboxId: string; // (default to undefined)

const { status, data } = await apiInstance.hasSandboxAccess(
    sandboxId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **isSandboxPublic**
>
> boolean isSandboxPublic()

### Example

```typescript
import {
    PreviewApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PreviewApi(configuration);

let sandboxId: string; //ID of the sandbox (default to undefined)

const { status, data } = await apiInstance.isSandboxPublic(
    sandboxId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] | ID of the sandbox | defaults to undefined|

### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Public status of the sandbox |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **isValidAuthToken**
>
> boolean isValidAuthToken()

### Example

```typescript
import {
    PreviewApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PreviewApi(configuration);

let sandboxId: string; //ID of the sandbox (default to undefined)
let authToken: string; //Auth token of the sandbox (default to undefined)

const { status, data } = await apiInstance.isValidAuthToken(
    sandboxId,
    authToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] | ID of the sandbox | defaults to undefined|
| **authToken** | [**string**] | Auth token of the sandbox | defaults to undefined|

### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sandbox auth token validation status |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
