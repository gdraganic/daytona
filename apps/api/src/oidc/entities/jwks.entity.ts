/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

@Entity()
export class Jwks {
  @PrimaryColumn()
  kid: string // Key ID

  @Column({ type: 'text' })
  keyData: string // JSON stringified JWK (including private key components)

  @Column({ default: true })
  active: boolean

  @Column({ default: false })
  @Index({ unique: true, where: '"isPrimary" = true' }) // Only one primary key can exist
  isPrimary: boolean

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date
}
