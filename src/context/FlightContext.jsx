import { createContext,useContext, useEffect, useState,} from "react";

const FlightContext = createContext();


const initialFlightData = {
  from: "",
  to: "",
  date: "",
  returnDate: "",
  travellers: 1,
  tripType: "oneway",
  paymentMethod:"",
};

export const FlightProvider = ({
  children,
}) => {


  const [flightData, setFlightData] =
    useState(() => {
      try {
        const savedData = localStorage.getItem("flightData");
        return savedData ? JSON.parse(savedData) : initialFlightData;

      } catch {
        return initialFlightData
      }
    });

  // save in localStorage
  useEffect(() => {
    localStorage.setItem(
      "flightData",
      JSON.stringify(flightData)
    );
  }, [flightData]);

  const [selectedFlight, setSelectedFlight] = useState(null);

  const [selectedSeats, setSelectedSeats] = useState([]);



  const upadateFlighhtData = (fields)=>{
     setFlightData(prev=>({...prev , ...fields}))
  }

  const resetFlightData = () => {
    localStorage.removeItem('flightData')
    setFlightData(initialFlightData);
    setSelectedFlight(null);
    setSelectedSeats([]);

  }

  return (
    <FlightContext.Provider
      value={{
        flightData,
        setFlightData,

        initialFlightData,

        selectedFlight,
        setSelectedFlight,

        selectedSeats,
        setSelectedSeats,

        resetFlightData,

      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  return useContext(FlightContext);
};