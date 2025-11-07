/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { ApiKeyStrategy } from './api-key.strategy'
import { UserModule } from '../user/user.module'
import { ApiKeyModule } from '../api-key/api-key.module'
import { SandboxModule } from '../sandbox/sandbox.module'
import { TypedConfigService } from '../config/typed-config.service'
import { HttpModule } from '@nestjs/axios'
import { UserService } from '../user/user.service'
import { TypedConfigModule } from '../config/typed-config.module'
import { OAuthService } from './oauth.service'
import { OAuthController } from './oauth.controller'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: ['jwt', 'api-key'],
      property: 'user',
      session: false,
    }),
    TypedConfigModule,
    UserModule,
    ApiKeyModule,
    SandboxModule,
    HttpModule,
  ],
  controllers: [OAuthController],
  providers: [
    ApiKeyStrategy,
    OAuthService,
    {
      provide: JwtStrategy,
      useFactory: (userService: UserService, configService: TypedConfigService) => {
        // Return a placeholder - will be initialized lazily on first request
        return new JwtStrategy(null, userService, configService)
      },
      inject: [UserService, TypedConfigService],
    },
  ],
  exports: [PassportModule, JwtStrategy, ApiKeyStrategy, OAuthService],
})
export class AuthModule {}
