# DaytonaConfiguration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**version** | **string** | Daytona version | [default to undefined]
**posthog** | [**PosthogConfig**](PosthogConfig.md) | PostHog configuration | [optional] [default to undefined]
**oidc** | [**OidcConfig**](OidcConfig.md) | OIDC configuration | [default to undefined]
**linkedAccountsEnabled** | **boolean** | Whether linked accounts are enabled | [default to undefined]
**announcements** | [**{ [key: string]: Announcement; }**](Announcement.md) | System announcements | [default to undefined]
**pylonAppId** | **string** | Pylon application ID | [optional] [default to undefined]
**proxyTemplateUrl** | **string** | Proxy template URL | [default to undefined]
**proxyToolboxUrl** | **string** | Toolbox template URL | [default to undefined]
**defaultSnapshot** | **string** | Default snapshot for sandboxes | [default to undefined]
**dashboardUrl** | **string** | Dashboard URL | [default to undefined]
**maxAutoArchiveInterval** | **number** | Maximum auto-archive interval in minutes | [default to undefined]
**maintananceMode** | **boolean** | Whether maintenance mode is enabled | [default to undefined]
**environment** | **string** | Current environment | [default to undefined]
**billingApiUrl** | **string** | Billing API URL | [optional] [default to undefined]
**sshGatewayCommand** | **string** | SSH Gateway command | [optional] [default to undefined]
**sshGatewayPublicKey** | **string** | Base64 encoded SSH Gateway public key | [optional] [default to undefined]

## Example

```typescript
import { DaytonaConfiguration } from './api';

const instance: DaytonaConfiguration = {
    version,
    posthog,
    oidc,
    linkedAccountsEnabled,
    announcements,
    pylonAppId,
    proxyTemplateUrl,
    proxyToolboxUrl,
    defaultSnapshot,
    dashboardUrl,
    maxAutoArchiveInterval,
    maintananceMode,
    environment,
    billingApiUrl,
    sshGatewayCommand,
    sshGatewayPublicKey,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
