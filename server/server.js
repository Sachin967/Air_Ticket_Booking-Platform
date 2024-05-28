import express from 'express'
import userRoute from './routes/auth.js'
import flightsRoute from './routes/flights.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { dBConnection } from './db/DBconnection.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
await dBConnection()
app.use('/api/auth', userRoute)
app.use('/api/flights', flightsRoute)

app.listen(port, () => {
     console.log(`Server is running on port ${port}`)
})
