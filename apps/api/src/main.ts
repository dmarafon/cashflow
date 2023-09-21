/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import express from 'express';
// import * as path from 'path';

// const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to api!' });
// });

// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

import bodyParser from 'body-parser'
import express from 'express'
import { pool } from './queries'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/user/:id', (req, response) => {
  const userId = req.params.id
  console.log(req.params.id)
  pool.query('SELECT * FROM "user" WHERE id = $1', [userId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})
