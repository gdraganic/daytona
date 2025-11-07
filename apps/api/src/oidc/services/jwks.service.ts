/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Jwks } from '../entities/jwks.entity'
import { generateKeyPair, exportJWK } from 'jose'

@Injectable()
export class JwksService implements OnModuleInit {
  // Advisory lock ID for JWKS initialization (arbitrary number)
  private readonly JWKS_LOCK_ID = 1234567890

  constructor(
    @InjectRepository(Jwks)
    private readonly jwksRepository: Repository<Jwks>,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    // Eagerly initialize keys on startup (fail fast if generation fails)
    await this.getOrGenerateKeys()
  }

  async getOrGenerateKeys(): Promise<any> {
    // TODO: Add in-memory cache to avoid DB queries on every call
    // private keysCache: { keys: any[] } | null = null
    // Try to get existing active keys (fast path - no lock needed)
    const existingKeys = await this.jwksRepository.find({ where: { active: true } })

    if (existingKeys.length > 0) {
      // TODO: Cache this parsed result to avoid JSON.parse on every call
      return {
        keys: existingKeys.map((k) => JSON.parse(k.keyData)),
      }
    }

    // No keys exist - need to generate (with lock to prevent race condition)
    return await this.dataSource.transaction(async (entityManager) => {
      // Acquire advisory lock (blocks other instances from concurrent initialization)
      await entityManager.query('SELECT pg_advisory_xact_lock($1)', [this.JWKS_LOCK_ID])

      // Check again inside the transaction (another instance might have created keys)
      const existingKeys = await entityManager.find(Jwks, { where: { active: true } })

      if (existingKeys.length > 0) {
        // TODO: Cache this parsed result to avoid JSON.parse on every call
        return {
          keys: existingKeys.map((k) => JSON.parse(k.keyData)),
        }
      }

      // Generate new RSA key pair
      const { privateKey } = await generateKeyPair('RS256')

      // Export as JWK (with private key components)
      const jwk = await exportJWK(privateKey)

      // Add metadata
      const kid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      jwk.kid = kid
      jwk.alg = 'RS256'
      jwk.use = 'sig'

      // Store in database
      const jwksEntity = entityManager.create(Jwks, {
        kid,
        keyData: JSON.stringify(jwk),
        active: true,
        isPrimary: true,
      })

      await entityManager.save(jwksEntity)

      return {
        keys: [jwk],
      }
    })
    // Lock is automatically released when transaction ends
  }
}
