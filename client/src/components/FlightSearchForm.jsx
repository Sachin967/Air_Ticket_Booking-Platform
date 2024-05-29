import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FlightSearchForm = () => {
  const [today, setToday] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    setToday(todayDate);
    setDate(todayDate);
  }, []);
  
  const handleSearch = async () => {
    try {
      if (!departure || !arrival) {
        setError('Enter arrival airport / city');
        return; 
      }
      setError(''); 
      navigate('/search-results', { state: { departure, arrival, date } });
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <>
      <div >
        <div>
          <h1 className="text-3xl text-center font-semibold">Search Flights</h1>
        </div>
        <div className="w-[700px] h-[200px] shadow-md flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            <input onChange={(e) => setDeparture(e.target.value)} value={departure} name="departure" type="text" className="p-2 border rounded" placeholder="From" />
            <div className="relative flex-grow">
              <input type="text" value={arrival} name="arrival" onChange={(e) => setArrival(e.target.value)} className="p-2 border rounded" placeholder="To" />
              {error && (
                <p className="absolute top-full left-0 mt-1 text-red-500 text-sm">
                  {error}
                </p>
              )}
          </div>  
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="p-2 border rounded"
              defaultValue={today}
              min={today}
            />          </div>
          <button onClick={handleSearch} className="mt-4 p-2 bg-blue-500 text-white rounded">Search Flights</button>
        </div>
      </div>
    </>



  )
}
export default FlightSearchForm
