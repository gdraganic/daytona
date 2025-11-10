# JobsApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getJob**](#getjob) | **GET** /jobs/{jobId} | Get job details|
|[**pollJobs**](#polljobs) | **GET** /jobs/poll | Long poll for jobs|
|[**updateJobStatus**](#updatejobstatus) | **POST** /jobs/{jobId}/status | Update job status|

# **getJob**
>
> Job getJob()

### Example

```typescript
import {
    JobsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobsApi(configuration);

let jobId: string; //ID of the job (default to undefined)

const { status, data } = await apiInstance.getJob(
    jobId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **jobId** | [**string**] | ID of the job | defaults to undefined|

### Return type

**Job**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Job details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pollJobs**
>
> PollJobsResponse pollJobs()

Long poll endpoint for runners to fetch pending jobs. Returns immediately if jobs are available, otherwise waits up to timeout seconds.

### Example

```typescript
import {
    JobsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobsApi(configuration);

let timeout: number; //Timeout in seconds for long polling (default: 30, max: 60) (optional) (default to undefined)
let limit: number; //Maximum number of jobs to return (default: 10, max: 100) (optional) (default to undefined)

const { status, data } = await apiInstance.pollJobs(
    timeout,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **timeout** | [**number**] | Timeout in seconds for long polling (default: 30, max: 60) | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of jobs to return (default: 10, max: 100) | (optional) defaults to undefined|

### Return type

**PollJobsResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of jobs for the runner |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateJobStatus**
>
> Job updateJobStatus(updateJobStatus)

### Example

```typescript
import {
    JobsApi,
    Configuration,
    UpdateJobStatus
} from './api';

const configuration = new Configuration();
const apiInstance = new JobsApi(configuration);

let jobId: string; //ID of the job (default to undefined)
let updateJobStatus: UpdateJobStatus; //

const { status, data } = await apiInstance.updateJobStatus(
    jobId,
    updateJobStatus
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateJobStatus** | **UpdateJobStatus**|  | |
| **jobId** | [**string**] | ID of the job | defaults to undefined|

### Return type

**Job**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Job status updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
