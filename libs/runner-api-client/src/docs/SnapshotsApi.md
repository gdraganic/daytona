# SnapshotsApi

All URIs are relative to _http://localhost_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**buildSnapshot**](#buildsnapshot) | **POST** /snapshots/build | Build a snapshot|
|[**getBuildLogs**](#getbuildlogs) | **GET** /snapshots/logs | Get build logs|
|[**pullSnapshot**](#pullsnapshot) | **POST** /snapshots/pull | Pull a snapshot|
|[**removeSnapshot**](#removesnapshot) | **POST** /snapshots/remove | Remove a snapshot|
|[**snapshotExists**](#snapshotexists) | **GET** /snapshots/exists | Check if a snapshot exists|

# **buildSnapshot**
>
> string buildSnapshot(request)

Build a snapshot from a Dockerfile and context hashes

### Example

```typescript
import {
    SnapshotsApi,
    Configuration,
    BuildSnapshotRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new SnapshotsApi(configuration);

let request: BuildSnapshotRequestDTO; //Build snapshot request

const { status, data } = await apiInstance.buildSnapshot(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **BuildSnapshotRequestDTO**| Build snapshot request | |

### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: _/_

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Snapshot successfully built |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBuildLogs**
>
> string getBuildLogs()

Stream build logs

### Example

```typescript
import {
    SnapshotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SnapshotsApi(configuration);

let snapshotRef: string; //Snapshot ID or snapshot ref without the tag (default to undefined)
let follow: boolean; //Whether to follow the log output (optional) (default to undefined)

const { status, data } = await apiInstance.getBuildLogs(
    snapshotRef,
    follow
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **snapshotRef** | [**string**] | Snapshot ID or snapshot ref without the tag | defaults to undefined|
| **follow** | [**boolean**] | Whether to follow the log output | (optional) defaults to undefined|

### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: _/_

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Build logs stream |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pullSnapshot**
>
> string pullSnapshot(request)

Pull a snapshot from a registry

### Example

```typescript
import {
    SnapshotsApi,
    Configuration,
    PullSnapshotRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new SnapshotsApi(configuration);

let request: PullSnapshotRequestDTO; //Pull snapshot

const { status, data } = await apiInstance.pullSnapshot(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **PullSnapshotRequestDTO**| Pull snapshot | |

### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: _/_

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Snapshot successfully pulled |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removeSnapshot**
>
> string removeSnapshot()

Remove a specified snapshot from the local system

### Example

```typescript
import {
    SnapshotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SnapshotsApi(configuration);

let snapshot: string; //Snapshot name and tag (default to undefined)

const { status, data } = await apiInstance.removeSnapshot(
    snapshot
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **snapshot** | [**string**] | Snapshot name and tag | defaults to undefined|

### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Snapshot successfully removed |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **snapshotExists**
>
> SnapshotExistsResponse snapshotExists()

Check if a specified snapshot exists locally

### Example

```typescript
import {
    SnapshotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SnapshotsApi(configuration);

let snapshot: string; //Snapshot name and tag (default to undefined)

const { status, data } = await apiInstance.snapshotExists(
    snapshot
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **snapshot** | [**string**] | Snapshot name and tag | defaults to undefined|

### Return type

**SnapshotExistsResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
