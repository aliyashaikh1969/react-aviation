import React, { useState } from "react";
import {
  FiCheck,
  FiX,
} from "react-icons/fi";

import { MdAirlineSeatReclineNormal } from "react-icons/md";

export const SeatDetails = ({prevStep}) => {
   const [selectedSeats, setSelectedSeats] = useState(["1A", "1B"]);

  const seats = [
    ["1A", "1B", "1C", "", "1D", "1E", "1F"],
    ["2A", "2B", "2C", "", "2D", "2E", "2F"],
    ["3A", "3B", "3C", "", "3D", "3E", "3F"],
    ["4A", "4B", "4C", "", "4D", "4E", "4F"],
  ];

  const unavailableSeats = ["2C", "3A", "3F"];

  const toggleSeat = (seat) => {

    if (!seat || unavailableSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md w-full">

      {/* Heading */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
            <MdAirlineSeatReclineNormal className="text-blue-700 text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A2A6B]">
              Selected Seats
            </h2>

            <p className="text-sm text-slate-500">
              Choose your preferred seats
            </p>
          </div>
        </div>

        <button onClick={prevStep} className="text-blue-700 font-semibold hover:underline text-sm">
          Change Seats
        </button>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Side */}
        <div className="flex-1">

          {/* Seat Labels */}
          <div className="grid grid-cols-7 gap-3 mb-4 px-1">

            {["A", "B", "C", "", "D", "E", "F"].map((item, index) => (
              <div
                key={index}
                className="text-center text-sm font-semibold text-slate-500"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Seats */}
          <div className="space-y-4">

            {seats.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-7 gap-3 items-center"
              >

                {row.map((seat, seatIndex) => {

                  if (seat === "") {
                    return <div key={seatIndex}></div>;
                  }

                  const isSelected = selectedSeats.includes(seat);
                  const isUnavailable = unavailableSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      onClick={() => toggleSeat(seat)}
                      className={`h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border text-sm font-semibold
                        
                        ${
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                            : isUnavailable
                            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700"
                        }
                      `}
                    >

                      {isUnavailable ? (
                        <FiX className="text-lg" />
                      ) : isSelected ? (
                        <FiCheck className="text-lg" />
                      ) : (
                        seat
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-8">

            {/* Selected */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-blue-600"></div>

              <span className="text-sm text-slate-600">
                Selected
              </span>
            </div>

            {/* Available */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md border border-slate-300 bg-white"></div>

              <span className="text-sm text-slate-600">
                Available
              </span>
            </div>

            {/* Unavailable */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-slate-200 flex items-center justify-center">
                <FiX className="text-slate-500 text-xs" />
              </div>

              <span className="text-sm text-slate-600">
                Unavailable
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[240px] bg-slate-50 border border-slate-200 rounded-3xl p-5">

          <h3 className="text-lg font-bold text-[#0A2A6B] mb-5">
            Your Seats
          </h3>

          {/* Selected Seats */}
          <div className="flex flex-wrap gap-3">

            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-100"
              >
                {seat}
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="mt-6 pt-5 border-t border-slate-200">

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">
                Total Seats
              </span>

              <span className="font-semibold text-slate-800">
                {selectedSeats.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Seat Price
              </span>

              <span className="font-semibold text-slate-800">
                Included
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
