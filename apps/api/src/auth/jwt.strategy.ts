/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { passportJwtSecret } from 'jwks-rsa'
import { createRemoteJWKSet, JWTPayload, jwtVerify } from 'jose'
import { UserService } from '../user/user.service'
import { AuthContext } from '../common/interfaces/auth-context.interface'
import { Request } from 'express'
import { CustomHeaders } from '../common/constants/header.constants'
import { TypedConfigService } from '../config/typed-config.service'
import { HttpService } from '@nestjs/axios'
import { OidcMetadata } from 'oidc-client-ts'
import { firstValueFrom } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

interface JwtStrategyConfig {
  jwksUri: string
  audience: string
  issuer: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name)
  private JWKS: ReturnType<typeof createRemoteJWKSet> | null = null
  private options: JwtStrategyConfig | null = null
  private initializationPromise: Promise<void> | null = null

  constructor(
    options: JwtStrategyConfig | null,
    private readonly userService: UserService,
    private readonly configService: TypedConfigService,
  ) {
    // Initialize with dummy config - will be replaced on first request
    super({
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        try {
          await this.ensureInitialized()
          if (!this.options) {
            throw new Error('JwtStrategy not initialized')
          }
          // Fetch key from JWKS
          const provider = passportJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: this.options.jwksUri,
          })
          provider(request, rawJwtToken, done)
        } catch (error) {
          done(error, null)
        }
      },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: options?.audience,
      issuer: options?.issuer,
      algorithms: ['RS256'],
      passReqToCallback: true,
    })

    if (options) {
      // Synchronous initialization if options provided
      this.options = options
      this.JWKS = createRemoteJWKSet(new URL(options.jwksUri))
      this.logger.debug('JwtStrategy initialized synchronously')
    } else {
      this.logger.debug('JwtStrategy created - will initialize lazily on first request')
    }
  }

  async validate(request: Request, payload: any): Promise<AuthContext> {
    const userId = payload.sub
    const user = await this.userService.findOne(userId)

    if (!user) {
      this.logger.warn(`User not found for JWT sub: ${userId}`)
      throw new Error('User not found')
    }

    const organizationId = request.get(CustomHeaders.ORGANIZATION_ID.name)

    return {
      userId: user.id,
      role: user.role,
      email: user.email,
      organizationId,
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (this.options && this.JWKS) {
      return // Already initialized
    }

    // Ensure only one initialization happens
    if (this.initializationPromise) {
      return this.initializationPromise
    }

    this.initializationPromise = this.initialize()
    return this.initializationPromise
  }

  private async initialize(): Promise<void> {
    this.logger.debug('Lazy initializing JwtStrategy...')

    const httpService = new HttpService()
    const discoveryUrl = `${this.configService.get('oidc.issuer')}/.well-known/openid-configuration`

    const metadata = await firstValueFrom(
      httpService.get(discoveryUrl).pipe(
        map((response) => response.data as OidcMetadata),
        catchError((error) => {
          throw new Error(`Failed to fetch OpenID configuration: ${error.message}`)
        }),
      ),
    )

    let jwksUri = metadata.jwks_uri

    const internalIssuer = this.configService.getOrThrow('oidc.issuer')
    const publicIssuer = this.configService.get('oidc.publicIssuer')
    if (publicIssuer) {
      jwksUri = metadata.jwks_uri.replace(publicIssuer, internalIssuer)
    }

    this.options = {
      audience: this.configService.get('oidc.audience'),
      issuer: metadata.issuer,
      jwksUri,
    }

    this.JWKS = createRemoteJWKSet(new URL(jwksUri))
    this.logger.debug(`JwtStrategy initialized with JWKS URI: ${jwksUri}`)
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    await this.ensureInitialized()

    if (!this.JWKS || !this.options) {
      throw new Error('JwtStrategy not initialized')
    }

    const { payload } = await jwtVerify(token, this.JWKS, {
      audience: this.options.audience,
      issuer: this.options.issuer,
      algorithms: ['RS256'],
    })
    return payload
  }
}
