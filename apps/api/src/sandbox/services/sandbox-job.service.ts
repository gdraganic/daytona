/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Sandbox } from '../entities/sandbox.entity'
import { SandboxState } from '../enums/sandbox-state.enum'
import { JobStatus } from '../enums/job-status.enum'
import { JobType } from '../enums/job-type.enum'
import { Job } from '../entities/job.entity'
import { BackupState } from '../enums/backup-state.enum'
import { SnapshotService } from './snapshot.service'
import { SnapshotRunnerState } from '../enums/snapshot-runner-state.enum'

/**
 * Service for handling sandbox and snapshot state updates based on job completion (v3 runners only).
 * This service listens to job status changes and updates sandbox/snapshot state accordingly.
 * Legacy v0 runners continue to use the reconciler-based approach in sandbox-actions.
 */
@Injectable()
export class SandboxJobService {
  private readonly logger = new Logger(SandboxJobService.name)

  constructor(
    @InjectRepository(Sandbox)
    private readonly sandboxRepository: Repository<Sandbox>,
    private readonly snapshotService: SnapshotService,
  ) {}

  /**
   * Handle job completion and update sandbox state accordingly.
   * Called when a job status is updated to COMPLETED or FAILED.
   */
  async handleJobCompletion(job: Job): Promise<void> {
    // Only handle completed or failed jobs
    if (job.status !== JobStatus.COMPLETED && job.status !== JobStatus.FAILED) {
      return
    }

    // Only handle sandbox-related jobs
    if (!job.resourceId) {
      return
    }

    switch (job.type) {
      case JobType.CREATE_SANDBOX:
        await this.handleCreateSandboxJobCompletion(job)
        break
      case JobType.START_SANDBOX:
        await this.handleStartSandboxJobCompletion(job)
        break
      case JobType.STOP_SANDBOX:
        await this.handleStopSandboxJobCompletion(job)
        break
      case JobType.DESTROY_SANDBOX:
        await this.handleDestroySandboxJobCompletion(job)
        break
      case JobType.PULL_SNAPSHOT:
        await this.handlePullSnapshotJobCompletion(job)
        break
      case JobType.BUILD_SNAPSHOT:
        await this.handleBuildSnapshotJobCompletion(job)
        break
      case JobType.REMOVE_SNAPSHOT:
        await this.handleRemoveSnapshotJobCompletion(job)
        break
      default:
        // Ignore other job types (backups, etc.)
        break
    }
  }

  private async handleCreateSandboxJobCompletion(job: Job): Promise<void> {
    const sandboxId = job.resourceId
    if (!sandboxId) return

    try {
      const sandbox = await this.sandboxRepository.findOne({ where: { id: sandboxId } })
      if (!sandbox) {
        this.logger.warn(`Sandbox ${sandboxId} not found for CREATE_SANDBOX job ${job.id}`)
        return
      }

      if (job.status === JobStatus.COMPLETED) {
        // Sandbox created successfully - mark as STARTED
        this.logger.log(`CREATE_SANDBOX job ${job.id} completed successfully, marking sandbox ${sandboxId} as STARTED`)
        sandbox.state = SandboxState.STARTED
        sandbox.setBackupState(BackupState.NONE)
        sandbox.errorReason = null
      } else if (job.status === JobStatus.FAILED) {
        // Sandbox creation failed - mark as ERROR
        this.logger.error(`CREATE_SANDBOX job ${job.id} failed for sandbox ${sandboxId}: ${job.errorMessage}`)
        sandbox.state = SandboxState.ERROR
        sandbox.errorReason = job.errorMessage || 'Failed to create sandbox'
      }

      await this.sandboxRepository.save(sandbox)
    } catch (error) {
      this.logger.error(`Error handling CREATE_SANDBOX job completion for sandbox ${sandboxId}:`, error)
    }
  }

