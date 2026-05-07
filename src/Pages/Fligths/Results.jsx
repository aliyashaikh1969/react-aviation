import React, { useState } from "react";
import { SearchSummary } from "../../components/SearchSummary";
import { Filters } from "../../components/Filters";
import { FlightCard } from "../../components/FlightCard.jsx/FlightCard";
import { data, useLocation } from "react-router-dom";
import { SearchFlights } from "../../components/SearchFlights/SearchFlights";
import {Features} from "../../components/Features/Features"
import ResultImg from '../../assets/resultImg.png'

export const Results = () => {
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


  const [filters, setFilters] = useState({
    price: 10000,
    stops: [],
    airlines: [],
    departure: [],
  });
  return (
    <div>
      <div  className="w-full bg-cover bg-center px-16 md:py-36 py-4"
      style={{ backgroundImage: `url(${ResultImg})` }}>

        <h2 className='md:text-7xl text-5xl text-white font-semibold '> Search Results</h2>
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
      <div className="flex gap-6 mt-6">

        {/* LEFT SIDE */}
        <div className="flex-[30%]">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* RIGHT SIDE (your results) */}
        <div className="flex-[75%] flex flex-col gap-6">
          {/* Flight cards here */}
          <FlightCard />
          <FlightCard />
          <FlightCard />
        </div>

      </div>



    </div>
  );
};
