/*
 * Copyright 2025 Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { Controller, All, Req, Res } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Request, Response } from 'express'
import Provider from 'oidc-provider'

@ApiExcludeController()
@Controller('oidc')
export class OidcProviderController {
  private provider: Provider
  private callback: any

  setProvider(provider: Provider) {
    this.provider = provider
    this.callback = provider.callback()
  }

  @All('{*any}')
  public mountedOidc(@Req() req: Request, @Res() res: Response): void {
    req.url = req.originalUrl.replace('/api/oidc', '')
    return this.callback(req, res)
  }
}
