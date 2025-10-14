# RunnersApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRunner**](#createrunner) | **POST** /runners | Create runner|
|[**getRunnerBySandboxId**](#getrunnerbysandboxid) | **GET** /runners/by-sandbox/{sandboxId} | Get runner by sandbox ID|
|[**getRunnersBySnapshotRef**](#getrunnersbysnapshotref) | **GET** /runners/by-snapshot-ref | Get runners by snapshot ref|
|[**listRunners**](#listrunners) | **GET** /runners | List all runners|
|[**updateRunnerScheduling**](#updaterunnerscheduling) | **PATCH** /runners/{id}/scheduling | Update runner scheduling status|

# **createRunner**
>
> createRunner(createRunner)

### Example

```typescript
import {
    RunnersApi,
    Configuration,
    CreateRunner
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let createRunner: CreateRunner; //

const { status, data } = await apiInstance.createRunner(
    createRunner
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRunner** | **CreateRunner**|  | |

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRunnerBySandboxId**
>
> Runner getRunnerBySandboxId()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let sandboxId: string; // (default to undefined)

const { status, data } = await apiInstance.getRunnerBySandboxId(
    sandboxId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|

### Return type

**Runner**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Runner found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRunnersBySnapshotRef**
>
> Array<RunnerSnapshotDto> getRunnersBySnapshotRef()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let ref: string; //Snapshot ref (default to undefined)

const { status, data } = await apiInstance.getRunnersBySnapshotRef(
    ref
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ref** | [**string**] | Snapshot ref | defaults to undefined|

### Return type

**Array<RunnerSnapshotDto>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Runners found for the snapshot |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listRunners**
>
> listRunners()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

const { status, data } = await apiInstance.listRunners();
```

### Parameters

This endpoint does not have any parameters.

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

# **updateRunnerScheduling**
>
> updateRunnerScheduling()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.updateRunnerScheduling(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|

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
