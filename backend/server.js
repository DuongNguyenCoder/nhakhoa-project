const express = require('express')
require('dotenv').config()
const cors = require('cors')
const initRoutes = require('./routes')
const dbConnected = require('./configs/dbConnected')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 8888

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://minhdental.com',
      'https://duoclieuphattam.com',
      process.env.CLIENT_URL,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(cookieParser())

initRoutes(app)
dbConnected()

app.listen(port, () => console.log(`server on port: ${port}`))
