# ApiKeysApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createApiKey**](#createapikey) | **POST** /api-keys | Create API key|
|[**deleteApiKey**](#deleteapikey) | **DELETE** /api-keys/{name} | Delete API key|
|[**deleteApiKeyForUser**](#deleteapikeyforuser) | **DELETE** /api-keys/{userId}/{name} | Delete API key for user|
|[**getApiKey**](#getapikey) | **GET** /api-keys/{name} | Get API key|
|[**getCurrentApiKey**](#getcurrentapikey) | **GET** /api-keys/current | Get current API key\&#39;s details|
|[**listApiKeys**](#listapikeys) | **GET** /api-keys | List API keys|

# **createApiKey**
>
> ApiKeyResponse createApiKey(createApiKey)

### Example

```typescript
import {
    ApiKeysApi,
    Configuration,
    CreateApiKey
} from './api';

const configuration = new Configuration();
const apiInstance = new ApiKeysApi(configuration);

let createApiKey: CreateApiKey; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.createApiKey(
    createApiKey,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createApiKey** | **CreateApiKey**|  | |
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ApiKeyResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | API key created successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteApiKey**
>
> deleteApiKey()

### Example

```typescript
import {
    ApiKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApiKeysApi(configuration);

let name: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.deleteApiKey(
    name,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

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
|**204** | API key deleted successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteApiKeyForUser**
>
> deleteApiKeyForUser()

### Example

```typescript
import {
    ApiKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApiKeysApi(configuration);

let userId: string; // (default to undefined)
let name: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.deleteApiKeyForUser(
    userId,
    name,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|
| **name** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

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
|**204** | API key deleted successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getApiKey**
>
> ApiKeyList getApiKey()

### Example

```typescript
import {
    ApiKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApiKeysApi(configuration);

let name: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getApiKey(
    name,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ApiKeyList**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | API key retrieved successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCurrentApiKey**
>
> ApiKeyList getCurrentApiKey()

### Example

```typescript
import {
    ApiKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApiKeysApi(configuration);

let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getCurrentApiKey(
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ApiKeyList**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | API key retrieved successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listApiKeys**
>
> Array<ApiKeyList> listApiKeys()

### Example

```typescript
import {
    ApiKeysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApiKeysApi(configuration);

let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.listApiKeys(
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<ApiKeyList>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | API keys retrieved successfully. |  -  |
|**500** | Error fetching API keys. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
