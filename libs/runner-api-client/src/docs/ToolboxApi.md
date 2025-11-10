# ToolboxApi

All URIs are relative to _http://localhost_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**sandboxesSandboxIdToolboxPathDelete**](#sandboxessandboxidtoolboxpathdelete) | **DELETE** /sandboxes/{sandboxId}/toolbox/{path} | Proxy requests to the sandbox toolbox|
|[**sandboxesSandboxIdToolboxPathGet**](#sandboxessandboxidtoolboxpathget) | **GET** /sandboxes/{sandboxId}/toolbox/{path} | Proxy requests to the sandbox toolbox|
|[**sandboxesSandboxIdToolboxPathPost**](#sandboxessandboxidtoolboxpathpost) | **POST** /sandboxes/{sandboxId}/toolbox/{path} | Proxy requests to the sandbox toolbox|

# **sandboxesSandboxIdToolboxPathDelete**
>
> object sandboxesSandboxIdToolboxPathDelete()

Forwards the request to the specified sandbox\'s container

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; //Sandbox ID (default to undefined)
let path: string; //Path to forward (default to undefined)

const { status, data } = await apiInstance.sandboxesSandboxIdToolboxPathDelete(
    sandboxId,
    path
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] | Sandbox ID | defaults to undefined|
| **path** | [**string**] | Path to forward | defaults to undefined|

### Return type

**object**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: _/_

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Proxied response |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Sandbox container not found |  -  |
|**409** | Sandbox container conflict |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sandboxesSandboxIdToolboxPathGet**
>
> object sandboxesSandboxIdToolboxPathGet()

Forwards the request to the specified sandbox\'s container

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; //Sandbox ID (default to undefined)
let path: string; //Path to forward (default to undefined)

const { status, data } = await apiInstance.sandboxesSandboxIdToolboxPathGet(
    sandboxId,
    path
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] | Sandbox ID | defaults to undefined|
| **path** | [**string**] | Path to forward | defaults to undefined|

### Return type

**object**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: _/_

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Proxied response |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Sandbox container not found |  -  |
|**409** | Sandbox container conflict |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sandboxesSandboxIdToolboxPathPost**
>
> object sandboxesSandboxIdToolboxPathPost()

Forwards the request to the specified sandbox\'s container

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; //Sandbox ID (default to undefined)
let path: string; //Path to forward (default to undefined)

const { status, data } = await apiInstance.sandboxesSandboxIdToolboxPathPost(
    sandboxId,
    path
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] | Sandbox ID | defaults to undefined|
| **path** | [**string**] | Path to forward | defaults to undefined|

### Return type

**object**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: _/_

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Proxied response |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Sandbox container not found |  -  |
|**409** | Sandbox container conflict |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
