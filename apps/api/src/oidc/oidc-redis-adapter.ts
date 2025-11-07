/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Adapter, AdapterPayload } from 'oidc-provider'
import { Redis } from 'ioredis'

/**
 * Redis-based adapter for oidc-provider
 * Optimized for ephemeral, high-frequency access OIDC data (tokens, sessions, interactions)
 */
export class OidcRedisAdapter implements Adapter {
  private redis: Redis
  private modelName: string

  constructor(modelName: string, redis: Redis) {
    this.modelName = modelName
    this.redis = redis
  }

  /**
   * Generate Redis key for a specific model instance
   */
  private key(id: string): string {
    return `oidc:${this.modelName}:${id}`
  }

  /**
   * Generate Redis key for secondary indexes
   */
  private indexKey(field: string, value: string): string {
    return `oidc:${this.modelName}:${field}:${value}`
  }

  /**
   * Upsert a model instance with automatic TTL
   */
  async upsert(id: string, payload: AdapterPayload, expiresIn: number): Promise<void> {
    const key = this.key(id)
    const data = JSON.stringify(payload)

    // Store the main payload
    if (expiresIn > 0) {
      await this.redis.setex(key, expiresIn, data)
    } else {
      await this.redis.set(key, data)
    }

    // Create secondary indexes for efficient lookups
    if (payload.grantId) {
      const grantKey = this.indexKey('grantId', payload.grantId)
      await this.redis.sadd(grantKey, id)
      if (expiresIn > 0) {
        await this.redis.expire(grantKey, expiresIn)
      }
    }

    if (payload.userCode) {
      const userCodeKey = this.indexKey('userCode', payload.userCode)
      await this.redis.setex(userCodeKey, expiresIn, id)
    }

    if (payload.uid) {
      const uidKey = this.indexKey('uid', payload.uid)
      await this.redis.setex(uidKey, expiresIn, id)
    }
  }

  /**
   * Find a model instance by ID
   */
  async find(id: string): Promise<AdapterPayload | undefined> {
    const data = await this.redis.get(this.key(id))
    if (!data) {
      return undefined
    }

    try {
      return JSON.parse(data)
    } catch {
      return undefined
    }
  }

  /**
   * Find by user code (for device flow)
   */
  async findByUserCode(userCode: string): Promise<AdapterPayload | undefined> {
    const id = await this.redis.get(this.indexKey('userCode', userCode))
    if (!id) {
      return undefined
    }
    return this.find(id)
  }

  /**
   * Find by UID (for interactions)
   */
  async findByUid(uid: string): Promise<AdapterPayload | undefined> {
    const id = await this.redis.get(this.indexKey('uid', uid))
    if (!id) {
      return undefined
    }
    return this.find(id)
  }

  /**
   * Consume a token (mark as used)
   */
  async consume(id: string): Promise<void> {
    const data = await this.find(id)
    if (!data) {
      return
    }

    data.consumed = Math.floor(Date.now() / 1000)
    const ttl = await this.redis.ttl(this.key(id))
    if (ttl > 0) {
      await this.redis.setex(this.key(id), ttl, JSON.stringify(data))
    } else {
      await this.redis.set(this.key(id), JSON.stringify(data))
    }
  }

  /**
   * Destroy a model instance and its indexes
   */
  async destroy(id: string): Promise<void> {
    const data = await this.find(id)
    const key = this.key(id)

    // Remove from secondary indexes
    if (data) {
      if (data.grantId) {
        await this.redis.srem(this.indexKey('grantId', data.grantId), id)
      }
      if (data.userCode) {
        await this.redis.del(this.indexKey('userCode', data.userCode))
      }
      if (data.uid) {
        await this.redis.del(this.indexKey('uid', data.uid))
      }
    }

    // Remove the main key
    await this.redis.del(key)
  }

  /**
   * Revoke all tokens associated with a grant
   */
  async revokeByGrantId(grantId: string): Promise<void> {
    const grantKey = this.indexKey('grantId', grantId)
    const ids = await this.redis.smembers(grantKey)

    if (ids.length > 0) {
      // Delete all tokens in this grant
      const keys = ids.map((id) => this.key(id))
      await this.redis.del(...keys)

      // Delete the grant index
      await this.redis.del(grantKey)
    }
  }
}
