# RunnersApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRunner**](#createrunner) | **POST** /runners | Create runner|
|[**deleteRunner**](#deleterunner) | **DELETE** /runners/{id} | Delete runner|
|[**getInfoForAuthenticatedRunner**](#getinfoforauthenticatedrunner) | **GET** /runners/me | Get info for authenticated runner|
|[**getRunnerById**](#getrunnerbyid) | **GET** /runners/{id} | Get runner by ID|
|[**getRunnerBySandboxId**](#getrunnerbysandboxid) | **GET** /runners/by-sandbox/{sandboxId} | Get runner by sandbox ID|
|[**getRunnersBySnapshotRef**](#getrunnersbysnapshotref) | **GET** /runners/by-snapshot-ref | Get runners by snapshot ref|
|[**listRunners**](#listrunners) | **GET** /runners | List all runners|
|[**updateRunnerScheduling**](#updaterunnerscheduling) | **PATCH** /runners/{id}/scheduling | Update runner scheduling status|

# **createRunner**
>
> CreateRunnerResponse createRunner(createRunner)

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
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.createRunner(
    createRunner,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRunner** | **CreateRunner**|  | |
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**CreateRunnerResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteRunner**
>
> deleteRunner()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let id: string; //Runner ID (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.deleteRunner(
    id,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Runner ID | defaults to undefined|
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
|**204** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInfoForAuthenticatedRunner**
>
> Runner getInfoForAuthenticatedRunner()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

const { status, data } = await apiInstance.getInfoForAuthenticatedRunner();
```

### Parameters

This endpoint does not have any parameters.

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
|**200** | Runner info |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRunnerById**
>
> Runner getRunnerById()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let id: string; //Runner ID (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getRunnerById(
    id,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Runner ID | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRunnerBySandboxId**
>
> RunnerFull getRunnerBySandboxId()

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

**RunnerFull**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listRunners**
>
> Array<Runner> listRunners()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let region: string; //Filter runners by region name (optional) (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.listRunners(
    region,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **region** | [**string**] | Filter runners by region name | (optional) defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<Runner>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateRunnerScheduling**
>
> Runner updateRunnerScheduling()

### Example

```typescript
import {
    RunnersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RunnersApi(configuration);

let id: string; //Runner ID (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.updateRunnerScheduling(
    id,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Runner ID | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
