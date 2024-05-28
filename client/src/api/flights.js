import axios from 'axios'

export const searchFlights = async (searchParams) => {
     const response = await axios.get('/api/flights/search', { params: searchParams })
     return response.data
}

export const bookFlight = async (bookingData) => {
     const response = await axios.post('/api/flights/book', bookingData)
     return response.data
}
