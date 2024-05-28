import mongoose from 'mongoose'
const FlightSchema = new mongoose.Schema({
     departure: { type: String, required: true },
     arrival: { type: String, required: true },
     date: { type: Date, required: true },
     airline: { type: String, required: true },
     price: { type: Number, required: true },
})
export default mongoose.model('Flight', FlightSchema)
