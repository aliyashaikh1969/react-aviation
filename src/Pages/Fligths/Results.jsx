import React, { useState } from "react";
import { SearchSummary } from "../../components/SearchSummary";
import { Filters } from "../../components/Filters";
import { FlightCard } from "../../components/FlightCard.jsx/FlightCard";
import { data, useLocation } from "react-router-dom";
import { SearchFlights } from "../../components/SearchFlights/SearchFlights";

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

  return (
    <div className=" min-h-screen text-white p-6">
      <div>


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

      <div className="flex gap-6 mt-6">

        {/* Filters */}
        <div className="w-[25%]">
          <Filters />
        </div>

        {/* Results */}
        <div className="w-[75%] flex flex-col gap-4">
          <FlightCard />
          <FlightCard />
          <FlightCard />
        </div>

      </div>



    </div>
  );
};
