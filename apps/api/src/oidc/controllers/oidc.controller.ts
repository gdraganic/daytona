/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Controller, Get, Post, Req, Res, Param, Body, Query, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { TypedConfigService } from '../../config/typed-config.service'
import { ExternalIdentityService } from '../../user/external-identity.service'
import Provider from 'oidc-provider'
import { jwtVerify } from 'jose'

@ApiExcludeController()
@Controller('oidc')
export class OidcController {
  private readonly logger = new Logger(OidcController.name)
  private provider: Provider

  constructor(
    private authService: AuthService,
    private configService: TypedConfigService,
    private externalIdentityService: ExternalIdentityService,
  ) {}

  setProvider(provider: Provider) {
    this.provider = provider
  }

  @Get('interaction/:uid')
  async getInteraction(
    @Param('uid') uid: string,
    @Query('error') error: string,
    @Query('notice') notice: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const interaction = await this.provider.interactionDetails(req, res)

      const { prompt } = interaction

      // Get client information
      const client = await this.provider.Client.find(interaction.params.client_id as string)
      const clientName = client.clientName || interaction.params.client_id

      // Map error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        invalid_state: 'Invalid or expired OAuth state. Please try again.',
        oauth_failed: 'OAuth authentication failed. Please try again.',
        auth_failed: 'Authentication failed. Please try again.',
        invalid_return: 'Invalid return URL. Please try again.',
        provider_error: 'OAuth provider error. Please contact support.',
        interaction_failed: 'Login session expired. Please try again.',
        oauth_callback_failed: 'OAuth callback failed. Please try again.',
        domain_not_allowed: 'Your email domain is not allowed. Please contact your administrator.',
      }

      const errorMessage = error ? errorMessages[error] || 'An error occurred. Please try again.' : undefined

      // Handle account merge notice
      const accountMerge =
        notice === 'account_merge_required'
          ? {
              message: 'An account with this email already exists. Please sign in to link your accounts.',
              email: (req.query as any).email || '',
              provider: (req.query as any).provider || '',
              mergeToken: (req.query as any).mergeToken || '',
            }
          : undefined

      this.logger.debug(`Login page render - notice: ${notice}, accountMerge: ${JSON.stringify(accountMerge)}`)

      if (prompt.name === 'login') {
        return this.renderLoginPage(res, uid, clientName as string, errorMessage, accountMerge)
      }

      if (prompt.name === 'consent') {
        return this.renderConsentPage(res, uid, interaction.params, clientName as string)
      }

