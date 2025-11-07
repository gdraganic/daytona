/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Controller, Get, Query, Res, Req, BadRequestException, Logger } from '@nestjs/common'
import { Response, Request } from 'express'
import { OAuthService } from './oauth.service'
import { UserService } from '../user/user.service'
import { ExternalIdentityService } from '../user/external-identity.service'
import { TypedConfigService } from '../config/typed-config.service'
import { ApiExcludeController } from '@nestjs/swagger'
import * as crypto from 'crypto'
import { SignJWT, jwtVerify } from 'jose'
import { OidcProviderService } from '../oidc/services/oidc-provider.service'

@ApiExcludeController()
@Controller('auth/oauth')
export class OAuthController {
  private readonly logger = new Logger(OAuthController.name)

  constructor(
    private readonly oauthService: OAuthService,
    private readonly userService: UserService,
    private readonly externalIdentityService: ExternalIdentityService,
    private readonly configService: TypedConfigService,
    private readonly oidcProviderService: OidcProviderService,
  ) {}

  @Get('github')
  async githubLogin(@Res() res: Response, @Req() req: Request) {
    const githubConfig = this.configService.get('security.providers.github')
    if (!githubConfig?.enabled || !githubConfig.clientId) {
      throw new BadRequestException('GitHub OAuth is not configured')
    }

    // Create signed state JWT with returnTo and nonce for CSRF protection
    const returnTo = (req.query.returnTo as string) || this.configService.get('dashboardUrl') || '/'
    const nonce = crypto.randomBytes(32).toString('hex')

    // Use a secret from config or generate one (should be persistent in production)
    const secret = new TextEncoder().encode(process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production')

    const state = await new SignJWT({ returnTo, nonce })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(secret)

    const appUrl = this.configService.get('appUrl') || 'http://localhost:3001'
    const redirectUri = `${appUrl}/api/auth/oauth/github/callback`

    const authUrl = this.oauthService.getGitHubAuthUrl(state, redirectUri)
    res.redirect(authUrl)
  }

  @Get('github/callback')
  async githubCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('error') error: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const dashboardUrl = this.configService.get('dashboardUrl') || 'http://localhost:3000'

    // Verify and decode state JWT
    let returnTo = dashboardUrl
    try {
      if (!state) {
        throw new Error('Missing state parameter')
      }

      const secret = new TextEncoder().encode(
        process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production',
      )

      const { payload } = await jwtVerify(state, secret)
      returnTo = (payload.returnTo as string) || dashboardUrl
    } catch (err) {
      this.logger.error('Invalid or expired state token', err)
      return res.redirect(`${dashboardUrl}?error=invalid_state`)
    }

    // Handle OAuth errors
    if (error) {
      this.logger.error(`GitHub OAuth error: ${error}`)
      return res.redirect(`${returnTo}?error=oauth_failed`)
    }

    if (!code) {
      throw new BadRequestException('Missing code')
    }

    try {
      const appUrl = this.configService.get('appUrl') || 'http://localhost:3001'
      const redirectUri = `${appUrl}/api/auth/oauth/github/callback`

      // Exchange code for access token
      const accessToken = await this.oauthService.exchangeGitHubCode(code, redirectUri)

      // Get user info from GitHub
      const githubUser = await this.oauthService.getGitHubUser(accessToken)
      const githubEmail = await this.oauthService.getGitHubPrimaryEmail(accessToken)

      // Check if external identity already exists
      this.logger.debug(`Looking for existing GitHub identity for provider ID: ${githubUser.id}`)
      const externalIdentity = await this.externalIdentityService.findByProvider('github', String(githubUser.id))
      this.logger.debug(
        `External identity lookup result: ${externalIdentity ? `Found, userId: ${externalIdentity.userId}` : 'Not found'}`,
      )

      if (externalIdentity) {
        // User already linked, log them in
        this.logger.debug(`Existing GitHub user logged in: ${githubUser.login}`)
        await this.completeOidcInteraction(req, res, returnTo, externalIdentity.userId)
        return
      }

      // Check if user with this email already exists
      if (githubEmail) {
        this.logger.debug(`Looking for existing user with email: ${githubEmail}`)
        const existingUser = await this.userService.findOneByEmail(githubEmail, true)
        this.logger.debug(`User lookup result: ${existingUser ? `Found, userId: ${existingUser.id}` : 'Not found'}`)

        if (existingUser) {
          // User exists but not linked to GitHub
          // For security, require explicit login to merge accounts
          // This prevents account hijacking via OAuth
          this.logger.debug(`User with email ${githubEmail} exists but not linked to GitHub. Requires login to merge.`)

          // Create a signed token with the OAuth data for account linking after successful login
          const secret = new TextEncoder().encode(
            process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production',
          )

          const mergeToken = await new SignJWT({
            provider: 'github',
            providerUserId: String(githubUser.id),
            providerUsername: githubUser.login,
            providerEmail: githubEmail,
            providerData: {
              avatar_url: githubUser.avatar_url,
              name: githubUser.name,
            },
          })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(secret)

          return res.redirect(
            `${returnTo}?notice=account_merge_required&email=${encodeURIComponent(githubEmail)}&provider=github&mergeToken=${mergeToken}`,
          )
        }
      }

      // Create new user
      this.logger.debug(`Creating new user from GitHub: ${githubUser.login}, email: ${githubEmail}`)
      const newUser = await this.userService.create({
        name: githubUser.name || githubUser.login,
        email: githubEmail || `${githubUser.login}@github.local`,
        emailVerified: !!githubEmail,
        personalOrganizationQuota: this.configService.getOrThrow('defaultOrganizationQuota'),
      })
      this.logger.debug(`Created user with ID: ${newUser.id}`)

      // Link to GitHub
      this.logger.debug(
        `Linking GitHub identity (provider: github, providerId: ${githubUser.id}) to user ${newUser.id}`,
      )
      await this.externalIdentityService.linkToUser(
        'github',
        String(githubUser.id),
        newUser.id,
        githubUser.login,
        githubEmail,
        {
          avatar_url: githubUser.avatar_url,
          name: githubUser.name,
        },
      )
      this.logger.debug(`Successfully linked GitHub identity to user ${newUser.id}`)

      this.logger.log(`New user created from GitHub: ${githubUser.login}`)

      await this.completeOidcInteraction(req, res, returnTo, newUser.id)
    } catch (error) {
      this.logger.error('GitHub OAuth callback failed', error)
      return res.redirect(`${returnTo}?error=auth_failed`)
    }
  }

