import { createContext, useContext, useState } from "react";

const PassengerContext = createContext();


export const PassengerProvider = ({ children }) => {

    const [passengerData, setPassengerData] = useState({
      passengers:[]
     })

    return (
        <PassengerContext.Provider value={{passengerData,setPassengerData,}}>
                {children}
        </PassengerContext.Provider>
    )
}


  export const usePassenger = () => useContext(PassengerContext);
