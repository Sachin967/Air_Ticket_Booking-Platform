import express from 'express'
import userRoute from './routes/auth.js'
import flightsRoute from './routes/flights.js'
import dotenv from 'dotenv'
import { dBConnection } from './db/DBconnection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000 

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
     cors({
          origin: 'http://localhost:5173',
          credentials: true,
     })
)

// Routes
app.use('/api/auth', userRoute)
app.use('/api/flights', flightsRoute)

// Database connection
await dBConnection()

// Error Handling Middleware
app.use((err, req, res, next) => {
     console.error(err.stack)
     res.status(500).send('Something went wrong!')
})

app.listen(port, () => {
     console.log(`Server is running on port ${port}`)
})
