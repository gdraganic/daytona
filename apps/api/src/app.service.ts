/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'
import { DockerRegistryService } from './docker-registry/services/docker-registry.service'
import { RegistryType } from './docker-registry/enums/registry-type.enum'
import { OrganizationService } from './organization/services/organization.service'
import { UserService } from './user/user.service'
import { ApiKeyService } from './api-key/api-key.service'
import { EventEmitterReadinessWatcher } from '@nestjs/event-emitter'
import { SnapshotService } from './sandbox/services/snapshot.service'
import { SystemRole } from './user/enums/system-role.enum'
import { TypedConfigService } from './config/typed-config.service'
import { SchedulerRegistry } from '@nestjs/schedule'
import * as crypto from 'crypto'

@Injectable()
export class AppService implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger(AppService.name)

  constructor(
    private readonly dockerRegistryService: DockerRegistryService,
    private readonly configService: TypedConfigService,
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
    private readonly apiKeyService: ApiKeyService,
    private readonly eventEmitterReadinessWatcher: EventEmitterReadinessWatcher,
    private readonly snapshotService: SnapshotService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Received shutdown signal: ${signal}. Shutting down gracefully...`)
    await this.stopAllCronJobs()
  }

  async onApplicationBootstrap() {
    if (this.configService.get('disableCronJobs') || this.configService.get('maintananceMode')) {
      await this.stopAllCronJobs()
    }

    await this.initializeAdminUser()
    await this.initializeTransientRegistry()
    await this.initializeBackupRegistry()
    await this.initializeInternalRegistry()
    await this.initializeDefaultSnapshot()
  }

  private async stopAllCronJobs(): Promise<void> {
    for (const cronName of this.schedulerRegistry.getCronJobs().keys()) {
      this.logger.debug(`Stopping cron job: ${cronName}`)
      this.schedulerRegistry.deleteCronJob(cronName)
    }
  }

  private async initializeAdminUser(): Promise<void> {
    const adminUsername = this.configService.get('security.admin.user')

    // Check if admin user already exists by username
    const existingAdmin = await this.userService['userRepository'].findOne({
      where: { username: adminUsername },
    })

    if (existingAdmin) {
      return
    }

    await this.eventEmitterReadinessWatcher.waitUntilReady()

    const adminPassword =
      this.configService.get('security.admin.password') ||
      // Auto-generate secure password if not provided (32 random bytes as base64, alphanumeric only)
      crypto
        .randomBytes(24)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, 32)

    this.logger.log('Creating admin user with username and password...')
    const user = await this.userService.createWithPassword(
      `${adminUsername}@daytona.local`,
      adminPassword,
      'Daytona Admin',
      adminUsername,
      true,
    )

    // Set admin role
    await this.userService.update(user.id, {
      role: SystemRole.ADMIN,
    })

    const personalOrg = await this.organizationService.findPersonal(user.id)
    const { value } = await this.apiKeyService.createApiKey(personalOrg.id, user.id, `${adminUsername}-api-key`, [])

    this.logger.log(
      `
=========================================
=========================================
Admin user created:
  Username: ${adminUsername}
  Password: ${adminPassword}
  API Key: ${value}
=========================================
=========================================`,
    )
  }

  private async initializeTransientRegistry(): Promise<void> {
    const existingRegistry = await this.dockerRegistryService.getDefaultTransientRegistry()
    if (existingRegistry) {
      return
    }

    const registryUrl = this.configService.getOrThrow('transientRegistry.url')
    const registryAdmin = this.configService.getOrThrow('transientRegistry.admin')
    const registryPassword = this.configService.getOrThrow('transientRegistry.password')
    const registryProjectId = this.configService.getOrThrow('transientRegistry.projectId')

    if (!registryUrl || !registryAdmin || !registryPassword || !registryProjectId) {
      this.logger.warn('Registry configuration not found, skipping transient registry setup')
      return
    }

    this.logger.log('Initializing default transient registry...')

    await this.dockerRegistryService.create({
      name: 'Transient Registry',
      url: registryUrl,
      username: registryAdmin,
      password: registryPassword,
      project: registryProjectId,
      registryType: RegistryType.TRANSIENT,
      isDefault: true,
    })

    this.logger.log('Default transient registry initialized successfully')
  }

  private async initializeInternalRegistry(): Promise<void> {
    const existingRegistry = await this.dockerRegistryService.getDefaultInternalRegistry()
    if (existingRegistry) {
      return
    }

    const registryUrl = this.configService.getOrThrow('internalRegistry.url')
    const registryAdmin = this.configService.getOrThrow('internalRegistry.admin')
    const registryPassword = this.configService.getOrThrow('internalRegistry.password')
    const registryProjectId = this.configService.getOrThrow('internalRegistry.projectId')

    if (!registryUrl || !registryAdmin || !registryPassword || !registryProjectId) {
      this.logger.warn('Registry configuration not found, skipping internal registry setup')
      return
    }

    this.logger.log('Initializing default internal registry...')

    await this.dockerRegistryService.create({
      name: 'Internal Registry',
      url: registryUrl,
      username: registryAdmin,
      password: registryPassword,
      project: registryProjectId,
      registryType: RegistryType.INTERNAL,
      isDefault: true,
    })

    this.logger.log('Default internal registry initialized successfully')
  }

  private async initializeBackupRegistry(): Promise<void> {
    const existingRegistry = await this.dockerRegistryService.getAvailableBackupRegistry(
      this.configService.getOrThrow('defaultRegion'),
    )
    if (existingRegistry) {
      return
    }

    const registryUrl = this.configService.getOrThrow('internalRegistry.url')
    const registryAdmin = this.configService.getOrThrow('internalRegistry.admin')
    const registryPassword = this.configService.getOrThrow('internalRegistry.password')
    const registryProjectId = this.configService.getOrThrow('internalRegistry.projectId')

    if (!registryUrl || !registryAdmin || !registryPassword || !registryProjectId) {
      this.logger.warn('Registry configuration not found, skipping backup registry setup')
      return
    }

    this.logger.log('Initializing default backup registry...')

    await this.dockerRegistryService.create(
      {
        name: 'Backup Registry',
        url: registryUrl,
        username: registryAdmin,
        password: registryPassword,
        project: registryProjectId,
        registryType: RegistryType.BACKUP,
        isDefault: true,
      },
      undefined,
      true,
    )

    this.logger.log('Default backup registry initialized successfully')
  }

  private async initializeDefaultSnapshot(): Promise<void> {
    const adminUsername = this.configService.get('security.admin.user')

    // Find admin user by username
    const adminUser = await this.userService['userRepository'].findOne({
      where: { username: adminUsername },
    })

    if (!adminUser) {
      this.logger.warn('Admin user not found, skipping default snapshot initialization')
      return
    }

    const adminPersonalOrg = await this.organizationService.findPersonal(adminUser.id)

    try {
      const existingSnapshot = await this.snapshotService.getSnapshotByName(
        this.configService.getOrThrow('defaultSnapshot'),
        adminPersonalOrg.id,
      )
      if (existingSnapshot) {
        return
      }
    } catch {
      this.logger.log('Default snapshot not found, creating...')
    }

    const defaultSnapshot = this.configService.getOrThrow('defaultSnapshot')

    await this.snapshotService.createSnapshot(
      adminPersonalOrg,
      {
        name: defaultSnapshot,
        imageName: defaultSnapshot,
      },
      true,
    )

    this.logger.log('Default snapshot created successfully')
  }
}
