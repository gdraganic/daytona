/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { DataSource } from 'typeorm'

/**
 * Transactional decorator that wraps a method in a TypeORM database transaction
 */
export function Transactional() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      // Try to find DataSource
      let dataSource: DataSource = (this as any).dataSource

      // If no explicit dataSource, find it from any repository
      if (!dataSource) {
        const instance = this as any
        for (const key of Object.keys(instance)) {
          const prop = instance[key]
          // Check if property is a TypeORM Repository
          if (prop?.manager?.connection) {
            dataSource = prop.manager.connection as DataSource
            break
          }
        }
      }

      if (!dataSource) {
        throw new Error(
          `@Transactional decorator could not find DataSource in ${target.constructor.name}.
          Please inject either:
          1. DataSource explicitly: constructor(private readonly dataSource: DataSource), OR
          2. Any TypeORM repository: constructor(@InjectRepository(Entity) private repo: Repository<Entity>)`,
        )
      }

      return await dataSource.transaction(async (manager) => {
        // Temporarily store the manager on the instance
        const previousManager = (this as any).manager
        ;(this as any).manager = manager

        try {
          return await originalMethod.apply(this, args)
        } finally {
          // Restore previous manager (if any)
          ;(this as any).manager = previousManager
        }
      })
    }

    return descriptor
  }
}
