import express from 'express'
import {
     bookFlight,
     createFlight,
     searchFlightsByDestination,
     searchFlightsByName,
} from '../controllers/flightController.js'
import { validateSignatureAdmin, validateSignatureUser } from '../middleware/authenticate.js'

const router = express.Router()

// Search flights routes
router.get('/search', searchFlightsByDestination) 
router.get('/search-airline', searchFlightsByName) 

// Flight booking and creation routes
router.post('/book', validateSignatureUser, bookFlight) 
router.post('/register-flight', validateSignatureAdmin, createFlight) 

export default router
