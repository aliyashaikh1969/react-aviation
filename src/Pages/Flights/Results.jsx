import React, { useEffect, useMemo, useState } from "react";
import { Filters } from "../../components/Filters";
import { FlightCard } from "../../components/FlightCard/FlightCard"
import { Features } from "../../components/Features/Features"
import saleBack from '../../assets/sale-back.jpg'
import { useFlight } from "../../context/FlightContext";
import { SearchModify } from "../../components/search/SearchModify";
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { FaFilter } from "react-icons/fa";
import { searchFlights } from "../../services/flightService"

export const Results = ({ nextStep }) => {
    useScrollToTop();

    const { flightData } = useFlight()
    const [allFlights, setAllFlights] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [showFilter, setShowFilter] = useState(false)
    const [filters, setFilters] = useState({
        price: 15000,
        stops: [],
        airlines: [],
        departure: [],
    });
    // console.log(allFlights[0])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            setError(null)
            setAllFlights([])
            try {
                const results = await searchFlights(flightData)
                setAllFlights(results)

                // Max price filter
                if (results.length > 0) {
                    const maxPrice = Math.max(...results.map(f => f.price))
                    setFilters(prev => ({ ...prev, price: maxPrice }))
                }
            } catch (err) {
                setError("Flights fetch nahi ho paayi — dobara try karo")
            } finally {
                setLoading(false)
            }
        }
        if(flightData.from && flightData.to &&flightData.date){
            fetch()
        }
        
    }, [flightData.from,flightData.to,flightData.date,flightData.tripType,flightData.travellers])


    const filteredFlights = useMemo(() => {

        return allFlights.filter(flight => {

            const firstFlight = flight.flights?.[0]

            const priceMatch = flight.price <= filters.price

            // // stops
            const stopsCount = flight.flights?.length - 1
            const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stopsCount)

            // airline
            const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(firstFlight?.airline)

            // time slot

            const depTime = firstFlight?.departure_airport?.time
            const hour = depTime ? parseInt(depTime.split(" ")[1].split(":")[0]) : 0

            const timeSlot =
                hour < 6 ? "earlymorning" :
                    hour < 12 ? "morning" :
                        hour < 18 ? "afternoon" : "night"


            const departureMatch = filters.departure.length === 0 || filters.departure.includes(timeSlot)


            return priceMatch && stopsMatch && departureMatch && airlineMatch
        })
    }, [allFlights, filters])


    return (
        <div>
            <div className="w-full bg-cover bg-center px-4  pt-20 pb-7 sm:px-8 lg:px-16"
                style={{ backgroundImage: `url(${saleBack})` }}>

                <h2 className='md:text-3xl text-3xl text-white font-semibold '> Search Results</h2>
                <p className='text-white py-4 md:text-lg text-sm '>Choose from{" "} <span>{filteredFlights.length}</span>+ flights from  {loading
                    ? "Searching flights..."
                    : `${filteredFlights.length} flights from `}
                    {!loading && (
                        <>
                            <span className="font-bold">{flightData.from}</span>
                            {" to "}
                            <span className="font-bold">{flightData.to}</span>
                        </>
                    )}</p>
                <SearchModify allowModify={true} />
            </div>
            <div className="px-16">
                <Features />
            </div>
            <div className="px-4 md:px-16 mt-6">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">
                        {filteredFlights.length} Flights Found
                    </h2>

                    <button
                        onClick={() => setShowFilter(true)}
                        className="md:hidden flex items-center gap-2 bg-[#031e3d] text-white px-4 py-2 rounded-lg"
                    >
                        <FaFilter />
                        Filters
                    </button>
                </div>

                <div className="flex gap-6">

                    {/* Desktop Filter */}
                    <div className="hidden md:block w-[300px] shrink-0 sticky top-24 self-start">
                        <Filters
                            filters={filters}
                            setFilters={setFilters}
                            flights={allFlights}
                        />
                    </div>

                    {/* Results */}
                    <div className="flex-1 flex flex-col gap-6">

                        {/* loading */}

                        {loading && (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="animate-spin w-12 h-12 border-4 border-[#031e3d] border-t-transparent rounded-full" />
                                <p className="text-slate-500 font-medium">Searching best flights...</p>
                                <p className="text-slate-400 text-sm">
                                    {flightData.from} → {flightData.to}
                                </p>
                            </div>
                        )}


                        {/* error */}
                        {error && !loading && (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                                    <span className="text-3xl">✈️</span>
                                </div>
                                <p className="text-red-500 font-semibold">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-[#031e3d] text-white px-6 py-2 rounded-xl text-sm"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* no result */}

                        {!loading && !error && filteredFlights.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                    <span className="text-3xl">✈️</span>
                                </div>
                                <p className="text-xl font-semibold text-[#031e3d]">No flight is found</p>
                                <p className="text-slate-400 text-sm">Chnage the date or adjust the filter</p>
                            </div>
                        )}
                        {!loading && !error && filteredFlights.map(flight => (
                            <FlightCard
                                key={flight.booking_token}
                                flight={flight}
                                nextStep={nextStep}
                            />
                        ))}
                    </div>

                </div>

                {
                    showFilter && (
                        <>
                            {/* Backdrop */}
                            <div
                                onClick={() => setShowFilter(false)}
                                className="fixed inset-0 bg-black/50 z-40"
                            />

                            {/* Drawer */}
                            <div className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 overflow-y-auto p-4 shadow-xl transition-transform duration-300 ${showFilter ? "translate-x-0" : "-translate-x-full"}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-lg">
                                        Filters
                                    </h3>

                                    <button
                                        onClick={() => setShowFilter(false)}
                                        className="text-2xl"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <Filters
                                    filters={filters}
                                    setFilters={setFilters}
                                    flights={allFlights}
                                />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

