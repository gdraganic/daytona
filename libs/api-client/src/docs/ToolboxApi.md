# ToolboxApi

All URIs are relative to _http://localhost:3000_

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**clickMouse**](#clickmouse) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/click | Click mouse|
|[**createFolder**](#createfolder) | **POST** /toolbox/{sandboxId}/toolbox/files/folder | Create folder|
|[**createPTYSession**](#createptysession) | **POST** /toolbox/{sandboxId}/toolbox/process/pty | Create PTY session|
|[**createSession**](#createsession) | **POST** /toolbox/{sandboxId}/toolbox/process/session | Create session|
|[**deleteFile**](#deletefile) | **DELETE** /toolbox/{sandboxId}/toolbox/files | Delete file|
|[**deletePTYSession**](#deleteptysession) | **DELETE** /toolbox/{sandboxId}/toolbox/process/pty/{sessionId} | Delete PTY session|
|[**deleteSession**](#deletesession) | **DELETE** /toolbox/{sandboxId}/toolbox/process/session/{sessionId} | Delete session|
|[**downloadFile**](#downloadfile) | **GET** /toolbox/{sandboxId}/toolbox/files/download | Download file|
|[**downloadFiles**](#downloadfiles) | **POST** /toolbox/{sandboxId}/toolbox/files/bulk-download | Download multiple files|
|[**dragMouse**](#dragmouse) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/drag | Drag mouse|
|[**executeCommand**](#executecommand) | **POST** /toolbox/{sandboxId}/toolbox/process/execute | Execute command|
|[**executeSessionCommand**](#executesessioncommand) | **POST** /toolbox/{sandboxId}/toolbox/process/session/{sessionId}/exec | Execute command in session|
|[**findInFiles**](#findinfiles) | **GET** /toolbox/{sandboxId}/toolbox/files/find | Search for text/pattern in files|
|[**getComputerUseStatus**](#getcomputerusestatus) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/status | Get computer use status|
|[**getDisplayInfo**](#getdisplayinfo) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/display/info | Get display info|
|[**getFileInfo**](#getfileinfo) | **GET** /toolbox/{sandboxId}/toolbox/files/info | Get file info|
|[**getMousePosition**](#getmouseposition) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/mouse/position | Get mouse position|
|[**getPTYSession**](#getptysession) | **GET** /toolbox/{sandboxId}/toolbox/process/pty/{sessionId} | Get PTY session|
|[**getProcessErrors**](#getprocesserrors) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/errors | Get process errors|
|[**getProcessLogs**](#getprocesslogs) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/logs | Get process logs|
|[**getProcessStatus**](#getprocessstatus) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/status | Get process status|
|[**getProjectDir**](#getprojectdir) | **GET** /toolbox/{sandboxId}/toolbox/project-dir | Get sandbox project dir|
|[**getSession**](#getsession) | **GET** /toolbox/{sandboxId}/toolbox/process/session/{sessionId} | Get session|
|[**getSessionCommand**](#getsessioncommand) | **GET** /toolbox/{sandboxId}/toolbox/process/session/{sessionId}/command/{commandId} | Get session command|
|[**getSessionCommandLogs**](#getsessioncommandlogs) | **GET** /toolbox/{sandboxId}/toolbox/process/session/{sessionId}/command/{commandId}/logs | Get command logs|
|[**getUserHomeDir**](#getuserhomedir) | **GET** /toolbox/{sandboxId}/toolbox/user-home-dir | Get sandbox user home dir|
|[**getWindows**](#getwindows) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/display/windows | Get windows|
|[**getWorkDir**](#getworkdir) | **GET** /toolbox/{sandboxId}/toolbox/work-dir | Get sandbox work-dir|
|[**gitAddFiles**](#gitaddfiles) | **POST** /toolbox/{sandboxId}/toolbox/git/add | Add files|
|[**gitCheckoutBranch**](#gitcheckoutbranch) | **POST** /toolbox/{sandboxId}/toolbox/git/checkout | Checkout branch|
|[**gitCloneRepository**](#gitclonerepository) | **POST** /toolbox/{sandboxId}/toolbox/git/clone | Clone repository|
|[**gitCommitChanges**](#gitcommitchanges) | **POST** /toolbox/{sandboxId}/toolbox/git/commit | Commit changes|
|[**gitCreateBranch**](#gitcreatebranch) | **POST** /toolbox/{sandboxId}/toolbox/git/branches | Create branch|
|[**gitDeleteBranch**](#gitdeletebranch) | **DELETE** /toolbox/{sandboxId}/toolbox/git/branches | Delete branch|
|[**gitGetHistory**](#gitgethistory) | **GET** /toolbox/{sandboxId}/toolbox/git/history | Get commit history|
|[**gitGetStatus**](#gitgetstatus) | **GET** /toolbox/{sandboxId}/toolbox/git/status | Get git status|
|[**gitListBranches**](#gitlistbranches) | **GET** /toolbox/{sandboxId}/toolbox/git/branches | Get branch list|
|[**gitPullChanges**](#gitpullchanges) | **POST** /toolbox/{sandboxId}/toolbox/git/pull | Pull changes|
|[**gitPushChanges**](#gitpushchanges) | **POST** /toolbox/{sandboxId}/toolbox/git/push | Push changes|
|[**listFiles**](#listfiles) | **GET** /toolbox/{sandboxId}/toolbox/files | List files|
|[**listPTYSessions**](#listptysessions) | **GET** /toolbox/{sandboxId}/toolbox/process/pty | List PTY sessions|
|[**listSessions**](#listsessions) | **GET** /toolbox/{sandboxId}/toolbox/process/session | List sessions|
|[**lspCompletions**](#lspcompletions) | **POST** /toolbox/{sandboxId}/toolbox/lsp/completions | Get Lsp Completions|
|[**lspDidClose**](#lspdidclose) | **POST** /toolbox/{sandboxId}/toolbox/lsp/did-close | Call Lsp DidClose|
|[**lspDidOpen**](#lspdidopen) | **POST** /toolbox/{sandboxId}/toolbox/lsp/did-open | Call Lsp DidOpen|
|[**lspDocumentSymbols**](#lspdocumentsymbols) | **GET** /toolbox/{sandboxId}/toolbox/lsp/document-symbols | Call Lsp DocumentSymbols|
|[**lspStart**](#lspstart) | **POST** /toolbox/{sandboxId}/toolbox/lsp/start | Start Lsp server|
|[**lspStop**](#lspstop) | **POST** /toolbox/{sandboxId}/toolbox/lsp/stop | Stop Lsp server|
|[**lspWorkspaceSymbols**](#lspworkspacesymbols) | **GET** /toolbox/{sandboxId}/toolbox/lsp/workspace-symbols | Call Lsp WorkspaceSymbols|
|[**moveFile**](#movefile) | **POST** /toolbox/{sandboxId}/toolbox/files/move | Move file|
|[**moveMouse**](#movemouse) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/move | Move mouse|
|[**pressHotkey**](#presshotkey) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/keyboard/hotkey | Press hotkey|
|[**pressKey**](#presskey) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/keyboard/key | Press key|
|[**replaceInFiles**](#replaceinfiles) | **POST** /toolbox/{sandboxId}/toolbox/files/replace | Replace in files|
|[**resizePTYSession**](#resizeptysession) | **POST** /toolbox/{sandboxId}/toolbox/process/pty/{sessionId}/resize | Resize PTY session|
|[**restartProcess**](#restartprocess) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/process/{processName}/restart | Restart process|
|[**scrollMouse**](#scrollmouse) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/mouse/scroll | Scroll mouse|
|[**searchFiles**](#searchfiles) | **GET** /toolbox/{sandboxId}/toolbox/files/search | Search files|
|[**setFilePermissions**](#setfilepermissions) | **POST** /toolbox/{sandboxId}/toolbox/files/permissions | Set file permissions|
|[**startComputerUse**](#startcomputeruse) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/start | Start computer use processes|
|[**stopComputerUse**](#stopcomputeruse) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/stop | Stop computer use processes|
|[**takeCompressedRegionScreenshot**](#takecompressedregionscreenshot) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot/region/compressed | Take compressed region screenshot|
|[**takeCompressedScreenshot**](#takecompressedscreenshot) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot/compressed | Take compressed screenshot|
|[**takeRegionScreenshot**](#takeregionscreenshot) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot/region | Take region screenshot|
|[**takeScreenshot**](#takescreenshot) | **GET** /toolbox/{sandboxId}/toolbox/computeruse/screenshot | Take screenshot|
|[**typeText**](#typetext) | **POST** /toolbox/{sandboxId}/toolbox/computeruse/keyboard/type | Type text|
|[**uploadFile**](#uploadfile) | **POST** /toolbox/{sandboxId}/toolbox/files/upload | Upload file|
|[**uploadFiles**](#uploadfiles) | **POST** /toolbox/{sandboxId}/toolbox/files/bulk-upload | Upload multiple files|

# **clickMouse**
>
> MouseClickResponse clickMouse(mouseClickRequest)

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

const { status, data } = await apiInstance.clickMouse(
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

# **createFolder**
>
> createFolder()

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

const { status, data } = await apiInstance.createFolder(
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

# **createPTYSession**
>
> PtyCreateResponse createPTYSession(ptyCreateRequest)

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

const { status, data } = await apiInstance.createPTYSession(
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

# **createSession**
>
> createSession(createSessionRequest)

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

const { status, data } = await apiInstance.createSession(
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

# **deleteFile**
>
> deleteFile()

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

const { status, data } = await apiInstance.deleteFile(
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

# **deletePTYSession**
>
> deletePTYSession()

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

const { status, data } = await apiInstance.deletePTYSession(
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

# **deleteSession**
>
> deleteSession()

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

const { status, data } = await apiInstance.deleteSession(
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

# **downloadFile**
>
> File downloadFile()

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

const { status, data } = await apiInstance.downloadFile(
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

# **downloadFiles**
>
> File downloadFiles(downloadFiles)

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

const { status, data } = await apiInstance.downloadFiles(
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

# **dragMouse**
>
> MouseDragResponse dragMouse(mouseDragRequest)

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

const { status, data } = await apiInstance.dragMouse(
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

# **executeCommand**
>
> ExecuteResponse executeCommand(executeRequest)

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

const { status, data } = await apiInstance.executeCommand(
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

# **executeSessionCommand**
>
> SessionExecuteResponse executeSessionCommand(sessionExecuteRequest)

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

const { status, data } = await apiInstance.executeSessionCommand(
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

# **findInFiles**
>
> Array<Match> findInFiles()

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

const { status, data } = await apiInstance.findInFiles(
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

# **getComputerUseStatus**
>
> ComputerUseStatusResponse getComputerUseStatus()

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

const { status, data } = await apiInstance.getComputerUseStatus(
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

# **getDisplayInfo**
>
> DisplayInfoResponse getDisplayInfo()

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

const { status, data } = await apiInstance.getDisplayInfo(
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

# **getFileInfo**
>
> FileInfo getFileInfo()

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

const { status, data } = await apiInstance.getFileInfo(
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

# **getMousePosition**
>
> MousePosition getMousePosition()

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

const { status, data } = await apiInstance.getMousePosition(
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

# **getPTYSession**
>
> PtySessionInfo getPTYSession()

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

const { status, data } = await apiInstance.getPTYSession(
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

# **getProcessErrors**
>
> ProcessErrorsResponse getProcessErrors()

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

const { status, data } = await apiInstance.getProcessErrors(
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

# **getProcessLogs**
>
> ProcessLogsResponse getProcessLogs()

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

const { status, data } = await apiInstance.getProcessLogs(
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

# **getProcessStatus**
>
> ProcessStatusResponse getProcessStatus()

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

const { status, data } = await apiInstance.getProcessStatus(
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

# **getProjectDir**
>
> ProjectDirResponse getProjectDir()

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

const { status, data } = await apiInstance.getProjectDir(
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

# **getSession**
>
> Session getSession()

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

const { status, data } = await apiInstance.getSession(
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

# **getSessionCommand**
>
> Command getSessionCommand()

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

const { status, data } = await apiInstance.getSessionCommand(
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

# **getSessionCommandLogs**
>
> string getSessionCommandLogs()

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

const { status, data } = await apiInstance.getSessionCommandLogs(
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

# **getUserHomeDir**
>
> UserHomeDirResponse getUserHomeDir()

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

const { status, data } = await apiInstance.getUserHomeDir(
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

# **getWindows**
>
> WindowsResponse getWindows()

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

const { status, data } = await apiInstance.getWindows(
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

# **getWorkDir**
>
> WorkDirResponse getWorkDir()

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

const { status, data } = await apiInstance.getWorkDir(
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

# **gitAddFiles**
>
> gitAddFiles(gitAddRequest)

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

const { status, data } = await apiInstance.gitAddFiles(
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

# **gitCheckoutBranch**
>
> gitCheckoutBranch(gitCheckoutRequest)

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

const { status, data } = await apiInstance.gitCheckoutBranch(
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

# **gitCloneRepository**
>
> gitCloneRepository(gitCloneRequest)

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

const { status, data } = await apiInstance.gitCloneRepository(
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

# **gitCommitChanges**
>
> GitCommitResponse gitCommitChanges(gitCommitRequest)

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

const { status, data } = await apiInstance.gitCommitChanges(
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

# **gitCreateBranch**
>
> gitCreateBranch(gitBranchRequest)

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

const { status, data } = await apiInstance.gitCreateBranch(
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

# **gitDeleteBranch**
>
> gitDeleteBranch(gitDeleteBranchRequest)

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

const { status, data } = await apiInstance.gitDeleteBranch(
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

# **gitGetHistory**
>
> Array<GitCommitInfo> gitGetHistory()

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

const { status, data } = await apiInstance.gitGetHistory(
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

# **gitGetStatus**
>
> GitStatus gitGetStatus()

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

const { status, data } = await apiInstance.gitGetStatus(
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

# **gitListBranches**
>
> ListBranchResponse gitListBranches()

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

const { status, data } = await apiInstance.gitListBranches(
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

# **gitPullChanges**
>
> gitPullChanges(gitRepoRequest)

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

const { status, data } = await apiInstance.gitPullChanges(
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

# **gitPushChanges**
>
> gitPushChanges(gitRepoRequest)

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

const { status, data } = await apiInstance.gitPushChanges(
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

# **listFiles**
>
> Array<FileInfo> listFiles()

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

const { status, data } = await apiInstance.listFiles(
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

# **listPTYSessions**
>
> PtyListResponse listPTYSessions()

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

const { status, data } = await apiInstance.listPTYSessions(
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

# **listSessions**
>
> Array<Session> listSessions()

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

const { status, data } = await apiInstance.listSessions(
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

# **lspCompletions**
>
> CompletionList lspCompletions(lspCompletionParams)

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

const { status, data } = await apiInstance.lspCompletions(
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

# **lspDidClose**
>
> lspDidClose(lspDocumentRequest)

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

const { status, data } = await apiInstance.lspDidClose(
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

# **lspDidOpen**
>
> lspDidOpen(lspDocumentRequest)

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

const { status, data } = await apiInstance.lspDidOpen(
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

# **lspDocumentSymbols**
>
> Array<LspSymbol> lspDocumentSymbols()

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

const { status, data } = await apiInstance.lspDocumentSymbols(
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

# **lspStart**
>
> lspStart(lspServerRequest)

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

const { status, data } = await apiInstance.lspStart(
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

# **lspStop**
>
> lspStop(lspServerRequest)

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

const { status, data } = await apiInstance.lspStop(
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

# **lspWorkspaceSymbols**
>
> Array<LspSymbol> lspWorkspaceSymbols()

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

const { status, data } = await apiInstance.lspWorkspaceSymbols(
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

# **moveFile**
>
> moveFile()

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

const { status, data } = await apiInstance.moveFile(
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

# **moveMouse**
>
> MouseMoveResponse moveMouse(mouseMoveRequest)

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

const { status, data } = await apiInstance.moveMouse(
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

# **pressHotkey**
>
> pressHotkey(keyboardHotkeyRequest)

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

const { status, data } = await apiInstance.pressHotkey(
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

# **pressKey**
>
> pressKey(keyboardPressRequest)

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

const { status, data } = await apiInstance.pressKey(
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

# **replaceInFiles**
>
> Array<ReplaceResult> replaceInFiles(replaceRequest)

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

const { status, data } = await apiInstance.replaceInFiles(
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

# **resizePTYSession**
>
> PtySessionInfo resizePTYSession(ptyResizeRequest)

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

const { status, data } = await apiInstance.resizePTYSession(
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

# **restartProcess**
>
> ProcessRestartResponse restartProcess()

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

const { status, data } = await apiInstance.restartProcess(
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

# **scrollMouse**
>
> MouseScrollResponse scrollMouse(mouseScrollRequest)

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

const { status, data } = await apiInstance.scrollMouse(
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

# **searchFiles**
>
> SearchFilesResponse searchFiles()

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

const { status, data } = await apiInstance.searchFiles(
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

# **setFilePermissions**
>
> setFilePermissions()

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

const { status, data } = await apiInstance.setFilePermissions(
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

# **startComputerUse**
>
> ComputerUseStartResponse startComputerUse()

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

const { status, data } = await apiInstance.startComputerUse(
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

# **stopComputerUse**
>
> ComputerUseStopResponse stopComputerUse()

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

const { status, data } = await apiInstance.stopComputerUse(
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

# **takeCompressedRegionScreenshot**
>
> CompressedScreenshotResponse takeCompressedRegionScreenshot()

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

const { status, data } = await apiInstance.takeCompressedRegionScreenshot(
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

# **takeCompressedScreenshot**
>
> CompressedScreenshotResponse takeCompressedScreenshot()

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

const { status, data } = await apiInstance.takeCompressedScreenshot(
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

# **takeRegionScreenshot**
>
> RegionScreenshotResponse takeRegionScreenshot()

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

const { status, data } = await apiInstance.takeRegionScreenshot(
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

# **takeScreenshot**
>
> ScreenshotResponse takeScreenshot()

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

const { status, data } = await apiInstance.takeScreenshot(
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

# **typeText**
>
> typeText(keyboardTypeRequest)

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

const { status, data } = await apiInstance.typeText(
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

# **uploadFile**
>
> uploadFile()

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

const { status, data } = await apiInstance.uploadFile(
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

# **uploadFiles**
>
> uploadFiles()

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

const { status, data } = await apiInstance.uploadFiles(
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
