import React, { useState } from "react";
import { SearchSummary } from "../../components/SearchSummary";
import { Filters } from "../../components/Filters";
import { FlightCard } from "../../components/FlightCard.jsx/FlightCard";
import { data, useLocation } from "react-router-dom";
import { SearchFlights } from "../../components/SearchFlights/SearchFlights";
import { Features } from "../../components/Features/Features"
import planeImage from '../../assets/plane.jpg'
import { useFlight } from "../../context/FlightContext";
import { flightApiData } from "../../helperFunction";
export const Results = ({ nextStep }) => {
    
    const flights = flightApiData[0]?.other_flights
    const [edit, setEdit] = useState(false);
    const { flightData, setFlightData } = useFlight();

    const handleModify = (newData) => {
        setFlightData(newData); // update data

        setEdit(false);         // close form
    };

    const [showFilter, setShowFilter] = useState(false)
    const [filters, setFilters] = useState({
        price: 10000,
        stops: [],
        airlines: [],
        departure: [],
    });
    return (
        <div>


            <div className="w-full bg-cover bg-center px-16  pt-20 pb-7"
                style={{ backgroundImage: `url(${planeImage})` }}>

                <h2 className='md:text-3xl text-3xl text-white font-semibold '> Search Results</h2>
                <p className='text-white py-4 md:text-lg text-sm '>Choose from <span>120</span>+ flights from <span>{flightData.from}</span> to <span>{flightData.to}</span></p>


                {edit ? (
                    <SearchFlights
                        onSearch={handleModify}
                    />
                ) : (
                    <SearchSummary
                        onModify={() => setEdit(true)}
                    />
                )}
            </div>
            <div className="px-16">

                <Features />
            </div>
            <div className="flex gap-6 mt-6 bg-gray-100 p-3 px-16">

                {/* LEFT SIDE */}
                <div className={`md:flex-[30%] flex-[40%] `} >
                    <Filters onClick={() => setShowFilter(!showFilter)} filters={filters} setFilters={setFilters} />

                </div>

                {/* RIGHT SIDE (your results) */}
                <div className="md:flex-[70%]  flex-[60%] flex flex-col gap-6">
                    {/* Flight cards here */}
                    {flights?.map((flight) => (
                        <FlightCard
                            key={flight.id}
                            flight={flight}
                            nextStep={nextStep}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

