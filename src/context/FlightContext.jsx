import { createContext, useContext, useEffect, useState } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flightData, setFlightData] = useState(()=>{
    const savData = localStorage.getItem("flightData");
    return savData ? JSON.parse(savData):
    {
    from: "DELHI",
    to: "MUMBAI",
    date: "",
    returnDate: "",
    travellers: 1,
    tripType: "oneway",
  }});


  useEffect(()=>{
    localStorage.setItem('flightData',JSON.stringify(flightData))
  },[flightData])
  return (
    <FlightContext.Provider value={{ flightData, setFlightData }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  return useContext(FlightContext);
};