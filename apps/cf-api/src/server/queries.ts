const Pool = require('pg').Pool

export const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.database,
  password: process.env.PASSWORD,
  port: process.env.POOLPORT,
})