  private async handleStartSandboxJobCompletion(job: Job): Promise<void> {
    const sandboxId = job.resourceId
    if (!sandboxId) return

    try {
      const sandbox = await this.sandboxRepository.findOne({ where: { id: sandboxId } })
      if (!sandbox) {
        this.logger.warn(`Sandbox ${sandboxId} not found for START_SANDBOX job ${job.id}`)
        return
      }

      if (job.status === JobStatus.COMPLETED) {
        // Sandbox started successfully
        this.logger.log(`START_SANDBOX job ${job.id} completed successfully, marking sandbox ${sandboxId} as STARTED`)
        sandbox.state = SandboxState.STARTED
        sandbox.errorReason = null
      } else if (job.status === JobStatus.FAILED) {
        // Sandbox start failed - mark as ERROR
        this.logger.error(`START_SANDBOX job ${job.id} failed for sandbox ${sandboxId}: ${job.errorMessage}`)
        sandbox.state = SandboxState.ERROR
        sandbox.errorReason = job.errorMessage || 'Failed to start sandbox'
      }

      await this.sandboxRepository.save(sandbox)
    } catch (error) {
      this.logger.error(`Error handling START_SANDBOX job completion for sandbox ${sandboxId}:`, error)
    }
  }

  private async handleStopSandboxJobCompletion(job: Job): Promise<void> {
    const sandboxId = job.resourceId
    if (!sandboxId) return

    try {
      const sandbox = await this.sandboxRepository.findOne({ where: { id: sandboxId } })
      if (!sandbox) {
        this.logger.warn(`Sandbox ${sandboxId} not found for STOP_SANDBOX job ${job.id}`)
        return
      }

      if (job.status === JobStatus.COMPLETED) {
        // Sandbox stopped successfully
        this.logger.log(`STOP_SANDBOX job ${job.id} completed successfully, marking sandbox ${sandboxId} as STOPPED`)
        sandbox.state = SandboxState.STOPPED
        sandbox.errorReason = null
      } else if (job.status === JobStatus.FAILED) {
        // Sandbox stop failed - mark as ERROR
        this.logger.error(`STOP_SANDBOX job ${job.id} failed for sandbox ${sandboxId}: ${job.errorMessage}`)
        sandbox.state = SandboxState.ERROR
        sandbox.errorReason = job.errorMessage || 'Failed to stop sandbox'
      }

      await this.sandboxRepository.save(sandbox)
    } catch (error) {
      this.logger.error(`Error handling STOP_SANDBOX job completion for sandbox ${sandboxId}:`, error)
    }
  }

  private async handleDestroySandboxJobCompletion(job: Job): Promise<void> {
    const sandboxId = job.resourceId
    if (!sandboxId) return

    try {
      const sandbox = await this.sandboxRepository.findOne({ where: { id: sandboxId } })
      if (!sandbox) {
        this.logger.warn(`Sandbox ${sandboxId} not found for DESTROY_SANDBOX job ${job.id}`)
        return
      }

      if (job.status === JobStatus.COMPLETED) {
        // Sandbox destroyed successfully
        this.logger.log(
          `DESTROY_SANDBOX job ${job.id} completed successfully, marking sandbox ${sandboxId} as DESTROYED`,
        )
        sandbox.state = SandboxState.DESTROYED
        sandbox.errorReason = null
      } else if (job.status === JobStatus.FAILED) {
        // Sandbox destroy failed - mark as ERROR
        this.logger.error(`DESTROY_SANDBOX job ${job.id} failed for sandbox ${sandboxId}: ${job.errorMessage}`)
        sandbox.state = SandboxState.ERROR
        sandbox.errorReason = job.errorMessage || 'Failed to destroy sandbox'
      }

      await this.sandboxRepository.save(sandbox)
    } catch (error) {
      this.logger.error(`Error handling DESTROY_SANDBOX job completion for sandbox ${sandboxId}:`, error)
    }
  }

