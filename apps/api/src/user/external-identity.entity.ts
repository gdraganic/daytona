/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class ExternalIdentity {
  @PrimaryColumn()
  provider: string // 'github', 'google', 'gitlab', etc.

  @PrimaryColumn()
  providerUserId: string // External user ID from the provider

  @Column()
  userId: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Column({ nullable: true })
  providerUsername: string // Username from the provider

  @Column({ nullable: true })
  providerEmail: string // Email from the provider

  @Column({ type: 'simple-json', nullable: true })
  providerData: Record<string, any> // Additional data from provider

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date
}
