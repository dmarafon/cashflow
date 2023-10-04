import chalk from 'chalk'
import { debug } from 'console'
import { config } from 'dotenv'
import app from '.'

config()

debug(chalk.blue('cf:initializeServer'))

export const initializeServer = (port: number | string) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on port ${port}`))

      resolve(undefined)
    })

    server.on('error', (error: NodeJS.ErrnoException) => {
      debug(chalk.red('Error on server'))

      if (error.code === 'EADDRINUSE') {
        debug(chalk.red(`Port ${port} in use`))

        reject(error)
      }
    })
  })
