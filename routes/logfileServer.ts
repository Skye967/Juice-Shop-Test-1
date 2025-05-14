/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path = require('path')
import { Request, Response, NextFunction } from 'express'

module.exports = function serveLogFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    const safeFile = path.basename(file);

    if (safeFile === file) {
      res.sendFile(path.resolve('logs', safeFile))
    } else {
      res.status(403)
      next(new Error('File names cannot contain directory traversal characters!'))
    }
  }
}
