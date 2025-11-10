# SandboxApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**archiveSandbox**](#archivesandbox) | **POST** /sandbox/{sandboxIdOrName}/archive | Archive sandbox|
|[**createBackup**](#createbackup) | **POST** /sandbox/{sandboxIdOrName}/backup | Create sandbox backup|
|[**createSandbox**](#createsandbox) | **POST** /sandbox | Create a new sandbox|
|[**createSshAccess**](#createsshaccess) | **POST** /sandbox/{sandboxIdOrName}/ssh-access | Create SSH access for sandbox|
|[**deleteSandbox**](#deletesandbox) | **DELETE** /sandbox/{sandboxIdOrName} | Delete sandbox|
|[**getBuildLogs**](#getbuildlogs) | **GET** /sandbox/{sandboxIdOrName}/build-logs | Get build logs|
|[**getPortPreviewUrl**](#getportpreviewurl) | **GET** /sandbox/{sandboxIdOrName}/ports/{port}/preview-url | Get preview URL for a sandbox port|
|[**getSandbox**](#getsandbox) | **GET** /sandbox/{sandboxIdOrName} | Get sandbox details|
|[**getSandboxRegions**](#getsandboxregions) | **GET** /sandbox/regions | List all regions where sandboxes have been created|
|[**getSandboxesForRunner**](#getsandboxesforrunner) | **GET** /sandbox/for-runner | Get sandboxes for the authenticated runner|
|[**listSandboxes**](#listsandboxes) | **GET** /sandbox | List all sandboxes|
|[**listSandboxesPaginated**](#listsandboxespaginated) | **GET** /sandbox/paginated | List all sandboxes paginated|
|[**replaceLabels**](#replacelabels) | **PUT** /sandbox/{sandboxIdOrName}/labels | Replace sandbox labels|
|[**revokeSshAccess**](#revokesshaccess) | **DELETE** /sandbox/{sandboxIdOrName}/ssh-access | Revoke SSH access for sandbox|
|[**setAutoArchiveInterval**](#setautoarchiveinterval) | **POST** /sandbox/{sandboxIdOrName}/autoarchive/{interval} | Set sandbox auto-archive interval|
|[**setAutoDeleteInterval**](#setautodeleteinterval) | **POST** /sandbox/{sandboxIdOrName}/autodelete/{interval} | Set sandbox auto-delete interval|
|[**setAutostopInterval**](#setautostopinterval) | **POST** /sandbox/{sandboxIdOrName}/autostop/{interval} | Set sandbox auto-stop interval|
|[**startSandbox**](#startsandbox) | **POST** /sandbox/{sandboxIdOrName}/start | Start sandbox|
|[**stopSandbox**](#stopsandbox) | **POST** /sandbox/{sandboxIdOrName}/stop | Stop sandbox|
|[**updatePublicStatus**](#updatepublicstatus) | **POST** /sandbox/{sandboxIdOrName}/public/{isPublic} | Update public status|
|[**updateSandboxState**](#updatesandboxstate) | **PUT** /sandbox/{sandboxId}/state | Update sandbox state|
|[**validateSshAccess**](#validatesshaccess) | **GET** /sandbox/ssh-access/validate | Validate SSH access for sandbox|

# **archiveSandbox**
>
> Sandbox archiveSandbox()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.archiveSandbox(
    sandboxIdOrName,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sandbox has been archived |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createBackup**
>
> Sandbox createBackup()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.createBackup(
    sandboxIdOrName,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sandbox backup has been initiated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createSandbox**
>
> Sandbox createSandbox(createSandbox)

### Example

```typescript
import {
    SandboxApi,
    Configuration,
    CreateSandbox
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let createSandbox: CreateSandbox; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.createSandbox(
    createSandbox,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSandbox** | **CreateSandbox**|  | |
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The sandbox has been successfully created. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createSshAccess**
>
> SshAccessDto createSshAccess()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let expiresInMinutes: number; //Expiration time in minutes (default: 60) (optional) (default to undefined)

const { status, data } = await apiInstance.createSshAccess(
    sandboxIdOrName,
    xDaytonaOrganizationID,
    expiresInMinutes
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **expiresInMinutes** | [**number**] | Expiration time in minutes (default: 60) | (optional) defaults to undefined|

### Return type

**SshAccessDto**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | SSH access has been created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteSandbox**
>
> Sandbox deleteSandbox()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.deleteSandbox(
    sandboxIdOrName,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sandbox has been deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBuildLogs**
>
> getBuildLogs()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let follow: boolean; //Whether to follow the logs stream (optional) (default to undefined)

const { status, data } = await apiInstance.getBuildLogs(
    sandboxIdOrName,
    xDaytonaOrganizationID,
    follow
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **follow** | [**boolean**] | Whether to follow the logs stream | (optional) defaults to undefined|

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
|**200** | Build logs stream |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPortPreviewUrl**
>
> PortPreviewUrl getPortPreviewUrl()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let port: number; //Port number to get preview URL for (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getPortPreviewUrl(
    sandboxIdOrName,
    port,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **port** | [**number**] | Port number to get preview URL for | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**PortPreviewUrl**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Preview URL for the specified port |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSandbox**
>
> Sandbox getSandbox()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let verbose: boolean; //Include verbose output (optional) (default to undefined)

const { status, data } = await apiInstance.getSandbox(
    sandboxIdOrName,
    xDaytonaOrganizationID,
    verbose
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **verbose** | [**boolean**] | Include verbose output | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sandbox details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSandboxRegions**
>
> Array<Region> getSandboxRegions()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getSandboxRegions(
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<Region>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of regions where sandboxes have been created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSandboxesForRunner**
>
> Array<Sandbox> getSandboxesForRunner()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let states: string; //Comma-separated list of sandbox states to filter by (optional) (default to undefined)
let skipReconcilingSandboxes: boolean; //Skip sandboxes where state differs from desired state (optional) (default to undefined)

const { status, data } = await apiInstance.getSandboxesForRunner(
    xDaytonaOrganizationID,
    states,
    skipReconcilingSandboxes
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **states** | [**string**] | Comma-separated list of sandbox states to filter by | (optional) defaults to undefined|
| **skipReconcilingSandboxes** | [**boolean**] | Skip sandboxes where state differs from desired state | (optional) defaults to undefined|

### Return type

**Array<Sandbox>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of sandboxes for the authenticated runner |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listSandboxes**
>
> Array<Sandbox> listSandboxes()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let verbose: boolean; //Include verbose output (optional) (default to undefined)
let labels: string; //JSON encoded labels to filter by (optional) (default to undefined)
let includeErroredDeleted: boolean; //Include errored and deleted sandboxes (optional) (default to undefined)

const { status, data } = await apiInstance.listSandboxes(
    xDaytonaOrganizationID,
    verbose,
    labels,
    includeErroredDeleted
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **verbose** | [**boolean**] | Include verbose output | (optional) defaults to undefined|
| **labels** | [**string**] | JSON encoded labels to filter by | (optional) defaults to undefined|
| **includeErroredDeleted** | [**boolean**] | Include errored and deleted sandboxes | (optional) defaults to undefined|

### Return type

**Array<Sandbox>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all sandboxes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listSandboxesPaginated**
>
> PaginatedSandboxes listSandboxesPaginated()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let page: number; //Page number of the results (optional) (default to 1)
let limit: number; //Number of results per page (optional) (default to 100)
let id: string; //Filter by partial ID match (optional) (default to undefined)
let name: string; //Filter by partial name match (optional) (default to undefined)
let labels: string; //JSON encoded labels to filter by (optional) (default to undefined)
let includeErroredDeleted: boolean; //Include results with errored state and deleted desired state (optional) (default to false)
let states: Array<'creating' | 'restoring' | 'destroying' | 'started' | 'stopped' | 'starting' | 'stopping' | 'error' | 'build_failed' | 'pending_build' | 'building_snapshot' | 'unknown' | 'pulling_snapshot' | 'archived' | 'archiving'>; //List of states to filter by (optional) (default to undefined)
let snapshots: Array<string>; //List of snapshot names to filter by (optional) (default to undefined)
let regions: Array<string>; //List of regions to filter by (optional) (default to undefined)
let minCpu: number; //Minimum CPU (optional) (default to undefined)
let maxCpu: number; //Maximum CPU (optional) (default to undefined)
let minMemoryGiB: number; //Minimum memory in GiB (optional) (default to undefined)
let maxMemoryGiB: number; //Maximum memory in GiB (optional) (default to undefined)
let minDiskGiB: number; //Minimum disk space in GiB (optional) (default to undefined)
let maxDiskGiB: number; //Maximum disk space in GiB (optional) (default to undefined)
let lastEventAfter: Date; //Include items with last event after this timestamp (optional) (default to undefined)
let lastEventBefore: Date; //Include items with last event before this timestamp (optional) (default to undefined)
let sort: 'id' | 'name' | 'state' | 'snapshot' | 'region' | 'updatedAt' | 'createdAt'; //Field to sort by (optional) (default to 'createdAt')
let order: 'asc' | 'desc'; //Direction to sort by (optional) (default to 'desc')

const { status, data } = await apiInstance.listSandboxesPaginated(
    xDaytonaOrganizationID,
    page,
    limit,
    id,
    name,
    labels,
    includeErroredDeleted,
    states,
    snapshots,
    regions,
    minCpu,
    maxCpu,
    minMemoryGiB,
    maxMemoryGiB,
    minDiskGiB,
    maxDiskGiB,
    lastEventAfter,
    lastEventBefore,
    sort,
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **page** | [**number**] | Page number of the results | (optional) defaults to 1|
| **limit** | [**number**] | Number of results per page | (optional) defaults to 100|
| **id** | [**string**] | Filter by partial ID match | (optional) defaults to undefined|
| **name** | [**string**] | Filter by partial name match | (optional) defaults to undefined|
| **labels** | [**string**] | JSON encoded labels to filter by | (optional) defaults to undefined|
| **includeErroredDeleted** | [**boolean**] | Include results with errored state and deleted desired state | (optional) defaults to false|
| **states** | **Array<&#39;creating&#39; &#124; &#39;restoring&#39; &#124; &#39;destroying&#39; &#124; &#39;started&#39; &#124; &#39;stopped&#39; &#124; &#39;starting&#39; &#124; &#39;stopping&#39; &#124; &#39;error&#39; &#124; &#39;build_failed&#39; &#124; &#39;pending_build&#39; &#124; &#39;building_snapshot&#39; &#124; &#39;unknown&#39; &#124; &#39;pulling_snapshot&#39; &#124; &#39;archived&#39; &#124; &#39;archiving&#39;>** | List of states to filter by | (optional) defaults to undefined|
| **snapshots** | **Array&lt;string&gt;** | List of snapshot names to filter by | (optional) defaults to undefined|
| **regions** | **Array&lt;string&gt;** | List of regions to filter by | (optional) defaults to undefined|
| **minCpu** | [**number**] | Minimum CPU | (optional) defaults to undefined|
| **maxCpu** | [**number**] | Maximum CPU | (optional) defaults to undefined|
| **minMemoryGiB** | [**number**] | Minimum memory in GiB | (optional) defaults to undefined|
| **maxMemoryGiB** | [**number**] | Maximum memory in GiB | (optional) defaults to undefined|
| **minDiskGiB** | [**number**] | Minimum disk space in GiB | (optional) defaults to undefined|
| **maxDiskGiB** | [**number**] | Maximum disk space in GiB | (optional) defaults to undefined|
| **lastEventAfter** | [**Date**] | Include items with last event after this timestamp | (optional) defaults to undefined|
| **lastEventBefore** | [**Date**] | Include items with last event before this timestamp | (optional) defaults to undefined|
| **sort** | [**&#39;id&#39; | &#39;name&#39; | &#39;state&#39; | &#39;snapshot&#39; | &#39;region&#39; | &#39;updatedAt&#39; | &#39;createdAt&#39;**]**Array<&#39;id&#39; &#124; &#39;name&#39; &#124; &#39;state&#39; &#124; &#39;snapshot&#39; &#124; &#39;region&#39; &#124; &#39;updatedAt&#39; &#124; &#39;createdAt&#39;>** | Field to sort by | (optional) defaults to 'createdAt'|
| **order** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** | Direction to sort by | (optional) defaults to 'desc'|

### Return type

**PaginatedSandboxes**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Paginated list of all sandboxes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **replaceLabels**
>
> SandboxLabels replaceLabels(sandboxLabels)

### Example

```typescript
import {
    SandboxApi,
    Configuration,
    SandboxLabels
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let sandboxLabels: SandboxLabels; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.replaceLabels(
    sandboxIdOrName,
    sandboxLabels,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxLabels** | **SandboxLabels**|  | |
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**SandboxLabels**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Labels have been successfully replaced |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revokeSshAccess**
>
> Sandbox revokeSshAccess()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let token: string; //SSH access token to revoke. If not provided, all SSH access for the sandbox will be revoked. (optional) (default to undefined)

const { status, data } = await apiInstance.revokeSshAccess(
    sandboxIdOrName,
    xDaytonaOrganizationID,
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **token** | [**string**] | SSH access token to revoke. If not provided, all SSH access for the sandbox will be revoked. | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | SSH access has been revoked |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **setAutoArchiveInterval**
>
> Sandbox setAutoArchiveInterval()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let interval: number; //Auto-archive interval in minutes (0 means the maximum interval will be used) (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.setAutoArchiveInterval(
    sandboxIdOrName,
    interval,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **interval** | [**number**] | Auto-archive interval in minutes (0 means the maximum interval will be used) | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Auto-archive interval has been set |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **setAutoDeleteInterval**
>
> Sandbox setAutoDeleteInterval()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let interval: number; //Auto-delete interval in minutes (negative value means disabled, 0 means delete immediately upon stopping) (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.setAutoDeleteInterval(
    sandboxIdOrName,
    interval,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **interval** | [**number**] | Auto-delete interval in minutes (negative value means disabled, 0 means delete immediately upon stopping) | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Auto-delete interval has been set |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **setAutostopInterval**
>
> Sandbox setAutostopInterval()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let interval: number; //Auto-stop interval in minutes (0 to disable) (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.setAutostopInterval(
    sandboxIdOrName,
    interval,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **interval** | [**number**] | Auto-stop interval in minutes (0 to disable) | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Auto-stop interval has been set |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **startSandbox**
>
> Sandbox startSandbox()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.startSandbox(
    sandboxIdOrName,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sandbox has been started or is being restored from archived state |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **stopSandbox**
>
> Sandbox stopSandbox()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.stopSandbox(
    sandboxIdOrName,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sandbox has been stopped |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updatePublicStatus**
>
> Sandbox updatePublicStatus()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxIdOrName: string; //ID or name of the sandbox (default to undefined)
let isPublic: boolean; //Public status to set (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.updatePublicStatus(
    sandboxIdOrName,
    isPublic,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxIdOrName** | [**string**] | ID or name of the sandbox | defaults to undefined|
| **isPublic** | [**boolean**] | Public status to set | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Sandbox**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Public status has been successfully updated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateSandboxState**
>
> updateSandboxState(updateSandboxStateDto)

### Example

```typescript
import {
    SandboxApi,
    Configuration,
    UpdateSandboxStateDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let sandboxId: string; //ID of the sandbox (default to undefined)
let updateSandboxStateDto: UpdateSandboxStateDto; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.updateSandboxState(
    sandboxId,
    updateSandboxStateDto,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSandboxStateDto** | **UpdateSandboxStateDto**|  | |
| **sandboxId** | [**string**] | ID of the sandbox | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

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
|**200** | Sandbox state has been successfully updated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **validateSshAccess**
>
> SshAccessValidationDto validateSshAccess()

### Example

```typescript
import {
    SandboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SandboxApi(configuration);

let token: string; //SSH access token to validate (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.validateSshAccess(
    token,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] | SSH access token to validate | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**SshAccessValidationDto**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | SSH access validation result |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
