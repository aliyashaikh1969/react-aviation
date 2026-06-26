import React, { useMemo, useState } from "react";
import { SearchSummary } from "../../components/SearchSummary";
import { Filters } from "../../components/Filters";
import { useLocation } from "react-router-dom";
import { FlightCard } from "../../components/FlightCard/FlightCard"

import { SearchFlights } from "../../components/SearchFlights/SearchFlights";
import { Features } from "../../components/Features/Features"
import saleBack from '../../assets/sale-back.jpg'
import { useFlight } from "../../context/FlightContext";
import { flightApiData, getAllFlights } from "../../helperFunction";
import { SearchModify } from "../../components/search/SearchModify";
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { FaFilter } from "react-icons/fa";

export const Results = ({ nextStep }) => {

    useScrollToTop();

    const flights = flightApiData[0]?.other_flights ?? []

    const allFlights = getAllFlights();


    const { flightData } = useFlight()
    const [showFilter, setShowFilter] = useState(false)
    const [filters, setFilters] = useState({
        price: 15000,
        stops: [],
        airlines: [],
        departure: [],
    });
    // console.log(allFlights[0])

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
                <p className='text-white py-4 md:text-lg text-sm '>Choose from{" "} <span>{filteredFlights.length}</span>+ flights from <span>{flightData.from}</span> to{" "} <span>{flightData.to}</span></p>
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
                        {filteredFlights.map(flight => (
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

