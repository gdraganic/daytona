# ConfigApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**configControllerGetConfig**](#configcontrollergetconfig) | **GET** /config | Get config|

# **configControllerGetConfig**
>
> DaytonaConfiguration configControllerGetConfig()

### Example

```typescript
import {
    ConfigApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConfigApi(configuration);

const { status, data } = await apiInstance.configControllerGetConfig();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**DaytonaConfiguration**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Daytona configuration |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
