/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { TypedConfigService } from '../config/typed-config.service'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

export interface GitHubUser {
  id: number
  login: string
  email: string
  name: string
  avatar_url: string
}

export interface GitHubEmail {
  email: string
  primary: boolean
  verified: boolean
  visibility: string | null
}

export interface GoogleUser {
  sub: string
  email: string
  email_verified: boolean
  name: string
  picture: string
  given_name?: string
  family_name?: string
}

@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name)

  constructor(
    private readonly configService: TypedConfigService,
    private readonly httpService: HttpService,
  ) {}

  getGitHubAuthUrl(state: string, redirectUri: string): string {
    const clientId = this.configService.get('security.providers.github.clientId')
    if (!clientId) {
      throw new Error('GitHub OAuth not configured')
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'read:user user:email',
      state,
    })

    return `https://github.com/login/oauth/authorize?${params.toString()}`
  }

  async exchangeGitHubCode(code: string, redirectUri: string): Promise<string> {
    const clientId = this.configService.get('security.providers.github.clientId')
    const clientSecret = this.configService.get('security.providers.github.clientSecret')

    if (!clientId || !clientSecret) {
      throw new Error('GitHub OAuth not configured')
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://github.com/login/oauth/access_token',
          {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
          },
          {
            headers: {
              Accept: 'application/json',
            },
          },
        ),
      )

      const { access_token } = response.data
      if (!access_token) {
        throw new UnauthorizedException('Failed to exchange GitHub code for token')
      }

      return access_token
    } catch (error) {
      this.logger.error('Failed to exchange GitHub code', error)
      throw new UnauthorizedException('Failed to authenticate with GitHub')
    }
  }

  async getGitHubUser(accessToken: string): Promise<GitHubUser> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }),
      )

      return response.data
    } catch (error) {
      this.logger.error('Failed to get GitHub user', error)
      throw new UnauthorizedException('Failed to get user from GitHub')
    }
  }

  async getGitHubEmails(accessToken: string): Promise<GitHubEmail[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }),
      )

      return response.data
    } catch (error) {
      this.logger.error('Failed to get GitHub emails', error)
      return []
    }
  }

  async getGitHubPrimaryEmail(accessToken: string): Promise<string | null> {
    const emails = await this.getGitHubEmails(accessToken)
    const primaryEmail = emails.find((e) => e.primary && e.verified)
    return primaryEmail?.email || emails.find((e) => e.verified)?.email || null
  }

  getGoogleAuthUrl(state: string, redirectUri: string): string {
    const clientId = this.configService.get('security.providers.google.clientId')
    if (!clientId) {
      throw new Error('Google OAuth not configured')
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state,
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  async exchangeGoogleCode(code: string, redirectUri: string): Promise<string> {
    const clientId = this.configService.get('security.providers.google.clientId')
    const clientSecret = this.configService.get('security.providers.google.clientSecret')

    if (!clientId || !clientSecret) {
      throw new Error('Google OAuth not configured')
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://oauth2.googleapis.com/token',
          {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      )

      const { access_token } = response.data
      if (!access_token) {
        throw new UnauthorizedException('Failed to exchange Google code for token')
      }

      return access_token
    } catch (error) {
      this.logger.error('Failed to exchange Google code', error)
      throw new UnauthorizedException('Failed to authenticate with Google')
    }
  }

  async getGoogleUser(accessToken: string): Promise<GoogleUser> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }),
      )

      return response.data
    } catch (error) {
      this.logger.error('Failed to get Google user', error)
      throw new UnauthorizedException('Failed to get user from Google')
    }
  }
}
