/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { LessThan, Repository } from 'typeorm'
import { OidcModel } from '../entities/oidc-model.entity'

@Injectable()
export class OidcCleanupService {
  private readonly logger = new Logger(OidcCleanupService.name)

  constructor(
    @InjectRepository(OidcModel)
    private readonly oidcModelRepository: Repository<OidcModel>,
  ) {}

  /**
   * Cleanup expired OIDC models (sessions, tokens, interactions, etc.)
   * Runs every hour to remove expired entries and keep the database clean
   */
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredModels() {
    try {
      const result = await this.oidcModelRepository.delete({
        expiresAt: LessThan(new Date()),
      })

      if (result.affected && result.affected > 0) {
        this.logger.log(`Cleaned up ${result.affected} expired OIDC model(s)`)
      }
    } catch (error) {
      this.logger.error(`Failed to cleanup expired OIDC models: ${error.message}`, error.stack)
    }
  }

  /**
   * Cleanup consumed authorization codes and access tokens
   * These are marked as consumed but may not have expired yet
   * Runs daily to keep the table size manageable
   */
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async cleanupConsumedModels() {
    try {
      // Clean up consumed authorization codes and access tokens older than 1 hour
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

      const result = await this.oidcModelRepository
        .createQueryBuilder()
        .delete()
        .where('consumedAt IS NOT NULL')
        .andWhere('consumedAt < :oneHourAgo', { oneHourAgo })
        .execute()

      if (result.affected && result.affected > 0) {
        this.logger.log(`Cleaned up ${result.affected} consumed OIDC model(s)`)
      }
    } catch (error) {
      this.logger.error(`Failed to cleanup consumed OIDC models: ${error.message}`, error.stack)
    }
  }
}
