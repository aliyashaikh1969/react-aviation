import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components -- context and provider live together on purpose
export const FlightContext = createContext(null);

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
    if (!saved) return initialSearchData;

    const parsed = JSON.parse(saved);
    // JSON.parse succeeds on things like "null" or "42" too — make sure what came back is
    // actually usable, and fill in any fields an older/corrupted save might be missing
    if (!parsed || typeof parsed !== "object") return initialSearchData;
    return { ...initialSearchData, ...parsed };
  } catch {
    return initialSearchData;
  }
};

// Holds everything about the trip being booked: the search form, the chosen flight(s) and seats.
export const FlightProvider = ({ children }) => {
  const [searchData, setSearchDataRaw] = useState(loadSearchData);
  const [selectedFlight, setSelectedFlightRaw] = useState(null);
  // only used for round trips — a round trip is booked as an outbound flight + a return flight
  const [selectedReturnFlight, setSelectedReturnFlightRaw] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [promoCode, setPromoCode] = useState(null);

  // flight currently open on the details page (not yet chosen for booking)
  const [detailFlight, setDetailFlight] = useState(null);

  // keep the search form across page refreshes
  useEffect(() => {
    localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(searchData));
  }, [searchData]);

  // picking a new outbound flight clears any seats/return flight chosen against the old one.
  // Only depends on searchData.tripType (for the toast wording), not all of searchData, so
  // it doesn't get a new identity on every keystroke in the search form.
  const setSelectedFlight = useCallback((flight) => {
    setSelectedFlightRaw(flight);
    setSelectedReturnFlightRaw(null);
    setSelectedSeats([]);
    if (flight) toast.success(searchData.tripType === "round" ? "Outbound flight selected" : "Flight selected");
  }, [searchData.tripType]);

  const setSelectedReturnFlight = useCallback((flight) => {
    setSelectedReturnFlightRaw(flight);
    setSelectedSeats([]);
    if (flight) toast.success("Return flight selected");
  }, []);

  // if the traveller count goes down after seats were picked, drop the extra seats.
  // Reads only through the functional setState form, so this never needs to change identity.
  const setSearchData = useCallback((update) => {
    setSearchDataRaw((prev) => {
      const next = typeof update === "function" ? update(prev) : update
      if (next.travellers !== prev.travellers) {
        setSelectedSeats((seats) => (seats.length > next.travellers ? seats.slice(0, next.travellers) : seats))
      }
      // switching to one way makes a previously-picked return flight meaningless
      if (next.tripType !== "round" && prev.tripType === "round") {
        setSelectedReturnFlightRaw(null)
      }
      return next
    })
  }, []);

  const resetBooking = useCallback(() => {
    localStorage.removeItem(SEARCH_STORAGE_KEY);
    setSearchDataRaw(initialSearchData);
    setSelectedFlightRaw(null);
    setSelectedReturnFlightRaw(null);
    setSelectedSeats([]);
    setPromoCode(null);
  }, []);

  // Memoized so consumers that only care about e.g. `selectedSeats` don't re-render every
  // time `searchData` changes (typing in the search form) or vice versa.
  const value = useMemo(() => ({
    searchData,
    setSearchData,
    initialSearchData,
    selectedFlight,
    setSelectedFlight,
    selectedReturnFlight,
    setSelectedReturnFlight,
    detailFlight,
    setDetailFlight,
    selectedSeats,
    setSelectedSeats,
    promoCode,
    setPromoCode,
    resetBooking,
  }), [
    searchData, setSearchData,
    selectedFlight, setSelectedFlight,
    selectedReturnFlight, setSelectedReturnFlight,
    detailFlight,
    selectedSeats,
    promoCode,
    resetBooking,
  ]);

  return (
    <FlightContext.Provider value={value}>
      {children}
    </FlightContext.Provider>
  );
};
