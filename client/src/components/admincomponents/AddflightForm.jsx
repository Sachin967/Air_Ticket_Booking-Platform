import { useEffect, useState } from 'react'
import { RegisterFlight } from '../../api/flights';
import { toast } from 'react-toastify';

const AddflightForm = () => {
  const [flightData, setFlightData] = useState({
    airline: '',
    departure: '',
    arrival: '',
    price: '',
    duration: '',
    departureTime: '',
    date: '',
  });
  const [today, setToday] = useState('');

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    setToday(todayDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!flightData.airline || !flightData.departure || !flightData.arrival || !flightData.price || !flightData.duration || !flightData.departureTime || !flightData.date) {
        toast.error('Please fill in all fields');
        return;
      }

      const duration = parseInt(flightData.duration);
      if (isNaN(duration) || duration <= 0) {
        toast.error('Duration must be a positive number');
        return;
      }
      if(flightData.price<500){
        toast.error('Price should be atleast 500');
        return;
      }
      const response = await RegisterFlight(flightData);
      console.log(response);
      toast.success('Successfully Registered');
      setFlightData({
        airline: '',
        departure: '',
        arrival: '',
        price: 0,
        duration: '',
        departureTime: '',
        date: '',
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[675px] bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Flight</h2>
        <div className="mb-4">
          <input
            type="text"
            name="airline"
            value={flightData.airline}
            onChange={handleChange}
            placeholder="Airline Name"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="departure"
            value={flightData.departure}
            onChange={handleChange}
            placeholder="Departure Place"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="arrival"
            value={flightData.arrival}
            onChange={handleChange}
            placeholder="Arrival Place"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="price"
            value={flightData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="duration"
            value={flightData.duration}
            onChange={handleChange}
            placeholder="Duration Time (eg : 7:30)"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="departureTime"
            value={flightData.departureTime}
            onChange={handleChange}
            placeholder="Departure Time (eg: 12:00)"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={flightData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            min={today}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Add Flight
        </button>
      </form>
    </div>
  )
}
export default AddflightForm;
