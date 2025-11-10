# ToolboxApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**clickMouseDeprecated**](#clickmousedeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/click | [DEPRECATED] Click mouse|
|[**createFolderDeprecated**](#createfolderdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/files/folder | [DEPRECATED] Create folder|
|[**createPTYSessionDeprecated**](#createptysessiondeprecated) | **POST** /toolbox/{sandboxId}/toolbox/process/pty | [DEPRECATED] Create PTY session|
|[**createSessionDeprecated**](#createsessiondeprecated) | **POST** /toolbox/{sandboxId}/toolbox/process/session | [DEPRECATED] Create session|
|[**deleteFileDeprecated**](#deletefiledeprecated) | **DELETE** /toolbox/{sandboxId}/toolbox/files | [DEPRECATED] Delete file|
|[**deletePTYSessionDeprecated**](#deleteptysessiondeprecated) | **DELETE** /toolbox/{sandboxId}/toolbox/process/pty/{sessionId} | [DEPRECATED] Delete PTY session|
|[**deleteSessionDeprecated**](#deletesessiondeprecated) | **DELETE** /toolbox/{sandboxId}/toolbox/process/session/{sessionId} | [DEPRECATED] Delete session|
|[**downloadFileDeprecated**](#downloadfiledeprecated) | **GET** /toolbox/{sandboxId}/toolbox/files/download | [DEPRECATED] Download file|
|[**downloadFilesDeprecated**](#downloadfilesdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/files/bulk-download | [DEPRECATED] Download multiple files|
|[**dragMouseDeprecated**](#dragmousedeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/drag | [DEPRECATED] Drag mouse|
|[**executeCommandDeprecated**](#executecommanddeprecated) | **POST** /toolbox/{sandboxId}/toolbox/process/execute | [DEPRECATED] Execute command|
|[**executeSessionCommandDeprecated**](#executesessioncommanddeprecated) | **POST** /toolbox/{sandboxId}/toolbox/process/session/{sessionId}/exec | [DEPRECATED] Execute command in session|
|[**findInFilesDeprecated**](#findinfilesdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/files/find | [DEPRECATED] Search for text/pattern in files|
|[**getComputerUseStatusDeprecated**](#getcomputerusestatusdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/status | [DEPRECATED] Get computer use status|
|[**getDisplayInfoDeprecated**](#getdisplayinfodeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/display/info | [DEPRECATED] Get display info|
|[**getFileInfoDeprecated**](#getfileinfodeprecated) | **GET** /toolbox/{sandboxId}/toolbox/files/info | [DEPRECATED] Get file info|
|[**getMousePositionDeprecated**](#getmousepositiondeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/mouse/position | [DEPRECATED] Get mouse position|
|[**getPTYSessionDeprecated**](#getptysessiondeprecated) | **GET** /toolbox/{sandboxId}/toolbox/process/pty/{sessionId} | [DEPRECATED] Get PTY session|
|[**getProcessErrorsDeprecated**](#getprocesserrorsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/errors | [DEPRECATED] Get process errors|
|[**getProcessLogsDeprecated**](#getprocesslogsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/logs | [DEPRECATED] Get process logs|
|[**getProcessStatusDeprecated**](#getprocessstatusdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/status | [DEPRECATED] Get process status|
|[**getProjectDirDeprecated**](#getprojectdirdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/project-dir | [DEPRECATED] Get sandbox project dir|
|[**getSessionCommandDeprecated**](#getsessioncommanddeprecated) | **GET** /toolbox/{sandboxId}/toolbox/process/session/{sessionId}/command/{commandId} | [DEPRECATED] Get session command|
|[**getSessionCommandLogsDeprecated**](#getsessioncommandlogsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/process/session/{sessionId}/command/{commandId}/logs | [DEPRECATED] Get command logs|
|[**getSessionDeprecated**](#getsessiondeprecated) | **GET** /toolbox/{sandboxId}/toolbox/process/session/{sessionId} | [DEPRECATED] Get session|
|[**getUserHomeDirDeprecated**](#getuserhomedirdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/user-home-dir | [DEPRECATED] Get sandbox user home dir|
|[**getWindowsDeprecated**](#getwindowsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/display/windows | [DEPRECATED] Get windows|
|[**getWorkDirDeprecated**](#getworkdirdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/work-dir | [DEPRECATED] Get sandbox work-dir|
|[**gitAddFilesDeprecated**](#gitaddfilesdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/git/add | [DEPRECATED] Add files|
|[**gitCheckoutBranchDeprecated**](#gitcheckoutbranchdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/git/checkout | [DEPRECATED] Checkout branch|
|[**gitCloneRepositoryDeprecated**](#gitclonerepositorydeprecated) | **POST** /toolbox/{sandboxId}/toolbox/git/clone | [DEPRECATED] Clone repository|
|[**gitCommitChangesDeprecated**](#gitcommitchangesdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/git/commit | [DEPRECATED] Commit changes|
|[**gitCreateBranchDeprecated**](#gitcreatebranchdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/git/branches | [DEPRECATED] Create branch|
|[**gitDeleteBranchDeprecated**](#gitdeletebranchdeprecated) | **DELETE** /toolbox/{sandboxId}/toolbox/git/branches | [DEPRECATED] Delete branch|
|[**gitGetHistoryDeprecated**](#gitgethistorydeprecated) | **GET** /toolbox/{sandboxId}/toolbox/git/history | [DEPRECATED] Get commit history|
|[**gitGetStatusDeprecated**](#gitgetstatusdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/git/status | [DEPRECATED] Get git status|
|[**gitListBranchesDeprecated**](#gitlistbranchesdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/git/branches | [DEPRECATED] Get branch list|
|[**gitPullChangesDeprecated**](#gitpullchangesdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/git/pull | [DEPRECATED] Pull changes|
|[**gitPushChangesDeprecated**](#gitpushchangesdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/git/push | [DEPRECATED] Push changes|
|[**listFilesDeprecated**](#listfilesdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/files | [DEPRECATED] List files|
|[**listPTYSessionsDeprecated**](#listptysessionsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/process/pty | [DEPRECATED] List PTY sessions|
|[**listSessionsDeprecated**](#listsessionsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/process/session | [DEPRECATED] List sessions|
|[**lspCompletionsDeprecated**](#lspcompletionsdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/lsp/completions | [DEPRECATED] Get Lsp Completions|
|[**lspDidCloseDeprecated**](#lspdidclosedeprecated) | **POST** /toolbox/{sandboxId}/toolbox/lsp/did-close | [DEPRECATED] Call Lsp DidClose|
|[**lspDidOpenDeprecated**](#lspdidopendeprecated) | **POST** /toolbox/{sandboxId}/toolbox/lsp/did-open | [DEPRECATED] Call Lsp DidOpen|
|[**lspDocumentSymbolsDeprecated**](#lspdocumentsymbolsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/lsp/document-symbols | [DEPRECATED] Call Lsp DocumentSymbols|
|[**lspStartDeprecated**](#lspstartdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/lsp/start | [DEPRECATED] Start Lsp server|
|[**lspStopDeprecated**](#lspstopdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/lsp/stop | [DEPRECATED] Stop Lsp server|
|[**lspWorkspaceSymbolsDeprecated**](#lspworkspacesymbolsdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/lsp/workspace-symbols | [DEPRECATED] Call Lsp WorkspaceSymbols|
|[**moveFileDeprecated**](#movefiledeprecated) | **POST** /toolbox/{sandboxId}/toolbox/files/move | [DEPRECATED] Move file|
|[**moveMouseDeprecated**](#movemousedeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/move | [DEPRECATED] Move mouse|
|[**pressHotkeyDeprecated**](#presshotkeydeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/keyboard/hotkey | [DEPRECATED] Press hotkey|
|[**pressKeyDeprecated**](#presskeydeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/keyboard/key | [DEPRECATED] Press key|
|[**replaceInFilesDeprecated**](#replaceinfilesdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/files/replace | [DEPRECATED] Replace in files|
|[**resizePTYSessionDeprecated**](#resizeptysessiondeprecated) | **POST** /toolbox/{sandboxId}/toolbox/process/pty/{sessionId}/resize | [DEPRECATED] Resize PTY session|
|[**restartProcessDeprecated**](#restartprocessdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/restart | [DEPRECATED] Restart process|
|[**scrollMouseDeprecated**](#scrollmousedeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/scroll | [DEPRECATED] Scroll mouse|
|[**searchFilesDeprecated**](#searchfilesdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/files/search | [DEPRECATED] Search files|
|[**setFilePermissionsDeprecated**](#setfilepermissionsdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/files/permissions | [DEPRECATED] Set file permissions|
|[**startComputerUseDeprecated**](#startcomputerusedeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/start | [DEPRECATED] Start computer use processes|
|[**stopComputerUseDeprecated**](#stopcomputerusedeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/stop | [DEPRECATED] Stop computer use processes|
|[**takeCompressedRegionScreenshotDeprecated**](#takecompressedregionscreenshotdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot/region/compressed | [DEPRECATED] Take compressed region screenshot|
|[**takeCompressedScreenshotDeprecated**](#takecompressedscreenshotdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot/compressed | [DEPRECATED] Take compressed screenshot|
|[**takeRegionScreenshotDeprecated**](#takeregionscreenshotdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot/region | [DEPRECATED] Take region screenshot|
|[**takeScreenshotDeprecated**](#takescreenshotdeprecated) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot | [DEPRECATED] Take screenshot|
|[**typeTextDeprecated**](#typetextdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/keyboard/type | [DEPRECATED] Type text|
|[**uploadFileDeprecated**](#uploadfiledeprecated) | **POST** /toolbox/{sandboxId}/toolbox/files/upload | [DEPRECATED] Upload file|
|[**uploadFilesDeprecated**](#uploadfilesdeprecated) | **POST** /toolbox/{sandboxId}/toolbox/files/bulk-upload | [DEPRECATED] Upload multiple files|

# **clickMouseDeprecated**
>
> MouseClickResponse clickMouseDeprecated(mouseClickRequest)

Click mouse at specified coordinates

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    MouseClickRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let mouseClickRequest: MouseClickRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.clickMouseDeprecated(
    sandboxId,
    mouseClickRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mouseClickRequest** | **MouseClickRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**MouseClickResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Mouse clicked successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createFolderDeprecated**
>
> createFolderDeprecated()

Create folder inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let mode: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.createFolderDeprecated(
    sandboxId,
    path,
    mode,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **mode** | [**string**] |  | defaults to undefined|
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
|**200** | Folder created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createPTYSessionDeprecated**
>
> PtyCreateResponse createPTYSessionDeprecated(ptyCreateRequest)

Create a new PTY session in the sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    PtyCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let ptyCreateRequest: PtyCreateRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.createPTYSessionDeprecated(
    sandboxId,
    ptyCreateRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ptyCreateRequest** | **PtyCreateRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**PtyCreateResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | PTY session created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createSessionDeprecated**
>
> createSessionDeprecated(createSessionRequest)

Create a new session in the sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    CreateSessionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let createSessionRequest: CreateSessionRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.createSessionDeprecated(
    sandboxId,
    createSessionRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSessionRequest** | **CreateSessionRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteFileDeprecated**
>
> deleteFileDeprecated()

Delete file inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let recursive: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.deleteFileDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID,
    recursive
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **recursive** | [**boolean**] |  | (optional) defaults to undefined|

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
|**200** | File deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deletePTYSessionDeprecated**
>
> deletePTYSessionDeprecated()

Delete a PTY session and terminate the associated process

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.deletePTYSessionDeprecated(
    sandboxId,
    sessionId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
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
|**200** | PTY session deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteSessionDeprecated**
>
> deleteSessionDeprecated()

Delete a specific session

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.deleteSessionDeprecated(
    sandboxId,
    sessionId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
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
|**200** | Session deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadFileDeprecated**
>
> File downloadFileDeprecated()

Download file from sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.downloadFileDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**File**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | File downloaded successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadFilesDeprecated**
>
> File downloadFilesDeprecated(downloadFiles)

Streams back a multipart/form-data bundle of the requested paths

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    DownloadFiles
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let downloadFiles: DownloadFiles; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.downloadFilesDeprecated(
    sandboxId,
    downloadFiles,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **downloadFiles** | **DownloadFiles**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**File**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A multipart/form-data response with each file as a part |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **dragMouseDeprecated**
>
> MouseDragResponse dragMouseDeprecated(mouseDragRequest)

Drag mouse from start to end coordinates

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    MouseDragRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let mouseDragRequest: MouseDragRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.dragMouseDeprecated(
    sandboxId,
    mouseDragRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mouseDragRequest** | **MouseDragRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**MouseDragResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Mouse dragged successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **executeCommandDeprecated**
>
> ExecuteResponse executeCommandDeprecated(executeRequest)

Execute command synchronously inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    ExecuteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let executeRequest: ExecuteRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.executeCommandDeprecated(
    sandboxId,
    executeRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **executeRequest** | **ExecuteRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ExecuteResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Command executed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **executeSessionCommandDeprecated**
>
> SessionExecuteResponse executeSessionCommandDeprecated(sessionExecuteRequest)

Execute a command in a specific session

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    SessionExecuteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let sessionExecuteRequest: SessionExecuteRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.executeSessionCommandDeprecated(
    sandboxId,
    sessionId,
    sessionExecuteRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionExecuteRequest** | **SessionExecuteRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**SessionExecuteResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Command executed successfully |  -  |
|**202** | Command accepted and is being processed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **findInFilesDeprecated**
>
> Array<Match> findInFilesDeprecated()

Search for text/pattern inside sandbox files

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let pattern: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.findInFilesDeprecated(
    sandboxId,
    path,
    pattern,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **pattern** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<Match>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Search completed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getComputerUseStatusDeprecated**
>
> ComputerUseStatusResponse getComputerUseStatusDeprecated()

Get status of all VNC desktop processes

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getComputerUseStatusDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ComputerUseStatusResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Computer use status retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDisplayInfoDeprecated**
>
> DisplayInfoResponse getDisplayInfoDeprecated()

Get information about displays

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getDisplayInfoDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**DisplayInfoResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Display info retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getFileInfoDeprecated**
>
> FileInfo getFileInfoDeprecated()

Get file info inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getFileInfoDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**FileInfo**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | File info retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMousePositionDeprecated**
>
> MousePosition getMousePositionDeprecated()

Get current mouse cursor position

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getMousePositionDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**MousePosition**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Mouse position retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPTYSessionDeprecated**
>
> PtySessionInfo getPTYSessionDeprecated()

Get PTY session information by ID

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getPTYSessionDeprecated(
    sandboxId,
    sessionId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**PtySessionInfo**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | PTY session retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProcessErrorsDeprecated**
>
> ProcessErrorsResponse getProcessErrorsDeprecated()

Get error logs for a specific VNC process

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let processName: string; // (default to undefined)
let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getProcessErrorsDeprecated(
    processName,
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **processName** | [**string**] |  | defaults to undefined|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ProcessErrorsResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Process errors retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProcessLogsDeprecated**
>
> ProcessLogsResponse getProcessLogsDeprecated()

Get logs for a specific VNC process

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let processName: string; // (default to undefined)
let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getProcessLogsDeprecated(
    processName,
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **processName** | [**string**] |  | defaults to undefined|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ProcessLogsResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Process logs retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProcessStatusDeprecated**
>
> ProcessStatusResponse getProcessStatusDeprecated()

Get status of a specific VNC process

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let processName: string; // (default to undefined)
let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getProcessStatusDeprecated(
    processName,
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **processName** | [**string**] |  | defaults to undefined|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ProcessStatusResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Process status retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProjectDirDeprecated**
>
> ProjectDirResponse getProjectDirDeprecated()

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getProjectDirDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ProjectDirResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Project directory retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSessionCommandDeprecated**
>
> Command getSessionCommandDeprecated()

Get session command by ID

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let commandId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getSessionCommandDeprecated(
    sandboxId,
    sessionId,
    commandId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
| **commandId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Command**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Session command retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSessionCommandLogsDeprecated**
>
> string getSessionCommandLogsDeprecated()

Get logs for a specific command in a session

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let commandId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let follow: boolean; //Whether to stream the logs (optional) (default to undefined)

const { status, data } = await apiInstance.getSessionCommandLogsDeprecated(
    sandboxId,
    sessionId,
    commandId,
    xDaytonaOrganizationID,
    follow
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
| **commandId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **follow** | [**boolean**] | Whether to stream the logs | (optional) defaults to undefined|

### Return type

**string**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Command log stream marked with stdout and stderr prefixes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSessionDeprecated**
>
> Session getSessionDeprecated()

Get session by ID

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getSessionDeprecated(
    sandboxId,
    sessionId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Session**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Session retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserHomeDirDeprecated**
>
> UserHomeDirResponse getUserHomeDirDeprecated()

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getUserHomeDirDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**UserHomeDirResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User home directory retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWindowsDeprecated**
>
> WindowsResponse getWindowsDeprecated()

Get list of open windows

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getWindowsDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**WindowsResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Windows list retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWorkDirDeprecated**
>
> WorkDirResponse getWorkDirDeprecated()

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.getWorkDirDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**WorkDirResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Work-dir retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitAddFilesDeprecated**
>
> gitAddFilesDeprecated(gitAddRequest)

Add files to git commit

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitAddRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitAddRequest: GitAddRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitAddFilesDeprecated(
    sandboxId,
    gitAddRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitAddRequest** | **GitAddRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Files added to git successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitCheckoutBranchDeprecated**
>
> gitCheckoutBranchDeprecated(gitCheckoutRequest)

Checkout branch or commit in git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitCheckoutRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitCheckoutRequest: GitCheckoutRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitCheckoutBranchDeprecated(
    sandboxId,
    gitCheckoutRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitCheckoutRequest** | **GitCheckoutRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Branch checked out successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitCloneRepositoryDeprecated**
>
> gitCloneRepositoryDeprecated(gitCloneRequest)

Clone git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitCloneRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitCloneRequest: GitCloneRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitCloneRepositoryDeprecated(
    sandboxId,
    gitCloneRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitCloneRequest** | **GitCloneRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Repository cloned successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitCommitChangesDeprecated**
>
> GitCommitResponse gitCommitChangesDeprecated(gitCommitRequest)

Commit changes to git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitCommitRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitCommitRequest: GitCommitRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitCommitChangesDeprecated(
    sandboxId,
    gitCommitRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitCommitRequest** | **GitCommitRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**GitCommitResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Changes committed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitCreateBranchDeprecated**
>
> gitCreateBranchDeprecated(gitBranchRequest)

Create branch on git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitBranchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitBranchRequest: GitBranchRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitCreateBranchDeprecated(
    sandboxId,
    gitBranchRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitBranchRequest** | **GitBranchRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Branch created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitDeleteBranchDeprecated**
>
> gitDeleteBranchDeprecated(gitDeleteBranchRequest)

Delete branch on git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitDeleteBranchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitDeleteBranchRequest: GitDeleteBranchRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitDeleteBranchDeprecated(
    sandboxId,
    gitDeleteBranchRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitDeleteBranchRequest** | **GitDeleteBranchRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Branch deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitGetHistoryDeprecated**
>
> Array<GitCommitInfo> gitGetHistoryDeprecated()

Get commit history from git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitGetHistoryDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<GitCommitInfo>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Commit history retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitGetStatusDeprecated**
>
> GitStatus gitGetStatusDeprecated()

Get status from git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitGetStatusDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**GitStatus**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Git status retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitListBranchesDeprecated**
>
> ListBranchResponse gitListBranchesDeprecated()

Get branch list from git repository

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitListBranchesDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ListBranchResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Branch list retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitPullChangesDeprecated**
>
> gitPullChangesDeprecated(gitRepoRequest)

Pull changes from remote

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitRepoRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitRepoRequest: GitRepoRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitPullChangesDeprecated(
    sandboxId,
    gitRepoRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitRepoRequest** | **GitRepoRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Changes pulled successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gitPushChangesDeprecated**
>
> gitPushChangesDeprecated(gitRepoRequest)

Push changes to remote

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    GitRepoRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let gitRepoRequest: GitRepoRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.gitPushChangesDeprecated(
    sandboxId,
    gitRepoRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gitRepoRequest** | **GitRepoRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Changes pushed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listFilesDeprecated**
>
> Array<FileInfo> listFilesDeprecated()

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let path: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.listFilesDeprecated(
    sandboxId,
    xDaytonaOrganizationID,
    path
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **path** | [**string**] |  | (optional) defaults to undefined|

### Return type

**Array<FileInfo>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Files listed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listPTYSessionsDeprecated**
>
> PtyListResponse listPTYSessionsDeprecated()

List all active PTY sessions in the sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.listPTYSessionsDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**PtyListResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | PTY sessions retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listSessionsDeprecated**
>
> Array<Session> listSessionsDeprecated()

List all active sessions in the sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.listSessionsDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<Session>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Sessions retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lspCompletionsDeprecated**
>
> CompletionList lspCompletionsDeprecated(lspCompletionParams)

The Completion request is sent from the client to the server to compute completion items at a given cursor position.

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    LspCompletionParams
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let lspCompletionParams: LspCompletionParams; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.lspCompletionsDeprecated(
    sandboxId,
    lspCompletionParams,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lspCompletionParams** | **LspCompletionParams**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**CompletionList**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lspDidCloseDeprecated**
>
> lspDidCloseDeprecated(lspDocumentRequest)

The document close notification is sent from the client to the server when the document got closed in the client.

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    LspDocumentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let lspDocumentRequest: LspDocumentRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.lspDidCloseDeprecated(
    sandboxId,
    lspDocumentRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lspDocumentRequest** | **LspDocumentRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lspDidOpenDeprecated**
>
> lspDidOpenDeprecated(lspDocumentRequest)

The document open notification is sent from the client to the server to signal newly opened text documents.

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    LspDocumentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let lspDocumentRequest: LspDocumentRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.lspDidOpenDeprecated(
    sandboxId,
    lspDocumentRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lspDocumentRequest** | **LspDocumentRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lspDocumentSymbolsDeprecated**
>
> Array<LspSymbol> lspDocumentSymbolsDeprecated()

The document symbol request is sent from the client to the server.

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let languageId: string; // (default to undefined)
let pathToProject: string; // (default to undefined)
let uri: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.lspDocumentSymbolsDeprecated(
    sandboxId,
    languageId,
    pathToProject,
    uri,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **languageId** | [**string**] |  | defaults to undefined|
| **pathToProject** | [**string**] |  | defaults to undefined|
| **uri** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<LspSymbol>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lspStartDeprecated**
>
> lspStartDeprecated(lspServerRequest)

Start Lsp server process inside sandbox project

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    LspServerRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let lspServerRequest: LspServerRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.lspStartDeprecated(
    sandboxId,
    lspServerRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lspServerRequest** | **LspServerRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lspStopDeprecated**
>
> lspStopDeprecated(lspServerRequest)

Stop Lsp server process inside sandbox project

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    LspServerRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let lspServerRequest: LspServerRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.lspStopDeprecated(
    sandboxId,
    lspServerRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lspServerRequest** | **LspServerRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lspWorkspaceSymbolsDeprecated**
>
> Array<LspSymbol> lspWorkspaceSymbolsDeprecated()

The workspace symbol request is sent from the client to the server to list project-wide symbols matching the query string.

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let languageId: string; // (default to undefined)
let pathToProject: string; // (default to undefined)
let query: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.lspWorkspaceSymbolsDeprecated(
    sandboxId,
    languageId,
    pathToProject,
    query,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **languageId** | [**string**] |  | defaults to undefined|
| **pathToProject** | [**string**] |  | defaults to undefined|
| **query** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<LspSymbol>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **moveFileDeprecated**
>
> moveFileDeprecated()

Move file inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let source: string; // (default to undefined)
let destination: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.moveFileDeprecated(
    sandboxId,
    source,
    destination,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **source** | [**string**] |  | defaults to undefined|
| **destination** | [**string**] |  | defaults to undefined|
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
|**200** | File moved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **moveMouseDeprecated**
>
> MouseMoveResponse moveMouseDeprecated(mouseMoveRequest)

Move mouse cursor to specified coordinates

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    MouseMoveRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let mouseMoveRequest: MouseMoveRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.moveMouseDeprecated(
    sandboxId,
    mouseMoveRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mouseMoveRequest** | **MouseMoveRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**MouseMoveResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Mouse moved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pressHotkeyDeprecated**
>
> pressHotkeyDeprecated(keyboardHotkeyRequest)

Press a hotkey combination

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    KeyboardHotkeyRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let keyboardHotkeyRequest: KeyboardHotkeyRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.pressHotkeyDeprecated(
    sandboxId,
    keyboardHotkeyRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keyboardHotkeyRequest** | **KeyboardHotkeyRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Hotkey pressed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pressKeyDeprecated**
>
> pressKeyDeprecated(keyboardPressRequest)

Press a key with optional modifiers

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    KeyboardPressRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let keyboardPressRequest: KeyboardPressRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.pressKeyDeprecated(
    sandboxId,
    keyboardPressRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keyboardPressRequest** | **KeyboardPressRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Key pressed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **replaceInFilesDeprecated**
>
> Array<ReplaceResult> replaceInFilesDeprecated(replaceRequest)

Replace text/pattern in multiple files inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    ReplaceRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let replaceRequest: ReplaceRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.replaceInFilesDeprecated(
    sandboxId,
    replaceRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **replaceRequest** | **ReplaceRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**Array<ReplaceResult>**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Text replaced successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resizePTYSessionDeprecated**
>
> PtySessionInfo resizePTYSessionDeprecated(ptyResizeRequest)

Resize a PTY session

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    PtyResizeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let sessionId: string; // (default to undefined)
let ptyResizeRequest: PtyResizeRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.resizePTYSessionDeprecated(
    sandboxId,
    sessionId,
    ptyResizeRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ptyResizeRequest** | **PtyResizeRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **sessionId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**PtySessionInfo**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | PTY session resized successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **restartProcessDeprecated**
>
> ProcessRestartResponse restartProcessDeprecated()

Restart a specific VNC process

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let processName: string; // (default to undefined)
let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.restartProcessDeprecated(
    processName,
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **processName** | [**string**] |  | defaults to undefined|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ProcessRestartResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Process restarted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **scrollMouseDeprecated**
>
> MouseScrollResponse scrollMouseDeprecated(mouseScrollRequest)

Scroll mouse at specified coordinates

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    MouseScrollRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let mouseScrollRequest: MouseScrollRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.scrollMouseDeprecated(
    sandboxId,
    mouseScrollRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mouseScrollRequest** | **MouseScrollRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**MouseScrollResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Mouse scrolled successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchFilesDeprecated**
>
> SearchFilesResponse searchFilesDeprecated()

Search for files inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let pattern: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.searchFilesDeprecated(
    sandboxId,
    path,
    pattern,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **pattern** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**SearchFilesResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Search completed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **setFilePermissionsDeprecated**
>
> setFilePermissionsDeprecated()

Set file owner/group/permissions inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let owner: string; // (optional) (default to undefined)
let group: string; // (optional) (default to undefined)
let mode: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.setFilePermissionsDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID,
    owner,
    group,
    mode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **owner** | [**string**] |  | (optional) defaults to undefined|
| **group** | [**string**] |  | (optional) defaults to undefined|
| **mode** | [**string**] |  | (optional) defaults to undefined|

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
|**200** | File permissions updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **startComputerUseDeprecated**
>
> ComputerUseStartResponse startComputerUseDeprecated()

Start all VNC desktop processes (Xvfb, xfce4, x11vnc, novnc)

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.startComputerUseDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ComputerUseStartResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Computer use processes started successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **stopComputerUseDeprecated**
>
> ComputerUseStopResponse stopComputerUseDeprecated()

Stop all VNC desktop processes (Xvfb, xfce4, x11vnc, novnc)

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.stopComputerUseDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

**ComputerUseStopResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Computer use processes stopped successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **takeCompressedRegionScreenshotDeprecated**
>
> CompressedScreenshotResponse takeCompressedRegionScreenshotDeprecated()

Take a compressed screenshot of a specific region

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let height: number; // (default to undefined)
let width: number; // (default to undefined)
let y: number; // (default to undefined)
let x: number; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let scale: number; // (optional) (default to undefined)
let quality: number; // (optional) (default to undefined)
let format: string; // (optional) (default to undefined)
let showCursor: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.takeCompressedRegionScreenshotDeprecated(
    sandboxId,
    height,
    width,
    y,
    x,
    xDaytonaOrganizationID,
    scale,
    quality,
    format,
    showCursor
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **height** | [**number**] |  | defaults to undefined|
| **width** | [**number**] |  | defaults to undefined|
| **y** | [**number**] |  | defaults to undefined|
| **x** | [**number**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **scale** | [**number**] |  | (optional) defaults to undefined|
| **quality** | [**number**] |  | (optional) defaults to undefined|
| **format** | [**string**] |  | (optional) defaults to undefined|
| **showCursor** | [**boolean**] |  | (optional) defaults to undefined|

### Return type

**CompressedScreenshotResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Compressed region screenshot taken successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **takeCompressedScreenshotDeprecated**
>
> CompressedScreenshotResponse takeCompressedScreenshotDeprecated()

Take a compressed screenshot with format, quality, and scale options

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let scale: number; // (optional) (default to undefined)
let quality: number; // (optional) (default to undefined)
let format: string; // (optional) (default to undefined)
let showCursor: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.takeCompressedScreenshotDeprecated(
    sandboxId,
    xDaytonaOrganizationID,
    scale,
    quality,
    format,
    showCursor
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **scale** | [**number**] |  | (optional) defaults to undefined|
| **quality** | [**number**] |  | (optional) defaults to undefined|
| **format** | [**string**] |  | (optional) defaults to undefined|
| **showCursor** | [**boolean**] |  | (optional) defaults to undefined|

### Return type

**CompressedScreenshotResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Compressed screenshot taken successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **takeRegionScreenshotDeprecated**
>
> RegionScreenshotResponse takeRegionScreenshotDeprecated()

Take a screenshot of a specific region

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let height: number; // (default to undefined)
let width: number; // (default to undefined)
let y: number; // (default to undefined)
let x: number; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let showCursor: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.takeRegionScreenshotDeprecated(
    sandboxId,
    height,
    width,
    y,
    x,
    xDaytonaOrganizationID,
    showCursor
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **height** | [**number**] |  | defaults to undefined|
| **width** | [**number**] |  | defaults to undefined|
| **y** | [**number**] |  | defaults to undefined|
| **x** | [**number**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **showCursor** | [**boolean**] |  | (optional) defaults to undefined|

### Return type

**RegionScreenshotResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Region screenshot taken successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **takeScreenshotDeprecated**
>
> ScreenshotResponse takeScreenshotDeprecated()

Take a screenshot of the entire screen

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let showCursor: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.takeScreenshotDeprecated(
    sandboxId,
    xDaytonaOrganizationID,
    showCursor
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **showCursor** | [**boolean**] |  | (optional) defaults to undefined|

### Return type

**ScreenshotResponse**

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Screenshot taken successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **typeTextDeprecated**
>
> typeTextDeprecated(keyboardTypeRequest)

Type text using keyboard

### Example

```typescript
import {
    ToolboxApi,
    Configuration,
    KeyboardTypeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let keyboardTypeRequest: KeyboardTypeRequest; //
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.typeTextDeprecated(
    sandboxId,
    keyboardTypeRequest,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keyboardTypeRequest** | **KeyboardTypeRequest**|  | |
| **sandboxId** | [**string**] |  | defaults to undefined|
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
|**200** | Text typed successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadFileDeprecated**
>
> uploadFileDeprecated()

Upload file inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let path: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)
let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.uploadFileDeprecated(
    sandboxId,
    path,
    xDaytonaOrganizationID,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **path** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|
| **file** | [**File**] |  | (optional) defaults to undefined|

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | File uploaded successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadFilesDeprecated**
>
> uploadFilesDeprecated()

Upload multiple files inside sandbox

### Example

```typescript
import {
    ToolboxApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ToolboxApi(configuration);

let sandboxId: string; // (default to undefined)
let xDaytonaOrganizationID: string; //Use with JWT to specify the organization ID (optional) (default to undefined)

const { status, data } = await apiInstance.uploadFilesDeprecated(
    sandboxId,
    xDaytonaOrganizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sandboxId** | [**string**] |  | defaults to undefined|
| **xDaytonaOrganizationID** | [**string**] | Use with JWT to specify the organization ID | (optional) defaults to undefined|

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer), [oauth2](../README.md#oauth2)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Files uploaded successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
