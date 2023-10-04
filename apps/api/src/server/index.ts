import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:4000',
    'http://localhost:4001',
    'http://localhost:4002',
  ],
}

const app = express()

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.disable('x-powered-by')
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.static('uploads'))
app.use(express.json())

export default app
