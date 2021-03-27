import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { resolve } from 'path'
import routes from './routes'
import { readFileSync } from 'fs'
import bodyParser from 'body-parser'
import mongoConnect from './database/MongoConnect'

require('express-async-errors')

config({ path: resolve(__dirname, '../.env') })

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    err: 'internal_server_error',
    message: err.message,
  })
  next(err)
})
mongoConnect(process.env.MONGO_URI)

app.listen(PORT, async () => {
  console.log(readFileSync('title.txt', 'utf8').toString())
  console.log(`[WebServer] Running at ${PORT}`)
})
