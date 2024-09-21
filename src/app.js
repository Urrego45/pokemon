import express from 'express'
import morgan from 'morgan'

import pokemon from './routes/pokemon.routes.js'

import { config } from 'dotenv'
config()

const app = express()


app.use(morgan('dev'))
app.use(express.json())

app.use('/api', pokemon)


export default app