import { createContext, useContext, useState } from "react";

const PassengerContext = createContext();


export const PassengerProvider = ({ children }) => {

    const [passengerData, setPassengerData] = useState([])

    const [passengers, setPassengers] = useState([])

    const [list, setList] = useState([])
    const [errors, setErrors] = useState([])


    const validatePassengers = () => {
        const newErrors = passengers.map(passenger => {
            const err = {}
            if (!passenger.name.trim()) err.name = "Name required"
            if (passenger.number.length !== 10) err.number = "10 digit number required"
            if (!passenger.dob) err.dob = "Date of birth required"
            if (!passenger.gender) err.gender = "Gender is required"
           
            return err
        })

        setErrors(newErrors)
        return newErrors
    }


    return (
        <PassengerContext.Provider value={{
            passengerData,
            setPassengerData,
            passengers,
            setPassengers,
            list,
            setList,
            errors,
            validatePassengers
        }}>
            {children}
        </PassengerContext.Provider>
    )
}


export const usePassenger = () => useContext(PassengerContext);
