/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { User } from '../../user/user.entity'

export interface RegisterUserDto {
  email: string
  password: string
  name: string
  username: string
}

export interface LoginUserDto {
  emailOrUsername: string
  password: string
}

/**
 * AuthService - Thin wrapper around UserService for OIDC authentication
 * This service delegates to UserService for all user/credential operations
 */
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: RegisterUserDto): Promise<User> {
    return this.userService.createWithPassword(dto.email, dto.password, dto.name, dto.username)
  }

  async login(dto: LoginUserDto): Promise<User> {
    return this.userService.validatePasswordByEmailOrUsername(dto.emailOrUsername, dto.password)
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userService.findOne(userId)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userService.findOneByEmail(email, true)
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    return this.userService.changePassword(userId, currentPassword, newPassword)
  }

  async getUserWithClaims(userId: string): Promise<any> {
    return this.userService.getUserWithClaims(userId)
  }
}
