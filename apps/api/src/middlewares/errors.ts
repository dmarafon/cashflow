import chalk from 'chalk'
import { debug } from 'console'
import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-validation'
import { customError } from '../utils/customError'

config()

debug(chalk.blue('cf:server:middlewares:errors'))

export const notFoundError = (_req: Request, _res: Response, next: NextFunction) => {
  const error = customError(404, 'Endpoint not found')

  next(error)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const generalError = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  debug(chalk.red(error.message || error.cause))
  const message = error.name ?? 'General Error'
  const statusCode = typeof error.cause === 'number' ? error.cause : 500

  if (error instanceof ValidationError) {
    res.status(400).json({ message: 'Bad Request' })
    debug(chalk.bgRedBright(error.message))
  } else {
    res.status(statusCode).json({ message })
  }
}
