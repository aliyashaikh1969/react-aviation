import React, { useMemo, useState } from "react";
import { SearchSummary } from "../../components/SearchSummary";
import { Filters } from "../../components/Filters";
import { useLocation } from "react-router-dom";
import { FlightCard } from "../../components/FlightCard/FlightCard"

import { SearchFlights } from "../../components/SearchFlights/SearchFlights";
import { Features } from "../../components/Features/Features"
import planeImage from '../../assets/plane.jpg'
import { useFlight } from "../../context/FlightContext";
import { flightApiData, getAllFlights } from "../../helperFunction";
import { SearchModify } from "../../components/search/SearchModify";
export const Results = ({ nextStep }) => {

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


            const airlineMatch =filters.airlines.length ===0 || filters.airlines.includes(firstFlight?.airline)
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
            <div className="w-full bg-cover bg-center px-16  pt-20 pb-7"
                style={{ backgroundImage: `url(${planeImage})` }}>

                <h2 className='md:text-3xl text-3xl text-white font-semibold '> Search Results</h2>
                <p className='text-white py-4 md:text-lg text-sm '>Choose from{" "} <span>{filteredFlights.length}</span>+ flights from <span>{flightData.from}</span> to{" "} <span>{flightData.to}</span></p>
                <SearchModify />

            </div>
            <div className="px-16">
                <Features />
            </div>
            <div className="flex gap-6 mt-6 bg-gray-100 p-3 px-16">

                {/* LEFT SIDE */}
                <div className={`md:flex-[30%] flex-[40%]  `} >
                    <Filters
                        filters={filters}
                        setFilters={setFilters}
                        flights={allFlights} />
                </div>

                {/* RIGHT SIDE (your results) */}
                <div className="md:flex-[70%]  flex-[60%] flex flex-col gap-6">
                    {/* Flight cards here */}
                    {filteredFlights.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-xl font-semibold">Koi flight nahi mili 😕</p>
                            <p className="text-sm mt-2">Filters thoda adjust karo</p>
                        </div>
                    ) : (
                        filteredFlights.map(flight => (
                            <FlightCard
                                key={flight.booking_token}
                                flight={flight}
                                nextStep={nextStep}
                            />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

