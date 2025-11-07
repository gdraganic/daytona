/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Adapter, AdapterPayload } from 'oidc-provider'
import { Repository } from 'typeorm'
import { OidcModel } from './entities/oidc-model.entity'

/**
 * TypeORM-based adapter for oidc-provider
 * Stores all OIDC interactions, sessions, tokens, etc. in the database
 */
export class OidcAdapter implements Adapter {
  private modelRepository: Repository<OidcModel>
  private modelName: string

  constructor(modelName: string, modelRepository: Repository<OidcModel>) {
    this.modelName = modelName
    this.modelRepository = modelRepository
  }

  async upsert(id: string, payload: AdapterPayload, expiresIn: number): Promise<void> {
    const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null

    await this.modelRepository
      .createQueryBuilder()
      .insert()
      .into('oidc_model')
      .values({
        id,
        type: this.modelName,
        payload: JSON.stringify(payload),
        grantId: payload.grantId,
        userCode: payload.userCode,
        uid: payload.uid,
        expiresAt,
      })
      .orUpdate(['payload', 'grantId', 'userCode', 'uid', 'expiresAt'], ['id', 'type'])
      .execute()
  }

  async find(id: string): Promise<AdapterPayload | undefined> {
    const result = await this.modelRepository
      .createQueryBuilder('model')
      .where('model.id = :id', { id })
      .andWhere('model.type = :type', { type: this.modelName })
      .getOne()

    if (!result) {
      return undefined
    }

    // Check if expired
    if (result.expiresAt && result.expiresAt < new Date()) {
      return undefined
    }

    return JSON.parse(result.payload)
  }

  async findByUserCode(userCode: string): Promise<AdapterPayload | undefined> {
    const result = await this.modelRepository
      .createQueryBuilder('model')
      .where('model.userCode = :userCode', { userCode })
      .andWhere('model.type = :type', { type: this.modelName })
      .getOne()

    if (!result) {
      return undefined
    }

    // Check if expired
    if (result.expiresAt && result.expiresAt < new Date()) {
      return undefined
    }

    return JSON.parse(result.payload)
  }

  async findByUid(uid: string): Promise<AdapterPayload | undefined> {
    const result = await this.modelRepository
      .createQueryBuilder('model')
      .where('model.uid = :uid', { uid })
      .andWhere('model.type = :type', { type: this.modelName })
      .getOne()

    if (!result) {
      return undefined
    }

    // Check if expired
    if (result.expiresAt && result.expiresAt < new Date()) {
      return undefined
    }

    return JSON.parse(result.payload)
  }

  async consume(id: string): Promise<void> {
    await this.modelRepository
      .createQueryBuilder()
      .update('oidc_model')
      .set({ consumedAt: new Date() })
      .where('id = :id', { id })
      .andWhere('type = :type', { type: this.modelName })
      .execute()
  }

  async destroy(id: string): Promise<void> {
    await this.modelRepository
      .createQueryBuilder()
      .delete()
      .from('oidc_model')
      .where('id = :id', { id })
      .andWhere('type = :type', { type: this.modelName })
      .execute()
  }

  async revokeByGrantId(grantId: string): Promise<void> {
    await this.modelRepository
      .createQueryBuilder()
      .delete()
      .from('oidc_model')
      .where('grantId = :grantId', { grantId })
      .andWhere('type = :type', { type: this.modelName })
      .execute()
  }
}

/**
 * Factory function to create adapter instances
 * Required by oidc-provider to create different adapter instances per model type
 */
export function createOidcAdapterFactory(modelRepository: Repository<OidcModel>) {
  return (modelName: string) => new OidcAdapter(modelName, modelRepository)
}
