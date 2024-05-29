import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchFlights, searchFlightsByName } from '../api/flights'
import { useSelector } from 'react-redux'
import BookingModal from '../components/BookingModal'
import { useDisclosure } from '@chakra-ui/react'

const SearchResultsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation()
  const navigate = useNavigate()
  const { departure, arrival, date, airline } = location.state
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const { Userisloggedin } = useSelector((state) => state.auth)

  const fetchFlights = async () => {
    try {
      const response = await searchFlights({ departure, arrival, date })
      setFlights(response)
    } catch (error) {
      console.error('Error fetching flights:', error)
    }
  }

  const fetchFlightsByName = async () => {
    try {
      const response = await searchFlightsByName({ airline })
      setFlights(response)
    } catch (error) {
      console.error('Error fetching flights:', error)
    }
  }

  useEffect(() => {
    if (departure && arrival && date) {
      fetchFlights()
    } else if (airline) {
      fetchFlightsByName()
    }
  }, [departure, arrival, date, airline])

  const handleBooking = (flight) => {
    if (!Userisloggedin) navigate('/login')
    setSelectedFlight(flight)
    onOpen()
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-8 text-center bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Search Results</h1>
        <div className="flex justify-center space-x-8 text-lg">
          <div>
            <p>
              <strong>From:</strong> {flights[0]?.departure || departure}
            </p>
          </div>
          <div>
            <p>
              <strong>To:</strong> {flights[0]?.arrival || arrival}
            </p>
          </div>
          <div>
            <p>
              <strong>Date:</strong>{' '}
              {flights[0]?.date ? new Date(flights[0]?.date).toLocaleDateString() : date}
            </p>
          </div>
          <div>
            <p>
              <strong>Airline:</strong> {flights[0]?.airline || airline}
            </p>
          </div>
        </div>
      </div>
      {flights?.length > 0 ? (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">Airlines</th>
              <th className="border border-slate-600 rounded-md">Departure</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Duration</th>
              <th className="border border-slate-600 rounded-md">Arrival</th>
              <th className="border border-slate-600 rounded-md">Price</th>
              <th className="border border-slate-600 rounded-md"></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {flight.airline}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {flight.departureTime}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {flight.duration}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {flight.arrivalTime}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {flight.price}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <button
                      onClick={() => handleBooking(flight)}
                      className="bg-orange-400 text-white px-4 py-1 rounded-lg"
                    >
                      Book
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex">
          <div className="container">
            <div className="flex justify-center items-center my-15 px-8">
              <div className="flex-col justify-center items-center w-[512px]">
                <div className="flex flex-col items-center">
                  <h1 className="font-extrabold text-3xl">
                    No flights found for this search
                  </h1>
                  <p>Please try again, with different airports or dates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <BookingModal flight={selectedFlight} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default SearchResultsPage
