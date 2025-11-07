/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Configuration, AdapterFactory, ClientMetadata } from 'oidc-provider'
import * as ejs from 'ejs'
import * as path from 'path'

const templatesPath = path.join(__dirname, 'assets/templates')

export const createOidcProviderConfig = (
  issuer: string,
  adapter: AdapterFactory,
  jwks: { keys: any[] },
  clients: ClientMetadata[],
): Configuration => {
  return {
    adapter,
    jwks,
    clients,
    cookies: {
      keys: [process.env.OIDC_PROVIDER_COOKIE_SECRET || 'some-secret-cookie-key-that-should-be-changed'],
    },
    features: {
      devInteractions: { enabled: false },
      revocation: { enabled: true },
      resourceIndicators: {
        enabled: true,
        defaultResource: () => {
          // Default to API resource if no resource is specified
          return 'urn:daytona:api'
        },
        getResourceServerInfo: (_ctx, resourceIndicator, _client) => {
          // Define your resource servers (APIs) here
          const resourceServers: Record<
            string,
            {
              audience: string
              scope: string
              accessTokenTTL: number
              accessTokenFormat: 'jwt'
            }
          > = {
            // API server resource
            'urn:daytona:api': {
              audience: 'daytona-api',
              scope: 'api:read api:write sandbox:manage',
              accessTokenTTL: 5 * 60, // 5 minutes
              accessTokenFormat: 'jwt',
            },
            // Add more resource servers as needed
            // Example: Runner service
            // 'urn:daytona:runner': {
            //   audience: 'daytona-runner',
            //   scope: 'runner:execute',
            //   accessTokenTTL: 30 * 60, // 30 minutes
            //   accessTokenFormat: 'jwt',
            // },
          }

          const resourceServer = resourceServers[resourceIndicator]
          if (!resourceServer) {
            // Invalid or unknown resource - reject the request
            throw new Error(`Invalid resource indicator: ${resourceIndicator}`)
          }

          return resourceServer
        },
        useGrantedResource: () => {
          // Allow refresh tokens to reuse previously granted resources
          return true
        },
      },
      rpInitiatedLogout: {
        enabled: true,
        logoutSource: async (ctx, form) => {
          const logoutContent = await ejs.renderFile(path.join(templatesPath, 'oidc-logout.template.ejs'), {
            form,
          })

          ctx.body = await ejs.renderFile(path.join(templatesPath, 'oidc-layout.template.ejs'), {
            title: 'Sign Out',
            content: logoutContent,
          })
        },
        postLogoutSuccessSource: async (ctx) => {
          const redirectUrl = process.env.DASHBOARD_URL || 'http://localhost:3000'
          const successContent = await ejs.renderFile(path.join(templatesPath, 'oidc-logout-success.template.ejs'), {
            redirectUrl,
          })

          ctx.body = await ejs.renderFile(path.join(templatesPath, 'oidc-layout.template.ejs'), {
            title: 'Signed Out',
            content: successContent,
          })
        },
      },
    },
    findAccount: async (ctx, id) => {
      return {
        accountId: id,
        async claims() {
          return { sub: id }
        },
      }
    },
    interactions: {
      url(ctx, interaction) {
        return `/api/oidc/interaction/${interaction.uid}`
      },
    },
    claims: {
      openid: ['sub'],
      email: ['email', 'email_verified'],
      profile: ['name', 'preferred_username', 'picture'],
    },
    conformIdTokenClaims: false, // Include claims in access token based on scope
    loadExistingGrant: async (ctx) => {
      // Public clients (token_endpoint_auth_method === 'none') are first-party and skip consent
      // Confidential clients (with client_secret) require explicit consent
      const isPublicClient = ctx.oidc.client.tokenEndpointAuthMethod === 'none'

      if (isPublicClient) {
        // For public clients (like dashboard), automatically create and save a grant to skip consent
        const grant = new ctx.oidc.provider.Grant({
          clientId: ctx.oidc.client.clientId,
          accountId: ctx.oidc.session.accountId,
        })

        // Grant all requested OIDC scopes
        if (ctx.oidc.params.scope) {
          grant.addOIDCScope(String(ctx.oidc.params.scope))
        }

        // Grant all requested resource scopes
        if (ctx.oidc.params.resource) {
          const resources = Array.isArray(ctx.oidc.params.resource)
            ? ctx.oidc.params.resource
            : [ctx.oidc.params.resource]

          for (const resource of resources) {
            grant.addResourceScope(String(resource), String(ctx.oidc.params.scope))
          }
        }

        await grant.save()
        return grant
      }

      // For confidential clients (like CLI), check for existing grants
      const grantId =
        (ctx.oidc.result && ctx.oidc.result.consent && ctx.oidc.result.consent.grantId) ||
        (ctx.oidc.session ? ctx.oidc.session.grantIdFor(ctx.oidc.client.clientId) : undefined)

      if (grantId) {
        try {
          const grant = await ctx.oidc.provider.Grant.find(grantId)
          if (grant) {
            // Check if the grant covers all requested scopes
            const requestedScopes = ctx.oidc.params.scope ? String(ctx.oidc.params.scope).split(' ') : []
            const grantedScopes = grant.getOIDCScope() ? grant.getOIDCScope().split(' ') : []
            const allScopesGranted = requestedScopes.every((scope) => grantedScopes.includes(scope))

            if (allScopesGranted) {
              return grant
            }
          }
        } catch {
          // Grant not found, will prompt for consent
        }
      }

      return undefined
    },
    ttl: {
      AccessToken: 5 * 60, // 5 minutes
      AuthorizationCode: 10 * 60, // 10 minutes
      IdToken: 1 * 60 * 60, // 1 hour
      RefreshToken: 7 * 24 * 60 * 60, // 7 days
      Session: 14 * 24 * 60 * 60, // 14 days
      Interaction: 10 * 60, // 10 minutes - time user has to complete login/consent
      Grant: 14 * 24 * 60 * 60, // 14 days - how long consent grants are valid
    },
    issueRefreshToken: async (_ctx, client, code) => {
      // Issue refresh tokens for public clients without requiring offline_access scope
      // This allows the dashboard to get refresh tokens while maintaining SSO sessions
      if (client.tokenEndpointAuthMethod === 'none') {
        // Public client (like dashboard) - always issue refresh token
        return true
      }
      // For confidential clients, use default behavior (requires offline_access or prompt=consent)
      return code.scopes.has('offline_access')
    },
    pkce: {
      required: (ctx, client) => {
        // Require PKCE for public clients (token_endpoint_auth_method === 'none')
        return client.tokenEndpointAuthMethod === 'none'
      },
    },
    renderError: async (ctx, out, _error) => {
      const errorContent = await ejs.renderFile(path.join(templatesPath, 'oidc-error.template.ejs'), {
        error: out.error,
        errorDescription: out.error_description,
        state: out.state,
        issuer: issuer,
        tryAgainUrl: null,
      })

      ctx.body = await ejs.renderFile(path.join(templatesPath, 'oidc-layout.template.ejs'), {
        title: 'Error',
        content: errorContent,
      })
    },
  }
}