  @Get('google')
  async googleLogin(@Res() res: Response, @Req() req: Request) {
    const googleConfig = this.configService.get('security.providers.google')
    if (!googleConfig?.enabled || !googleConfig.clientId) {
      throw new BadRequestException('Google OAuth is not configured')
    }

    // Create signed state JWT with returnTo and nonce for CSRF protection
    const returnTo = (req.query.returnTo as string) || this.configService.get('dashboardUrl') || '/'
    const nonce = crypto.randomBytes(32).toString('hex')

    const secret = new TextEncoder().encode(process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production')

    const state = await new SignJWT({ returnTo, nonce })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(secret)

    const appUrl = this.configService.get('appUrl') || 'http://localhost:3001'
    const redirectUri = `${appUrl}/api/auth/oauth/google/callback`

    const authUrl = this.oauthService.getGoogleAuthUrl(state, redirectUri)
    res.redirect(authUrl)
  }

  @Get('google/callback')
  async googleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('error') error: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const dashboardUrl = this.configService.get('dashboardUrl') || 'http://localhost:3000'

    // Verify and decode state JWT
    let returnTo = dashboardUrl
    try {
      if (!state) {
        throw new Error('Missing state parameter')
      }

      const secret = new TextEncoder().encode(
        process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production',
      )

      const { payload } = await jwtVerify(state, secret)
      returnTo = (payload.returnTo as string) || dashboardUrl
    } catch (err) {
      this.logger.error('Invalid or expired state token', err)
      return res.redirect(`${dashboardUrl}?error=invalid_state`)
    }

    // Handle OAuth errors
    if (error) {
      this.logger.error(`Google OAuth error: ${error}`)
      return res.redirect(`${returnTo}?error=oauth_failed`)
    }

    if (!code) {
      throw new BadRequestException('Missing code')
    }

    try {
      const appUrl = this.configService.get('appUrl') || 'http://localhost:3001'
      const redirectUri = `${appUrl}/api/auth/oauth/google/callback`

      // Exchange code for access token
      const accessToken = await this.oauthService.exchangeGoogleCode(code, redirectUri)

      // Get user info from Google
      const googleUser = await this.oauthService.getGoogleUser(accessToken)

      // Validate allowed domains if configured
      const googleConfig = this.configService.get('security.providers.google')
      if (googleConfig?.allowedDomains) {
        const allowedDomains = googleConfig.allowedDomains
          .split(',')
          .map((d) => d.trim())
          .filter((d) => d)

        if (allowedDomains.length > 0) {
          const emailDomain = googleUser.email.split('@')[1]
          if (!allowedDomains.includes(emailDomain)) {
            this.logger.warn(
              `Google login rejected: email domain ${emailDomain} not in allowed list [${allowedDomains.join(', ')}]`,
            )
            return res.redirect(`${returnTo}?error=domain_not_allowed`)
          }
        }
      }

      // Check if external identity already exists
      this.logger.debug(`Looking for existing Google identity for provider ID: ${googleUser.sub}`)
      const externalIdentity = await this.externalIdentityService.findByProvider('google', googleUser.sub)
      this.logger.debug(
        `External identity lookup result: ${externalIdentity ? `Found, userId: ${externalIdentity.userId}` : 'Not found'}`,
      )

      if (externalIdentity) {
        // User already linked, log them in
        this.logger.debug(`Existing Google user logged in: ${googleUser.email}`)
        await this.completeOidcInteraction(req, res, returnTo, externalIdentity.userId)
        return
      }

      // Check if user with this email already exists
      if (googleUser.email) {
        this.logger.debug(`Looking for existing user with email: ${googleUser.email}`)
        const existingUser = await this.userService.findOneByEmail(googleUser.email, true)
        this.logger.debug(`User lookup result: ${existingUser ? `Found, userId: ${existingUser.id}` : 'Not found'}`)

        if (existingUser) {
          // User exists but not linked to Google
          // For security, require explicit login to merge accounts
          // This prevents account hijacking via OAuth
          this.logger.debug(
            `User with email ${googleUser.email} exists but not linked to Google. Requires login to merge.`,
          )

          // Create a signed token with the OAuth data for account linking after successful login
          const secret = new TextEncoder().encode(
            process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production',
          )

          const mergeToken = await new SignJWT({
            provider: 'google',
            providerUserId: googleUser.sub,
            providerUsername: googleUser.email,
            providerEmail: googleUser.email,
            providerData: {
              picture: googleUser.picture,
              name: googleUser.name,
            },
          })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(secret)

          return res.redirect(
            `${returnTo}?notice=account_merge_required&email=${encodeURIComponent(googleUser.email)}&provider=google&mergeToken=${mergeToken}`,
          )
        }
      }

      // Create new user
      this.logger.debug(`Creating new user from Google: ${googleUser.email}`)
      const newUser = await this.userService.create({
        name: googleUser.name || googleUser.email,
        email: googleUser.email,
        emailVerified: googleUser.email_verified || false,
        personalOrganizationQuota: this.configService.getOrThrow('defaultOrganizationQuota'),
      })
      this.logger.debug(`Created user with ID: ${newUser.id}`)

      // Link to Google
      this.logger.debug(
        `Linking Google identity (provider: google, providerId: ${googleUser.sub}) to user ${newUser.id}`,
      )
      await this.externalIdentityService.linkToUser(
        'google',
        googleUser.sub,
        newUser.id,
        googleUser.email,
        googleUser.email,
        {
          picture: googleUser.picture,
          name: googleUser.name,
        },
      )
      this.logger.debug(`Successfully linked Google identity to user ${newUser.id}`)

      this.logger.log(`New user created from Google: ${googleUser.email}`)

      await this.completeOidcInteraction(req, res, returnTo, newUser.id)
    } catch (error) {
      this.logger.error('Google OAuth callback failed', error)
      return res.redirect(`${returnTo}?error=auth_failed`)
    }
  }

  /**
   * Completes OIDC interaction after successful OAuth authentication
   * by redirecting back to the interaction URL with a signed token
   */
  private async completeOidcInteraction(req: Request, res: Response, returnTo: string, userId: string): Promise<void> {
    // Extract interaction UID from returnTo URL
    // Expected format: /api/oidc/interaction/{uid}
    const uidMatch = returnTo.match(/\/api\/oidc\/interaction\/([^/?]+)/)

    if (!uidMatch) {
      this.logger.error(`Could not extract UID from returnTo: ${returnTo}`)
      return res.redirect(`${returnTo}?error=invalid_return`)
    }

    const uid = uidMatch[1]

    try {
      // Create a signed token with the user ID to pass back to the interaction
      const secret = new TextEncoder().encode(
        process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production',
      )

      const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('5m')
        .sign(secret)

      // Redirect back to the interaction URL with the token
      // The OIDC controller will handle completing the interaction
      return res.redirect(`/api/oidc/interaction/${uid}/oauth-callback?token=${token}`)
    } catch (error) {
      this.logger.error(`Failed to create OAuth callback token for UID ${uid}:`, error)
      return res.redirect(`${returnTo}?error=interaction_failed`)
    }
  }
}