  private async handlePullSnapshotJobCompletion(job: Job): Promise<void> {
    const snapshotRef = job.resourceId
    const runnerId = job.runnerId
    if (!snapshotRef || !runnerId) return

    try {
      // Find the SnapshotRunner record
      const snapshotRunner = await this.snapshotService.findSnapshotRunnerByRefAndRunner(snapshotRef, runnerId)

      if (!snapshotRunner) {
        this.logger.warn(`SnapshotRunner not found for snapshot ${snapshotRef} on runner ${runnerId}`)
        return
      }

      if (job.status === JobStatus.COMPLETED) {
        // Snapshot pulled successfully
        this.logger.log(
          `PULL_SNAPSHOT job ${job.id} completed successfully, marking SnapshotRunner ${snapshotRunner.id} as READY`,
        )
        snapshotRunner.state = SnapshotRunnerState.READY
        snapshotRunner.errorReason = null
      } else if (job.status === JobStatus.FAILED) {
        // Snapshot pull failed
        this.logger.error(`PULL_SNAPSHOT job ${job.id} failed for snapshot ${snapshotRef}: ${job.errorMessage}`)
        snapshotRunner.state = SnapshotRunnerState.ERROR
        snapshotRunner.errorReason = job.errorMessage || 'Failed to pull snapshot'
      }

      await this.snapshotService.saveSnapshotRunner(snapshotRunner)
    } catch (error) {
      this.logger.error(`Error handling PULL_SNAPSHOT job completion for snapshot ${snapshotRef}:`, error)
    }
  }

  private async handleBuildSnapshotJobCompletion(job: Job): Promise<void> {
    const snapshotRef = job.resourceId
    const runnerId = job.runnerId
    if (!snapshotRef || !runnerId) return

    try {
      // Find snapshot by buildRunnerId - snapshot.manager sets this when assigning a build runner
      const snapshot = await this.snapshotService.findSnapshotByBuildRunner(runnerId, snapshotRef)

      if (!snapshot) {
        this.logger.warn(`Snapshot not found for build ref ${snapshotRef} on runner ${runnerId}`)
        return
      }

      if (job.status === JobStatus.COMPLETED) {
        // Snapshot built successfully - this should be handled by snapshot.manager's state machine
        this.logger.log(`BUILD_SNAPSHOT job ${job.id} completed successfully for snapshot ${snapshot.id}`)
        // The snapshot.manager will handle state transitions via its reconciler
      } else if (job.status === JobStatus.FAILED) {
        // Snapshot build failed
        this.logger.error(`BUILD_SNAPSHOT job ${job.id} failed for snapshot ${snapshot.id}: ${job.errorMessage}`)
        // The snapshot.manager will handle state transitions via its reconciler
      }
    } catch (error) {
      this.logger.error(`Error handling BUILD_SNAPSHOT job completion for snapshot ref ${snapshotRef}:`, error)
    }
  }

  private async handleRemoveSnapshotJobCompletion(job: Job): Promise<void> {
    const snapshotRef = job.resourceId
    const runnerId = job.runnerId
    if (!snapshotRef || !runnerId) return

    try {
      // For REMOVE_SNAPSHOT, the SnapshotRunner record should already be deleted by the manager
      // This is just for logging purposes
      if (job.status === JobStatus.COMPLETED) {
        this.logger.log(
          `REMOVE_SNAPSHOT job ${job.id} completed successfully for snapshot ${snapshotRef} on runner ${runnerId}`,
        )
      } else if (job.status === JobStatus.FAILED) {
        this.logger.error(
          `REMOVE_SNAPSHOT job ${job.id} failed for snapshot ${snapshotRef} on runner ${runnerId}: ${job.errorMessage}`,
        )
      }
    } catch (error) {
      this.logger.error(`Error handling REMOVE_SNAPSHOT job completion for snapshot ${snapshotRef}:`, error)
    }
  }
}
