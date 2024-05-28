import express from 'express'
import { bookFlight, createFlight, searchFlightsByDestination, searchFlightsByName } from '../controllers/flightController.js'
const router = express.Router()

router.get('/search', searchFlightsByDestination)
router.get('/searchairline', searchFlightsByName)
router.post('/book', bookFlight)
router.post('/register-flight',createFlight)
export default router
