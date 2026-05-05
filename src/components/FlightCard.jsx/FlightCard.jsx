import React from 'react'

export const FlightCard = () => {
  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md flex justify-between items-center">
      
      <div>
        <h2 className="font-bold">IndiGo</h2>
        <p>DEL → BOM</p>
        <p>10:00 AM - 12:30 PM</p>
        <p className="text-sm text-gray-500">Non-stop · 2h 30m</p>
      </div>

      <div className="text-right">
        <h2 className="text-xl font-bold text-blue-600">₹4,999</h2>
        <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
          Select
        </button>
      </div>

    </div>
  );
};

