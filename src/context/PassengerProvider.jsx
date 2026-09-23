import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useFlight } from "../hooks/useFlight";

// eslint-disable-next-line react-refresh/only-export-components -- context and provider live together on purpose
export const PassengerContext = createContext(null);

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

const emptyPassenger = (id) => ({
    id,
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    dob: "",
    gender: "",
    nationality: "",
    IDProof: "",
    IDNumber: "",
    passengerType: "Adult",
})

export const PassengerProvider = ({ children }) => {
    const { searchData } = useFlight()
    const [passengers, setPassengers] = useState([])

    // indexes of the passenger forms that are expanded on the summary page
    const [openPassengers, setOpenPassengers] = useState([])

    // one entry per passenger: { fieldName: "message" }
    const [passengerErrors, setPassengerErrors] = useState([])

    // Keep exactly one passenger form per traveller. Runs again whenever the traveller count
    // changes (e.g. going back to "Modify search" after already filling some in), not just
    // once — growing/shrinking the list instead of leaving it stuck at the old length, while
    // keeping already-entered data for travellers that still exist. This has to live in an
    // effect rather than inside FlightProvider's own setSearchData (like the seat-trimming
    // logic does) because `passengers` belongs to a different context than `searchData`.
    /* eslint-disable react-hooks/set-state-in-effect -- syncing state across two separate contexts */
    useEffect(() => {
        if (passengers.length === searchData.travellers) return

        if (passengers.length === 0) {
            setPassengers(Array.from({ length: searchData.travellers }, (_, index) => emptyPassenger(index + 1)))
            setOpenPassengers([0]) // open the first passenger by default
        } else if (passengers.length < searchData.travellers) {
            setPassengers(prev => [
                ...prev,
                ...Array.from({ length: searchData.travellers - prev.length }, (_, i) => emptyPassenger(prev.length + i + 1)),
            ])
        } else {
            setPassengers(prev => prev.slice(0, searchData.travellers))
        }
    }, [passengers.length, searchData.travellers])
    /* eslint-enable react-hooks/set-state-in-effect */

    const validatePassengers = useCallback(() => {
        const errors = passengers.map(passenger => {
            const error = {}
            if (!passenger.firstName.trim()) error.firstName = "First name required"
            if (!passenger.lastName.trim()) error.lastName = "Last name required"
            if (!passenger.email.trim()) error.email = "Email is required"
            else if (!EMAIL_PATTERN.test(passenger.email)) error.email = "Enter a valid email address"
            if (passenger.number.length !== 10) error.number = "10 digit number required"
            if (!passenger.dob) error.dob = "Date of birth required"
            if (!passenger.gender) error.gender = "Gender is required"
            if (!passenger.nationality) error.nationality = "Nationality is required"
            if (!passenger.IDProof) error.IDProof = "Select an ID proof type"
            if (!passenger.IDNumber.trim()) error.IDNumber = "ID number is required"
            return error
        })

        setPassengerErrors(errors)
        return errors
    }, [passengers])

    // Memoized so a consumer that only reads e.g. `openPassengers` isn't forced to
    // re-render every time a passenger field is edited (which changes `passengers`).
    const value = useMemo(() => ({
        passengers,
        setPassengers,
        openPassengers,
        setOpenPassengers,
        passengerErrors,
        validatePassengers,
    }), [passengers, openPassengers, passengerErrors, validatePassengers])

    return (
        <PassengerContext.Provider value={value}>
            {children}
        </PassengerContext.Provider>
    )
}
