import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,

} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { bookFlight } from "../api/flights";
const BookingModal = ({ isOpen, onClose, flight }) => {
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([{ name: '', email: '' }]);
  const navigate = useNavigate();

  const handlePassengerChange = (e) => {
    const newNumPassengers = parseInt(e.target.value);
    setNumPassengers(newNumPassengers);
    setPassengerDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      if (newNumPassengers > updatedDetails.length) {
        for (let i = updatedDetails.length; i < newNumPassengers; i++) {
          updatedDetails.push({ name: '', email: '' });
        }
      } else {
        updatedDetails.length = newNumPassengers;
      }
      return updatedDetails;
    });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setPassengerDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index][name] = value;
      return updatedDetails;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const stripe = await loadStripe("pk_test_51PLWYpSIBBiQfPdByBZYQGAaMOnC43VX7PsdBYNjTGi4SXdEUi23QMqONkxHk5tZ3v6sjf49AAfNpCufASbJOyVN00qqxO5FYr");
      const response = await bookFlight({ flight, passengerDetails, count: numPassengers });
      const result = stripe.redirectToCheckout({
        sessionId: response.id
      });

    } catch (error) {
      console.log(error)
    }
  };

  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Booking Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Number of Passengers:</label>
            <select
              value={numPassengers}
              onChange={handlePassengerChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {[...Array(5)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          {[...Array(numPassengers)].map((_, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="name"
                placeholder={`Passenger ${index + 1} Name`}
                value={passengerDetails[index].name}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="email"
                name="email"
                placeholder={`Passenger ${index + 1} Email`}
                value={passengerDetails[index].email}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Proceed to Payment
          </button>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>

};
export default BookingModal;
