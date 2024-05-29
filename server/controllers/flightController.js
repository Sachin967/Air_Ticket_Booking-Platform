import Flight from '../db/models/Flight.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()
let STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(STRIPE_SECRET_KEY)
const searchFlightsByDestination = async (req, res) => {
     const { departure, arrival, date } = req.query
     try {
          const flights = await Flight.find({ departure, arrival, date })
          res.json(flights)
     } catch (error) {
         console.error(err.message)
         res.status(500).json({ error: 'Server error' })
     }
}

const searchFlightsByName = async (req, res) => {
     const { airline } = req.query
     try {
          const regex = new RegExp(airline, 'i')
          const flights = await Flight.find({ airline: { $regex: regex } })
          res.json(flights)
     } catch (error) {
          console.error(err.message)
          res.status(500).json({ error: 'Server error' })
     }
}

const bookFlight = async (req, res) => {
     const { flight, passengerDetails } = req.body
     try {
          const lineItems = passengerDetails.map((passenger) => ({
               price_data: {
                    currency: 'inr',
                    product_data: {
                         name: passenger.name,
                    },
                    unit_amount: flight.price * 100,
               },
               quantity: 1,
          }))
          const session = await stripe.checkout.sessions.create({
               payment_method_types: ['card'],
               line_items: lineItems,
               mode: 'payment',
               success_url: 'http://localhost:5173/success',
               cancel_url: 'http://localhost:5173/cancel',
          })
          res.json({ id: session.id })
     } catch (error) {
          console.error(error.message)
          res.status(500).json({ error: 'Failed to book flight' }) 
     }
}

const createFlight = async (req, res) => {
     const { departureTime, duration } = req.body
     try {
          const [depHours, depMinutes] = departureTime.split(':')
          const [durHours, durMinutes] = duration.split(':')

          // Calculate total duration in minutes
          const totalDuration = parseInt(durHours) * 60 + parseInt(durMinutes)

          // Calculate arrival time in milliseconds since Unix epoch
          const arrivalTimeMillis = new Date().setHours(depHours, depMinutes) + totalDuration * 60000

          // Create a new Date object for arrival time
          const arrivalTime = new Date(arrivalTimeMillis)

          // Format arrival time as "hh:mm"
          const formattedArrivalTime = `${arrivalTime.getHours()}:${arrivalTime
               .getMinutes()
               .toString()
               .padStart(2, '0')}`

          const flight = await Flight.create({ ...req.body, arrivalTime: formattedArrivalTime })

          res.status(201).json({ success: true, message: 'Flight created successfully' })
     } catch (error) {
          console.log(error)
          res.status(500).json({ success: false, error: 'Failed to create flight' })
     }
}

export { searchFlightsByDestination, searchFlightsByName, bookFlight, createFlight }
