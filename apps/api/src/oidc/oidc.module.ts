/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Module, OnModuleInit, DynamicModule, Inject, Type } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { DataSource } from 'typeorm'
import Provider, { ClientMetadata } from 'oidc-provider'
import { OidcController } from './controllers/oidc.controller'
import { OidcProviderController } from './controllers/oidc-provider.controller'
import { AuthService } from './services/auth.service'
import { JwksService } from './services/jwks.service'
import { OidcCleanupService } from './services/oidc-cleanup.service'
import { OidcProviderService } from './services/oidc-provider.service'
import { UserModule } from '../user/user.module'
import { OidcModel } from './entities/oidc-model.entity'
import { Jwks } from './entities/jwks.entity'
import { createOidcAdapterFactory } from './oidc-adapter'
import { createOidcHybridAdapterFactory } from './oidc-hybrid-adapter'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { Redis } from 'ioredis'
import { createOidcProviderConfig } from './oidc-provider.config'
import { TypedConfigService } from '../config/typed-config.service'

export interface OidcModuleOptions {
  clients: ClientMetadata[]
}

export interface OidcModuleOptionsFactory {
  createOidcModuleOptions(): Promise<OidcModuleOptions> | OidcModuleOptions
}

export interface OidcModuleAsyncOptions {
  imports?: any[]
  useExisting?: Type<OidcModuleOptionsFactory>
  useClass?: Type<OidcModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<OidcModuleOptions> | OidcModuleOptions
  inject?: any[]
}

const OIDC_MODULE_OPTIONS = 'OIDC_MODULE_OPTIONS'

/**
 * OidcModule provides OpenID Connect authentication provider functionality.
 *
 * Usage:
 *
 * Static configuration (forRoot):
 * ```
 * OidcModule.forRoot({
 *   clients: [
 *     {
 *       client_id: 'my-app',
 *       client_secret: 'secret',
 *       redirect_uris: ['http://localhost:3000/callback'],
 *       token_endpoint_auth_method: 'client_secret_post',
 *     }
 *   ]
 * })
 * ```
 *
 * Dynamic configuration (forRootAsync):
 * ```
 * OidcModule.forRootAsync({
 *   inject: [ConfigService],
 *   useFactory: (config: ConfigService) => ({
 *     clients: config.get('oidc.clients'),
 *   }),
 * })
 * ```
 */
@Module({})
export class OidcModule implements OnModuleInit {
  private provider: Provider

  constructor(
    private configService: TypedConfigService,
    private authService: AuthService,
    private jwksService: JwksService,
    private dataSource: DataSource,
    private moduleRef: ModuleRef,
    private oidcProviderService: OidcProviderService,
    @Inject(OIDC_MODULE_OPTIONS) private options: OidcModuleOptions,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  static forRoot(options: OidcModuleOptions): DynamicModule {
    return {
      module: OidcModule,
      global: true,
      imports: [UserModule, TypeOrmModule.forFeature([OidcModel, Jwks]), ScheduleModule.forRoot()],
      controllers: [OidcController, OidcProviderController],
      providers: [
        AuthService,
        JwksService,
        OidcCleanupService,
        OidcProviderService,
        {
          provide: OIDC_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [AuthService, OidcProviderService],
    }
  }

  static forRootAsync(options: OidcModuleAsyncOptions): DynamicModule {
    return {
      module: OidcModule,
      global: true,
      imports: [
        ...(options.imports || []),
        UserModule,
        TypeOrmModule.forFeature([OidcModel, Jwks]),
        ScheduleModule.forRoot(),
      ],
      controllers: [OidcController, OidcProviderController],
      providers: [
        AuthService,
        JwksService,
        OidcCleanupService,
        OidcProviderService,
        ...this.createAsyncProviders(options),
      ],
      exports: [AuthService, OidcProviderService],
    }
  }

  private static createAsyncProviders(options: OidcModuleAsyncOptions): any[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }

    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ]
    }

    return []
  }

  private static createAsyncOptionsProvider(options: OidcModuleAsyncOptions): any {
    if (options.useFactory) {
      return {
        provide: OIDC_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: OIDC_MODULE_OPTIONS,
      useFactory: async (optionsFactory: OidcModuleOptionsFactory) => {
        return await optionsFactory.createOidcModuleOptions()
      },
      inject: [options.useExisting || options.useClass],
    }
  }

  async onModuleInit() {
    const baseUrl = this.configService.get('appUrl') || 'http://localhost:3001'
    const issuer = `${baseUrl}/api/oidc`

    // Get the OidcModel repository
    const modelRepository = this.dataSource.getRepository(OidcModel)

    // Create adapter factory - use hybrid adapter if Redis is enabled
    const useRedis = this.configService.get('oidcAdapter.useRedis')
    const adapterFactory = useRedis
      ? createOidcHybridAdapterFactory(this.redis, modelRepository)
      : createOidcAdapterFactory(modelRepository)

    // Get or generate JWKS from database
    const jwks = await this.jwksService.getOrGenerateKeys()

    // Create OIDC provider configuration with clients from options
    const config = createOidcProviderConfig(issuer, adapterFactory, jwks, this.options.clients)

    // Override findAccount to use our auth service
    config.findAccount = async (_ctx, id) => {
      const claims = await this.authService.getUserWithClaims(id)
      if (!claims) {
        return null
      }

      return {
        accountId: id,
        async claims() {
          return claims
        },
      }
    }

    // Add extra claims to access tokens based on scope
    config.extraTokenClaims = async (_ctx, token) => {
      if (token.kind !== 'AccessToken') {
        return {}
      }

      const accountId = token.accountId
      if (!accountId) {
        return {}
      }

      // Get user claims
      const userClaims = await this.authService.getUserWithClaims(accountId)
      if (!userClaims) {
        return {}
      }

      const claims: Record<string, any> = {}
      const scope = token.scope || ''

      // Add email claims if email scope is present
      if (scope.includes('email')) {
        if (userClaims.email) claims.email = userClaims.email
        if (userClaims.email_verified !== undefined) claims.email_verified = userClaims.email_verified
      }

      // Add profile claims if profile scope is present
      if (scope.includes('profile')) {
        if (userClaims.name) claims.name = userClaims.name
        if (userClaims.preferred_username) claims.preferred_username = userClaims.preferred_username
      }

      return claims
    }

    // Initialize provider
    this.provider = new Provider(issuer, config)

    // Set provider in service for access by other modules
    this.oidcProviderService.setProvider(this.provider)

    // Get controller instances and set provider
    const oidcProviderController = this.moduleRef.get(OidcProviderController, { strict: false })
    oidcProviderController.setProvider(this.provider)

    const oidcController = this.moduleRef.get(OidcController, { strict: false })
    oidcController.setProvider(this.provider)
  }

  getProvider(): Provider {
    return this.provider
  }
}
