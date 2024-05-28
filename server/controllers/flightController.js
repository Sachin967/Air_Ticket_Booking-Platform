import Flight from '../db/models/Flight.js'

const searchFlightsByDestination = async (req, res) => {
     const { departure, arrival, date } = req.query
     try {
          const flights = await Flight.find({ departure, arrival, date })
          res.json(flights)
     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error')
     }
}

const searchFlightsByName = async (req, res) => {
     const { airline } = req.query
     try {
          const flights = await Flight.find({ airline })
          res.json(flights)
     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error')
     }
}

const bookFlight = async (req, res) => {}

const createFlight = async (req, res) => {
     try {
          const flight = await Flight.create(req.body)
          res.status(201).json({ success: true, data: flight })
     } catch (error) {
          res.status(500).json({ success: false, error: error.message })
     }
}

export { searchFlightsByDestination, searchFlightsByName, bookFlight, createFlight }
