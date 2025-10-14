/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { randomUUID } from 'crypto'

import { SandboxState } from '../enums/sandbox-state.enum'
import { SandboxDesiredState } from '../enums/sandbox-desired-state.enum'

import { LockCode } from '../common/redis-lock.provider'

import { RedisLockProvider } from '../common/redis-lock.provider'
import { SandboxService } from '../services/sandbox.service'

import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter'
import { SandboxEvents } from '../constants/sandbox-events.constants'
import { SandboxStoppedEvent } from '../events/sandbox-stopped.event'
import { SandboxStartedEvent } from '../events/sandbox-started.event'
import { SandboxArchivedEvent } from '../events/sandbox-archived.event'
import { SandboxDestroyedEvent } from '../events/sandbox-destroyed.event'
import { SandboxCreatedEvent } from '../events/sandbox-create.event'

import { WithInstrumentation } from '../../common/decorators/otel.decorator'

import { SandboxStartAction } from './sandbox-actions/sandbox-start.action'
import { SandboxStopAction } from './sandbox-actions/sandbox-stop.action'
import { SandboxDestroyAction } from './sandbox-actions/sandbox-destroy.action'
import { SandboxArchiveAction } from './sandbox-actions/sandbox-archive.action'
import { SYNC_AGAIN, DONT_SYNC_AGAIN } from './sandbox-actions/sandbox.action'

import { TrackJobExecution } from '../../common/decorators/track-job-execution.decorator'
import { TrackableJobExecutions } from '../../common/interfaces/trackable-job-executions'
import { setTimeout } from 'timers/promises'
import { LogExecution } from '../../common/decorators/log-execution.decorator'
import { getStateChangeLockKey } from '../utils/lock-key.util'
import { TypedConfigService } from '../../config/typed-config.service'

@Injectable()
export class SandboxManager implements TrackableJobExecutions, OnApplicationShutdown {
  activeJobs = new Set<string>()

  private readonly logger = new Logger(SandboxManager.name)

  constructor(
    private readonly redisLockProvider: RedisLockProvider,
    private readonly sandboxStartAction: SandboxStartAction,
    private readonly sandboxStopAction: SandboxStopAction,
    private readonly sandboxDestroyAction: SandboxDestroyAction,
    private readonly sandboxArchiveAction: SandboxArchiveAction,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: TypedConfigService,
    private readonly sandboxService: SandboxService,
  ) {}

