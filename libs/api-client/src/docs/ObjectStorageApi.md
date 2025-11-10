# ObjectStorageApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getPushAccess**](#getpushaccess) | **GET** /object-storage/push-access | Get temporary storage access for pushing objects|

# **getPushAccess**
>
> StorageAccessDto getPushAccess()

### Example

```typescript
import {
    ObjectStorageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ObjectStorageApi(configuration);

let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getPushAccess(
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**StorageAccessDto**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Temporary storage access has been generated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
