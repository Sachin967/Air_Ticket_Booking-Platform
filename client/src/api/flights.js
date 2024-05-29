import axios from 'axios'

const baseURL = 'http://localhost:4000/api/flights'

export const searchFlights = async (searchParams) => {
     const response = await axios.get(`${baseURL}/search`, { params: searchParams })
     return response.data
}
export const searchFlightsByName = async (searchParams) => {
     const response = await axios.get(`${baseURL}/search-airline`, { params: searchParams })
     return response.data
}

export const bookFlight = async (bookingData) => {
     const response = await axios.post(`${baseURL}/book`, bookingData, { withCredentials: true })
     return response.data
}

export const RegisterFlight = async (flightData) => {
     const response = await axios.post(`${baseURL}/register-flight`, flightData, { withCredentials: true })
     return response.data
}
