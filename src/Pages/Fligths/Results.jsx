import React, { useState } from "react";
import { SearchSummary } from "../../components/SearchSummary";
import { Filters } from "../../components/Filters";
import { FlightCard } from "../../components/FlightCard.jsx/FlightCard";
import { data, useLocation } from "react-router-dom";
import { SearchFlights } from "../../components/SearchFlights/SearchFlights";
import {Features} from "../../components/Features/Features"
import ResultImg from '../../assets/resultImg.png'

export const Results = ({nextStep}) => {
  
 
  
  const flights = [
  {
    id: 1,
    airline: "IndiGo",
    from: "DEL",
    to: "BOM",
    departure: "10:30 AM",
    arrival: "12:50 PM",
    duration: "2h 20m",
    price: 6499,
  },

  {
    id: 2,
    airline: "Air India",
    from: "DEL",
    to: "BOM",
    departure: "11:00 AM",
    arrival: "01:40 PM",
    duration: "2h 40m",
    price: 7200,
  },
];
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const [searchData, setSearchData] = useState(
    location.state || {
      from: "New Delhi",
      to: "Mumbai",
      date: "",
      travellers: 1,
    }
  );



  const handleModify = (newData) => {
    setSearchData(newData); // update data

    console.log("modi", newData)
    setEdit(false);         // close form
  };

  const [showFilter ,setShowFilter ] = useState(false)
  const [filters, setFilters] = useState({
    price: 10000,
    stops: [],
    airlines: [],
    departure: [],
  });
  return (
    <div>

      <div  className="w-full bg-cover bg-center px-16  pt-20 pb-7"
      style={{ backgroundImage: `url(${ResultImg})` }}>

        <h2 className='md:text-3xl text-3xl text-white font-semibold '> Search Results</h2>
				<p className='text-white py-4 md:text-lg text-sm '>Choose from <span>120</span>+ flights from <span>{searchData.from}</span> to <span>{searchData.to}</span></p>
				

        {edit ? (
          <SearchFlights
            initialData={searchData}
            onSearch={handleModify}
          />
        ) : (
          <SearchSummary
            from={searchData.from}
            to={searchData.to}
            date={searchData.date}
            travellers={searchData.travellers}
            onModify={() => setEdit(true)}
          />
        )}
      </div>
      <Features/>
      <div className="flex gap-6 mt-6 bg-gray-100 p-3">

        {/* LEFT SIDE */}
        <div className={`md:flex-[30%] flex-[40%] ` } >
          <Filters onClick={() => setShowFilter(!showFilter)} filters={filters} setFilters={setFilters} />

        </div>

        {/* RIGHT SIDE (your results) */}
        <div className="md:flex-[70%]  flex-[60%] flex flex-col gap-6">
          {/* Flight cards here */}
         {flights.map((flight) => (
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