  async onApplicationShutdown() {
    //  wait for all active jobs to finish
    while (this.activeJobs.size > 0) {
      this.logger.log(`Waiting for ${this.activeJobs.size} active jobs to finish`)
      await setTimeout(1000)
    }
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'auto-stop-check' })
  @TrackJobExecution()
  @WithInstrumentation()
  @LogExecution('auto-stop-check')
  @WithInstrumentation()
  async autostopCheck(): Promise<void> {
    const lockKey = 'auto-stop-check-worker-selected'
    //  lock the sync to only run one instance at a time
    if (!(await this.redisLockProvider.lock(lockKey, 60))) {
      return
    }

    try {
      await this.sandboxService.handleAutoStopCheck()
    } finally {
      await this.redisLockProvider.unlock(lockKey)
    }
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'auto-archive-check' })
  @TrackJobExecution()
  @LogExecution('auto-archive-check')
  @WithInstrumentation()
  async autoArchiveCheck(): Promise<void> {
    const lockKey = 'auto-archive-check-worker-selected'
    //  lock the sync to only run one instance at a time
    if (!(await this.redisLockProvider.lock(lockKey, 60))) {
      return
    }

    try {
      await this.sandboxService.handleAutoArchiveCheck()
    } finally {
      await this.redisLockProvider.unlock(lockKey)
    }
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'auto-delete-check' })
  @TrackJobExecution()
  @LogExecution('auto-delete-check')
  @WithInstrumentation()
  async autoDeleteCheck(): Promise<void> {
    const lockKey = 'auto-delete-check-worker-selected'
    //  lock the sync to only run one instance at a time
    if (!(await this.redisLockProvider.lock(lockKey, 60))) {
      return
    }

    try {
      await this.sandboxService.handleAutoDeleteCheck()
    } finally {
      await this.redisLockProvider.unlock(lockKey)
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'sync-states' })
  @TrackJobExecution()
  @WithInstrumentation()
  @LogExecution('sync-states')
  async syncStates(): Promise<void> {
    const globalLockKey = 'sync-states'
    if (!(await this.redisLockProvider.lock(globalLockKey, 30))) {
      return
    }

    try {
      const sandboxIds = await this.sandboxService.findSandboxesForSync(100)
      const pendingProcesses: Promise<void>[] = []

      for (const sandboxId of sandboxIds) {
        const processPromise = this.syncInstanceState(sandboxId)
        pendingProcesses.push(processPromise)

        // Limit concurrent processing to avoid overwhelming the system
        if (pendingProcesses.length >= 10) {
          await Promise.all(pendingProcesses.splice(0, pendingProcesses.length))
        }
      }

      // Wait for remaining processes
      if (pendingProcesses.length > 0) {
        await Promise.all(pendingProcesses)
      }
    } finally {
      await this.redisLockProvider.unlock(globalLockKey)
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'sync-archived-desired-states' })
  @TrackJobExecution()
  @LogExecution('sync-archived-desired-states')
  @WithInstrumentation()
  async syncArchivedDesiredStates(): Promise<void> {
    const lockKey = 'sync-archived-desired-states'
    if (!(await this.redisLockProvider.lock(lockKey, 30))) {
      return
    }

    const sandboxes = await this.sandboxService.findArchivedDesiredStateSandboxes()

    await Promise.all(
      sandboxes.map(async (sandbox) => {
        this.syncInstanceState(sandbox.id)
      }),
    )
    await this.redisLockProvider.unlock(lockKey)
  }

  async syncInstanceState(sandboxId: string, startedAt = new Date()): Promise<void> {
    // If syncing for longer than 10 seconds, return
    // The sandbox will be continued in the next cron run
    // This prevents endless loops of syncing the same sandbox
    if (new Date().getTime() - startedAt.getTime() > 10000) {
      return
    }

    //  generate a random lock code to prevent race condition if sandbox action continues
    //  after the lock expires
    const lockCode = new LockCode(randomUUID())

    //  prevent syncState cron from running multiple instances of the same sandbox
    const lockKey = getStateChangeLockKey(sandboxId)
    const acquired = await this.redisLockProvider.lock(lockKey, 30, lockCode)
    if (!acquired) {
      return
    }

    const sandbox = await this.sandboxService.getSandboxForReconciler(sandboxId)

    if ([SandboxState.DESTROYED, SandboxState.ERROR, SandboxState.BUILD_FAILED].includes(sandbox.state)) {
      await this.redisLockProvider.unlock(lockKey)
      return
    }

    //  prevent potential race condition, or SYNC_AGAIN loop bug
    //  this should never happen
    if (String(sandbox.state) === String(sandbox.desiredState)) {
      this.logger.warn(`Sandbox ${sandboxId} is already in the desired state ${sandbox.desiredState}, skipping sync`)
      await this.redisLockProvider.unlock(lockKey)
      return
    }

    let syncState = DONT_SYNC_AGAIN

    try {
      switch (sandbox.desiredState) {
        case SandboxDesiredState.STARTED: {
          syncState = await this.sandboxStartAction.run(sandbox, lockCode)
          break
        }
        case SandboxDesiredState.STOPPED: {
          syncState = await this.sandboxStopAction.run(sandbox, lockCode)
          break
        }
        case SandboxDesiredState.DESTROYED: {
          syncState = await this.sandboxDestroyAction.run(sandbox, lockCode)
          break
        }
        case SandboxDesiredState.ARCHIVED: {
          syncState = await this.sandboxArchiveAction.run(sandbox, lockCode)
          break
        }
      }
    } catch (error) {
      this.logger.error(`Error processing desired state for sandbox ${sandboxId}:`, error)

      try {
        await this.sandboxService.markSandboxAsError(sandboxId, error.message || String(error))
      } catch (updateError) {
        // Sandbox might have been deleted, ignore error
        this.logger.warn(`Failed to mark sandbox ${sandboxId} as error:`, updateError)
      }
    }

    await this.redisLockProvider.unlock(lockKey)
    if (syncState === SYNC_AGAIN) {
      this.syncInstanceState(sandboxId, startedAt)
    }
  }

  @OnEvent(SandboxEvents.ARCHIVED)
  @TrackJobExecution()
  private async handleSandboxArchivedEvent(event: SandboxArchivedEvent) {
    this.syncInstanceState(event.sandbox.id).catch(this.logger.error)
  }

  @OnEvent(SandboxEvents.DESTROYED)
  @TrackJobExecution()
  private async handleSandboxDestroyedEvent(event: SandboxDestroyedEvent) {
    this.syncInstanceState(event.sandbox.id).catch(this.logger.error)
  }

  @OnEvent(SandboxEvents.STARTED)
  @TrackJobExecution()
  private async handleSandboxStartedEvent(event: SandboxStartedEvent) {
    this.syncInstanceState(event.sandbox.id).catch(this.logger.error)
  }

  @OnEvent(SandboxEvents.STOPPED)
  @TrackJobExecution()
  private async handleSandboxStoppedEvent(event: SandboxStoppedEvent) {
    this.syncInstanceState(event.sandbox.id).catch(this.logger.error)
  }

  @OnEvent(SandboxEvents.CREATED)
  @TrackJobExecution()
  private async handleSandboxCreatedEvent(event: SandboxCreatedEvent) {
    this.syncInstanceState(event.sandbox.id).catch(this.logger.error)
  }
}
