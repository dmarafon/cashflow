import chalk from 'chalk'
import { debug } from 'console'
import { config } from 'dotenv'
import { databaseVersion } from './database'
import { initializeServer } from './server/initializeServer'

config()

const port = process.env.PORT ?? 4000

;(async () => {
  try {
    await databaseVersion()

    await initializeServer(port)
  } catch {
    debug(chalk.red('Exiting with errors'))
    process.exit(1)
  }
})()
