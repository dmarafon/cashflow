import chalk from 'chalk'
import { debug } from 'debug'
import { config } from 'dotenv'
import express from 'express'

const app = express()

config()

debug('map-project:server:initializeServer')

export const initializeServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(typeof port)
      debug(chalk.yellow(`Server listening on port ${port}`))

      resolve(undefined)
    })

    server.on('error', (error: NodeJS.ErrnoException) => {
      debug(chalk.red('Error on server'))
      if (error.code === 'EADDRINUSE') {
        debug(chalk.red(`Port ${port} in use`))
        reject()
      }
    })
  })
