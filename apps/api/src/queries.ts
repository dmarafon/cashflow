import { Pool } from 'pg'

export const pool = new Pool({
  user: process.env['DB_USER'],
  host: process.env['DB_HOST'],
  database: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  port: process.env['DB_PORT'],
})
