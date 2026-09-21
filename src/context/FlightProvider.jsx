import { useCallback, useEffect, useState } from "react";
import { FlightContext } from "./FlightContext";

const SEARCH_STORAGE_KEY = "searchData";

const initialSearchData = {
  from: "",
  to: "",
  date: "",
  returnDate: "",
  travellers: 1,
  tripType: "oneway",
  paymentMethod: "",
};

const loadSearchData = () => {
  try {
    const saved = localStorage.getItem(SEARCH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialSearchData;
  } catch {
    return initialSearchData;
  }
};

// Holds everything about the trip being booked: the search form, the chosen flight and seats.
export const FlightProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(loadSearchData);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // flight currently open on the details page (not yet chosen for booking)
  const [detailFlight, setDetailFlight] = useState(null);

  // keep the search form across page refreshes
  useEffect(() => {
    localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(searchData));
  }, [searchData]);

  // stable identity so effects can depend on it
  const resetBooking = useCallback(() => {
    localStorage.removeItem(SEARCH_STORAGE_KEY);
    setSearchData(initialSearchData);
    setSelectedFlight(null);
    setSelectedSeats([]);
  }, []);

  return (
    <FlightContext.Provider
      value={{
        searchData,
        setSearchData,
        initialSearchData,
        selectedFlight,
        setSelectedFlight,
        detailFlight,
        setDetailFlight,
        selectedSeats,
        setSelectedSeats,
        resetBooking,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
