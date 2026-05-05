import React from "react";
import { FaPlaneDeparture, FaUserFriends } from "react-icons/fa";
import { useLocation } from "react-router-dom";
export const SearchSummary = ({ from, to, date, travellers,onModify }) => {
//     const location = useLocation();
// const { from, to, date, travellers } = location.state;



  return (
    <div className="bg-white text-black rounded-xl p-5 shadow-md flex justify-between items-center">
      
      <div className="flex items-center gap-6">
        <div>
          <p className="text-sm text-gray-500">From</p>
          <h2 className="font-bold">{from}</h2>
        </div>

        ✈

        <div>
          <p className="text-sm text-gray-500">To</p>
          <h2 className="font-bold">{to}</h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>
          <h2 className="font-bold">{date}</h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Travellers</p>
          <h2 className="font-bold">{travellers}</h2>
        </div>
      </div>

       <button
        onClick={onModify}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Modify
      </button>
    </div>
  );
};
