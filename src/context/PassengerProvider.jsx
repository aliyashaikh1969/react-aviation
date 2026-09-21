import { useState } from "react";
import { PassengerContext } from "./PassengerContext";

export const PassengerProvider = ({ children }) => {
    const [passengers, setPassengers] = useState([])

    // indexes of the passenger forms that are expanded on the summary page
    const [openPassengers, setOpenPassengers] = useState([])

    // one entry per passenger: { fieldName: "message" }
    const [passengerErrors, setPassengerErrors] = useState([])

    const validatePassengers = () => {
        const errors = passengers.map(passenger => {
            const error = {}
            if (!passenger.name.trim()) error.name = "Name required"
            if (passenger.number.length !== 10) error.number = "10 digit number required"
            if (!passenger.dob) error.dob = "Date of birth required"
            if (!passenger.gender) error.gender = "Gender is required"
            return error
        })

        setPassengerErrors(errors)
        return errors
    }

    return (
        <PassengerContext.Provider value={{
            passengers,
            setPassengers,
            openPassengers,
            setOpenPassengers,
            passengerErrors,
            validatePassengers,
        }}>
            {children}
        </PassengerContext.Provider>
    )
}
