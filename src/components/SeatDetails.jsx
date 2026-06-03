import React, { useState } from "react";
import {
  FiCheck,
  FiX,
} from "react-icons/fi";

import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useFlight } from "../context/FlightContext";

export const SeatDetails = ({ prevStep }) => {
  const { selectedSeats } = useFlight()

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

         <button onClick={prevStep} className="text-blue-700 font-semibold hover:underline text-sm mt-4">
      Change Seats
    </button>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Side */}


        {/* Right Side */}
        <div className="w-full lg:w-[240px] bg-slate-50 border border-slate-200 rounded-3xl p-5">

          <h3 className="text-lg font-bold text-[#0A2A6B] mb-5">
            Your Seats
          </h3>

          <div className="flex flex-wrap gap-3">
            {selectedSeats.length > 0 ? (
              selectedSeats.map(seat => (
                <div key={seat.seatNo} className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold">
                  {seat.seatNo}  {/* ✅ seat.seatNo — object hai string nahi */}
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Koi seat select nahi ki</p>
            )}
          </div>
          {/* Info */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-slate-500">Total Seats</span>
              <span className="font-semibold">{selectedSeats.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Seat Charges</span>
              <span className="font-semibold">
                ₹{selectedSeats.reduce((total, seat) => total + seat.price, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
