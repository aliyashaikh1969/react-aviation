import { createContext, useContext, useState } from "react";

const PassengerContext = createContext();


export const PassengerProvider = ({ children }) => {

    const [passengerData, setPassengerData] = useState({
        name:"",
        email:"",
        number:"",
        dob:"",
        gender:"",
        nationality:"",
        IDProof:"",
        IDNumber :"",
    })

    return (
        <PassengerContext.Provider
      value={{
        passengerData,
        setPassengerData,
      }}
    >

      {children}

    </PassengerContext.Provider>
    )
}


  export const usePassenger = () => useContext(PassengerContext);
