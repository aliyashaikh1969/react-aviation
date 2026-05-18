import { createContext, useContext, useEffect, useState } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightData, setFlightData] = useState(()=>{

    const savedFlightData = localStorage.getItem("flightData");

    return savedFlightData ? JSON.parse(savedFlightData):
    {
    from: "DELHI",
    to: "MUMBAI",
    date: "",
    returnDate: "",
    travellers: 1,
    tripType: "oneway",
  }});


  const [selectedFlight ,setSelectedFlight] = useState()
  const [selectedSeats,setSelectedSeates] = useState([])

  useEffect(()=>{
    localStorage.setItem('flightData',JSON.stringify(flightData))
  },[flightData])

  useEffect(()=>{
    console.log("selectedFlight",selectedFlight)
  },[selectedFlight])

  return (
    <FlightContext.Provider value={{ flightData, setFlightData ,selectedFlight,setSelectedFlight,selectedSeats,setSelectedSeates}}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  return useContext(FlightContext);
};