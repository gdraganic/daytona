/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User, UserSSHKeyPair } from './user.entity'
import { UserCredential } from './user-credential.entity'
import { DataSource, ILike, In, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import * as crypto from 'crypto'
import * as forge from 'node-forge'
import * as bcrypt from 'bcrypt'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UserEvents } from './constants/user-events.constant'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserCreatedEvent } from './events/user-created.event'
import { UserDeletedEvent } from './events/user-deleted.event'
import { UserEmailVerifiedEvent } from './events/user-email-verified.event'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserCredential)
    private readonly userCredentialRepository: Repository<UserCredential>,
    private readonly eventEmitter: EventEmitter2,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = new User()
    user.name = createUserDto.name
    const keyPair = await this.generatePrivateKey()
    user.keyPair = keyPair
    user.publicKeys = []
    user.emailVerified = createUserDto.emailVerified

    if (createUserDto.email) {
      user.email = createUserDto.email
    }

    if (createUserDto.role) {
      user.role = createUserDto.role
    }

    await this.dataSource.transaction(async (em) => {
      user = await em.save(user)
      await this.eventEmitter.emitAsync(
        UserEvents.CREATED,
        new UserCreatedEvent(em, user, createUserDto.personalOrganizationQuota),
      )
    })

    return user
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findByIds(ids: string[]): Promise<User[]> {
    if (ids.length === 0) {
      return []
    }

    return this.userRepository.find({
      where: {
        id: In(ids),
      },
    })
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } })
  }

  async findOneByEmail(email: string, ignoreCase = false): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: ignoreCase ? ILike(email) : email,
      },
    })
  }

  async remove(id: string): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      await em.delete(User, id)
      await this.eventEmitter.emitAsync(UserEvents.DELETED, new UserDeletedEvent(em, id))
    })
  }

  async regenerateKeyPair(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id })
    const keyPair = await this.generatePrivateKey()
    user.keyPair = keyPair
    return this.userRepository.save(user)
  }

  private generatePrivateKey(): Promise<UserSSHKeyPair> {
    const comment = 'daytona'

    return new Promise((resolve, reject) => {
      crypto.generateKeyPair(
        'rsa',
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        },
        (error, publicKey, privateKey) => {
          if (error) {
            reject(error)
          } else {
            const publicKeySShEncoded = forge.ssh.publicKeyToOpenSSH(forge.pki.publicKeyFromPem(publicKey), comment)

            const privateKeySShEncoded = forge.ssh.privateKeyToOpenSSH(forge.pki.privateKeyFromPem(privateKey))

            resolve({
              publicKey: publicKeySShEncoded,
              privateKey: privateKeySShEncoded,
            })
          }
        },
      )
    })
  }

  // TODO: discuss if we need separate methods for updating specific fields
  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`)
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email
    }

    if (updateUserDto.role) {
      user.role = updateUserDto.role
    }

    if (updateUserDto.emailVerified) {
      user.emailVerified = updateUserDto.emailVerified
      await this.dataSource.transaction(async (em) => {
        await em.save(user)
        await this.eventEmitter.emitAsync(UserEvents.EMAIL_VERIFIED, new UserEmailVerifiedEvent(em, user.id))
      })
    }

    return this.userRepository.save(user)
  }

  // Credential Management Methods

  async createWithPassword(
    email: string,
    password: string,
    name: string,
    username?: string,
    emailVerified = false,
  ): Promise<User> {
    // Check if user already exists by email
    const existingUser = await this.findOneByEmail(email, true)
    if (existingUser) {
      throw new BadRequestException('User with this email already exists')
    }

    // Check if username is already taken
    if (username) {
      const existingUsername = await this.userRepository.findOne({
        where: { username },
      })
      if (existingUsername) {
        throw new BadRequestException('Username is already taken')
      }

      // Validate username format (alphanumeric, underscore, hyphen, 3-30 chars)
      const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/
      if (!usernameRegex.test(username)) {
        throw new BadRequestException(
          'Username must be 3-30 characters long and contain only letters, numbers, underscores, and hyphens',
        )
      }
    }

    // Validate password
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long')
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user and credential in transaction
    let user: User
    await this.dataSource.transaction(async (em) => {
      user = em.create(User, {
        email: email.toLowerCase(),
        emailVerified,
        name,
        username: username?.toLowerCase() || null,
        publicKeys: [],
        keyPair: await this.generatePrivateKey(),
      })

      user = await em.save(user)

      const credential = em.create(UserCredential, {
        userId: user.id,
        passwordHash,
        requirePasswordChange: false,
      })

      await em.save(credential)

      await this.eventEmitter.emitAsync(UserEvents.CREATED, new UserCreatedEvent(em, user, undefined))
    })

    return user
  }

  async validatePassword(email: string, password: string): Promise<User> {
    const user = await this.findOneByEmail(email, true)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const credential = await this.userCredentialRepository.findOne({
      where: { userId: user.id },
    })

    if (!credential) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(password, credential.passwordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password')
    }

    return user
  }

  async validatePasswordByEmailOrUsername(emailOrUsername: string, password: string): Promise<User> {
    const normalizedInput = emailOrUsername.toLowerCase()

    // Find user by email OR username in a single query
    const user = await this.userRepository.findOne({
      where: [{ email: normalizedInput }, { username: normalizedInput }],
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const credential = await this.userCredentialRepository.findOne({
      where: { userId: user.id },
    })

    if (!credential) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, credential.passwordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const credential = await this.userCredentialRepository.findOne({
      where: { userId },
    })

    if (!credential) {
      throw new NotFoundException('User not found')
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, credential.passwordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect')
    }

    // Validate new password
    if (newPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long')
    }

    // Update password
    credential.passwordHash = await bcrypt.hash(newPassword, 10)
    credential.requirePasswordChange = false
    await this.userCredentialRepository.save(credential)
  }

  async hasCredentials(userId: string): Promise<boolean> {
    const credential = await this.userCredentialRepository.findOne({
      where: { userId },
    })
    return !!credential
  }

  async getUserWithClaims(userId: string): Promise<any> {
    const user = await this.findOne(userId)
    if (!user) {
      return null
    }

    return {
      sub: user.id,
      email: user.email,
      email_verified: user.emailVerified,
      name: user.name,
      preferred_username: user.username || user.email, // Use username if available, fallback to email
    }
  }
}
