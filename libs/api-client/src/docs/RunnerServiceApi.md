# RunnerServiceApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**runnerHealthcheck**](#runnerhealthcheck) | **POST** /runner-service/healthcheck | Runner healthcheck|

# **runnerHealthcheck**
>
> runnerHealthcheck(runnerHealthcheck)

Endpoint for version 3 runners to send healthcheck and metrics. Updates lastChecked timestamp and runner metrics.

### Example

```typescript
import {
    RunnerServiceApi,
    Configuration,
    RunnerHealthcheck
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnerServiceApi(configuration);

let runnerHealthcheck: RunnerHealthcheck; //

const { status, data } = await apiInstance.runnerHealthcheck(
    runnerHealthcheck
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **runnerHealthcheck** | **RunnerHealthcheck**|  | |

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Healthcheck received |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
