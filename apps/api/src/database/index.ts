import type { Version } from '@cf/shared'
import chalk from 'chalk'
import { debug } from 'console'
import { versionQuery } from '../queries/queries'
import { usePoolQuery } from '../utils/usePoolQuery'

export const databaseVersion = async () => {
  const { error, value } = await usePoolQuery<Version>(versionQuery)

  if (error) debug(chalk.red('Error on connecting to database:', error.message))

  debug(chalk.cyan('Connected. DB version:'), chalk.yellowBright(value.version))
}
