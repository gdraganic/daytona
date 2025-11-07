/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Adapter, AdapterPayload } from 'oidc-provider'
import { Redis } from 'ioredis'
import { Repository } from 'typeorm'
import { OidcModel } from './entities/oidc-model.entity'
import { OidcRedisAdapter } from './oidc-redis-adapter'
import { OidcAdapter } from './oidc-adapter'

/**
 * Hybrid adapter that routes OIDC model types to either Redis or PostgreSQL
 * with automatic fallback to PostgreSQL if Redis fails
 */
export class OidcHybridAdapter implements Adapter {
  private redisAdapter: OidcRedisAdapter | null
  private pgAdapter: OidcAdapter
  private modelName: string
  private useRedis: boolean

  // Ephemeral model types that should use Redis for better performance
  private static readonly EPHEMERAL_TYPES = new Set([
    'Session',
    'AccessToken',
    'AuthorizationCode',
    'RefreshToken',
    'Interaction',
    'DeviceCode',
    'BackchannelAuthenticationRequest',
  ])

  constructor(modelName: string, redis: Redis | null, pgRepository: Repository<OidcModel>) {
    this.modelName = modelName
    this.pgAdapter = new OidcAdapter(modelName, pgRepository)

    // Only use Redis for ephemeral types if Redis is available
    this.useRedis = redis !== null && OidcHybridAdapter.EPHEMERAL_TYPES.has(modelName)
    this.redisAdapter = this.useRedis ? new OidcRedisAdapter(modelName, redis!) : null
  }

  /**
   * Execute operation with Redis, fallback to PostgreSQL on failure
   */
  private async withFallback<T>(redisOp: () => Promise<T>, pgOp: () => Promise<T>, logContext: string): Promise<T> {
    if (!this.useRedis || !this.redisAdapter) {
      return pgOp()
    }

    try {
      return await redisOp()
    } catch (error) {
      // Log Redis failure and fallback to PostgreSQL
      console.warn(
        `[OidcHybridAdapter] Redis ${logContext} failed for ${this.modelName}, falling back to PostgreSQL:`,
        error,
      )
      return pgOp()
    }
  }

  async upsert(id: string, payload: AdapterPayload, expiresIn: number): Promise<void> {
    return this.withFallback(
      () => this.redisAdapter!.upsert(id, payload, expiresIn),
      () => this.pgAdapter.upsert(id, payload, expiresIn),
      'upsert',
    )
  }

  async find(id: string): Promise<AdapterPayload | undefined> {
    return this.withFallback(
      () => this.redisAdapter!.find(id),
      () => this.pgAdapter.find(id),
      'find',
    )
  }

  async findByUserCode(userCode: string): Promise<AdapterPayload | undefined> {
    return this.withFallback(
      () => this.redisAdapter!.findByUserCode(userCode),
      () => this.pgAdapter.findByUserCode(userCode),
      'findByUserCode',
    )
  }

  async findByUid(uid: string): Promise<AdapterPayload | undefined> {
    return this.withFallback(
      () => this.redisAdapter!.findByUid(uid),
      () => this.pgAdapter.findByUid(uid),
      'findByUid',
    )
  }

  async consume(id: string): Promise<void> {
    return this.withFallback(
      () => this.redisAdapter!.consume(id),
      () => this.pgAdapter.consume(id),
      'consume',
    )
  }

  async destroy(id: string): Promise<void> {
    return this.withFallback(
      () => this.redisAdapter!.destroy(id),
      () => this.pgAdapter.destroy(id),
      'destroy',
    )
  }

  async revokeByGrantId(grantId: string): Promise<void> {
    return this.withFallback(
      () => this.redisAdapter!.revokeByGrantId(grantId),
      () => this.pgAdapter.revokeByGrantId(grantId),
      'revokeByGrantId',
    )
  }
}

/**
 * Factory function to create hybrid adapter instances
 * @param redis Redis instance (null to disable Redis optimization)
 * @param pgRepository PostgreSQL repository for fallback and persistent storage
 */
export function createOidcHybridAdapterFactory(redis: Redis | null, pgRepository: Repository<OidcModel>) {
  return (modelName: string) => new OidcHybridAdapter(modelName, redis, pgRepository)
}
