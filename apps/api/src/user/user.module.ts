/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserCredential } from './user-credential.entity'
import { ExternalIdentity } from './external-identity.entity'
import { ExternalIdentityService } from './external-identity.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredential, ExternalIdentity])],
  controllers: [UserController],
  providers: [UserService, ExternalIdentityService],
  exports: [UserService, ExternalIdentityService],
})
export class UserModule {}
