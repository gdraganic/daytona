/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Injectable } from '@nestjs/common'
import Provider from 'oidc-provider'

/**
 * Service that provides access to the OIDC Provider instance
 */
@Injectable()
export class OidcProviderService {
  private provider: Provider

  setProvider(provider: Provider) {
    this.provider = provider
  }

  getProvider(): Provider | null {
    return this.provider
  }
}