      throw new HttpException('Unknown prompt type', HttpStatus.BAD_REQUEST)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('interaction/:uid/login')
  async postLogin(
    @Param('uid') uid: string,
    @Body() body: { emailOrUsername: string; password: string },
    @Query('accountMerge') accountMerge: string,
    @Query('email') email: string,
    @Query('provider') provider: string,
    @Query('mergeToken') mergeToken: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // Validate credentials (accepts email or username)
      const user = await this.authService.login({
        emailOrUsername: body.emailOrUsername,
        password: body.password,
      })

      // If this is an account merge, link the external identity
      if (accountMerge === 'true' && mergeToken) {
        try {
          const secret = new TextEncoder().encode(
            process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production',
          )

          const { payload } = await jwtVerify(mergeToken, secret)

          this.logger.debug(
            `Linking external identity after successful login: provider=${payload.provider}, userId=${user.id}`,
          )

          // Link the external identity to the user
          await this.externalIdentityService.linkToUser(
            payload.provider as string,
            payload.providerUserId as string,
            user.id,
            payload.providerUsername as string,
            payload.providerEmail as string,
            payload.providerData as Record<string, any>,
          )

          this.logger.debug(`Successfully linked ${payload.provider} account to user ${user.id}`)
        } catch (err) {
          this.logger.error('Failed to link external identity during account merge', err)
          // Continue with login even if linking fails
        }
      }

      // Complete the interaction
      await this.provider.interactionFinished(
        req,
        res,
        {
          login: {
            accountId: user.id,
          },
        },
        { mergeWithLastSubmission: false },
      )
    } catch (err) {
      const interaction = await this.provider.interactionDetails(req, res)
      const client = await this.provider.Client.find(interaction.params.client_id as string)
      const clientName = client.clientName || interaction.params.client_id

      // Check if this was an account merge attempt
      const accountMergeData =
        accountMerge === 'true'
          ? {
              message: 'Invalid credentials. Please try again to link your accounts.',
              email: email || '',
              provider: provider || '',
              mergeToken: mergeToken || '',
            }
          : undefined

      return this.renderLoginPage(res, uid, clientName as string, 'Invalid credentials', accountMergeData)
    }
  }

  @Post('interaction/:uid/register')
  async postRegister(
    @Param('uid') uid: string,
    @Body() body: { email: string; password: string; name: string; username: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // Register new user
      const user = await this.authService.register({
        email: body.email,
        password: body.password,
        name: body.name,
        username: body.username,
      })

      // Complete the interaction
      await this.provider.interactionFinished(
        req,
        res,
        {
          login: {
            accountId: user.id,
          },
        },
        { mergeWithLastSubmission: false },
      )
    } catch (err) {
      const interaction = await this.provider.interactionDetails(req, res)
      const client = await this.provider.Client.find(interaction.params.client_id as string)
      const clientName = client.clientName || interaction.params.client_id
      return this.renderLoginPage(res, uid, clientName as string, err.message)
    }
  }

  @Post('interaction/:uid/confirm')
  async postConfirm(@Param('uid') uid: string, @Req() req: Request, @Res() res: Response) {
    try {
      const interaction = await this.provider.interactionDetails(req, res)

      // Grant all requested scopes and claims
      let grant: InstanceType<typeof this.provider.Grant>

      if (interaction.grantId) {
        // Load existing grant
        grant = await this.provider.Grant.find(interaction.grantId)
      } else {
        // Create new grant
        grant = new this.provider.Grant({
          accountId: interaction.session.accountId,
          clientId: interaction.params.client_id as string,
        })
      }

      if (interaction.params.scope) {
        const scopes = (interaction.params.scope as string).split(' ')
        grant.addOIDCScope(scopes.join(' '))
      }

      // Add resource indicator if present (for audience-based tokens)
      if (interaction.params.resource) {
        const resources = Array.isArray(interaction.params.resource)
          ? interaction.params.resource
          : [interaction.params.resource]

        for (const resource of resources) {
          grant.addResourceScope(resource as string, (interaction.params.scope as string) || '')
        }
      }

      const grantId = await grant.save()

      const result = {
        consent: {
          grantId,
        },
      }

      await this.provider.interactionFinished(req, res, result, { mergeWithLastSubmission: true })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('interaction/:uid/abort')
  async postAbort(@Param('uid') uid: string, @Req() req: Request, @Res() res: Response) {
    try {
      const result = {
        error: 'access_denied',
        error_description: 'User cancelled the authorization request',
      }

      await this.provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('interaction/:uid/oauth-callback')
  async oauthCallback(
    @Param('uid') uid: string,
    @Query('token') token: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!token) {
      throw new HttpException('Missing token', HttpStatus.BAD_REQUEST)
    }

    // Verify and decode the JWT token from OAuth callback
    const secret = new TextEncoder().encode(process.env.OAUTH_STATE_SECRET || 'oauth-state-secret-change-in-production')

    const { payload } = await jwtVerify(token, secret)
    const userId = payload.userId as string

    if (!userId) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
    }

    this.logger.debug(`Completing OIDC interaction ${uid} for user ${userId}`)

    // Complete the interaction with the user ID
    await this.provider.interactionFinished(
      req,
      res,
      {
        login: {
          accountId: userId,
        },
      },
      { mergeWithLastSubmission: false },
    )
  }

  private renderLoginPage(
    res: Response,
    uid: string,
    clientName: string,
    error?: string,
    accountMerge?: { message: string; email: string; provider: string; mergeToken: string },
  ): void {
    // Get enabled OAuth providers
    const providers = []
    const githubConfig = this.configService.get('security.providers.github')
    if (githubConfig?.enabled && githubConfig.clientId) {
      // Exclude provider that triggered account merge to avoid infinite loop
      if (!accountMerge || accountMerge.provider !== 'github') {
        providers.push({
          name: 'github',
          displayName: 'GitHub',
        })
      }
    }

    const googleConfig = this.configService.get('security.providers.google')
    if (googleConfig?.enabled && googleConfig.clientId) {
      // Exclude provider that triggered account merge to avoid infinite loop
      if (!accountMerge || accountMerge.provider !== 'google') {
        providers.push({
          name: 'google',
          displayName: 'Google',
        })
      }
    }

    res.render('oidc-login', {
      uid,
      clientName,
      error: error || null,
      accountMerge: accountMerge || null,
      providers,
      returnTo: `/api/oidc/interaction/${uid}`,
    })
  }

  private renderConsentPage(res: Response, uid: string, params: any, clientName: string): void {
    const scopes = (params.scope as string)?.split(' ') || []
    const scopeDescriptions = {
      openid: 'Access your basic profile information',
      email: 'Access your email address',
      profile: 'Access your profile information',
      offline_access: 'Maintain access when you are offline',
    }

    const scopeList = scopes.map((scope) => ({
      name: scope,
      description: scopeDescriptions[scope] || scope,
    }))

    res.render('oidc-consent', {
      uid,
      clientName,
      scopes: scopeList,
    })
  }
}
