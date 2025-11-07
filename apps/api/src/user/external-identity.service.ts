/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExternalIdentity } from './external-identity.entity'

@Injectable()
export class ExternalIdentityService {
  private readonly logger = new Logger(ExternalIdentityService.name)

  constructor(
    @InjectRepository(ExternalIdentity)
    private readonly externalIdentityRepository: Repository<ExternalIdentity>,
  ) {}

  async findByProvider(provider: string, providerUserId: string): Promise<ExternalIdentity | null> {
    this.logger.debug(`findByProvider called with provider: "${provider}", providerUserId: "${providerUserId}"`)
    const result = await this.externalIdentityRepository.findOne({
      where: { provider, providerUserId },
      relations: ['user'],
    })
    this.logger.debug(`findByProvider result: ${result ? `Found (userId: ${result.userId})` : 'Not found'}`)
    return result
  }

  async findByUserId(userId: string): Promise<ExternalIdentity[]> {
    return this.externalIdentityRepository.find({
      where: { userId },
    })
  }

  async findByProviderEmail(provider: string, email: string): Promise<ExternalIdentity | null> {
    return this.externalIdentityRepository.findOne({
      where: { provider, providerEmail: email },
      relations: ['user'],
    })
  }

  async create(data: {
    provider: string
    providerUserId: string
    userId: string
    providerUsername?: string
    providerEmail?: string
    providerData?: Record<string, any>
  }): Promise<ExternalIdentity> {
    const externalIdentity = this.externalIdentityRepository.create(data)
    return this.externalIdentityRepository.save(externalIdentity)
  }

  async update(
    provider: string,
    providerUserId: string,
    data: {
      providerUsername?: string
      providerEmail?: string
      providerData?: Record<string, any>
    },
  ): Promise<ExternalIdentity> {
    await this.externalIdentityRepository.update({ provider, providerUserId }, data)
    const updated = await this.externalIdentityRepository.findOne({
      where: { provider, providerUserId },
    })
    if (!updated) {
      throw new Error('External identity not found')
    }
    return updated
  }

  async remove(provider: string, providerUserId: string): Promise<void> {
    await this.externalIdentityRepository.delete({ provider, providerUserId })
  }

  async linkToUser(
    provider: string,
    providerUserId: string,
    userId: string,
    providerUsername?: string,
    providerEmail?: string,
    providerData?: Record<string, any>,
  ): Promise<ExternalIdentity> {
    this.logger.debug(
      `linkToUser called: provider="${provider}", providerUserId="${providerUserId}", userId="${userId}"`,
    )

    // Check if this external identity already exists
    const existing = await this.findByProvider(provider, providerUserId)
    if (existing) {
      this.logger.debug(`External identity already exists, updating...`)
      // Update the existing link
      return this.update(provider, providerUserId, {
        providerUsername,
        providerEmail,
        providerData,
      })
    }

    // Create new link
    this.logger.debug(`Creating new external identity link...`)
    const created = await this.create({
      provider,
      providerUserId,
      userId,
      providerUsername,
      providerEmail,
      providerData,
    })
    this.logger.debug(
      `External identity created successfully: provider="${created.provider}", providerUserId="${created.providerUserId}", userId="${created.userId}"`,
    )
    return created
  }
}
