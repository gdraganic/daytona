/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
@Index(['type', 'id'])
@Index(['type', 'grantId'])
@Index(['type', 'userCode'])
@Index(['type', 'uid'])
export class OidcModel {
  @PrimaryColumn()
  id: string

  @PrimaryColumn()
  type: string

  @Column({ type: 'text' })
  payload: string

  @Column({ nullable: true })
  grantId?: string

  @Column({ nullable: true })
  userCode?: string

  @Column({ nullable: true })
  uid?: string

  @Column({ type: 'timestamp with time zone', nullable: true })
  expiresAt?: Date

  @Column({ type: 'timestamp with time zone', nullable: true })
  consumedAt?: Date

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date
}
