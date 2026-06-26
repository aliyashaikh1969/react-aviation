import React from 'react'
import {
  FiAirplay,
  FiClock,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

import { BsAirplaneFill } from "react-icons/bs";
import { useFlight } from '../context/FlightContext';
import { IoIosAirplane } from 'react-icons/io';
import { IoAirplane } from 'react-icons/io5';

export const FlightDetails = () => {

  const { selectedFlight } = useFlight()
  const firstFlight = selectedFlight?.flights?.[0];

  const flightDuration = selectedFlight?.total_duration

  const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
  const minutes = String(flightDuration % 60).padStart(2, "0");



  return (
    <div className=" rounded-2xl sm:rounded-3xl   w-full">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center">
          <BsAirplaneFill className="text-blue-700 text-base sm:text-lg rotate-45" />
        </div>

        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A2A6B]">
          Flight Details
        </h2>

      </div>

      {/* Flight Card */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden">

        {/* Airline Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <img src={selectedFlight?.airline_logo} className='w-[100%] h-[100%] object-cover' alt="" />

            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0A2A6B]">
                {firstFlight?.airline}
              </h3>

              <p className="text-xs text-slate-500">
                {firstFlight?.flight_number } | {firstFlight?.travel_class}</p>
            </div>
          </div>

          {/* Status */}
          <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
            Confirmed
          </div>
        </div>

        {/* Flight Timing */}
        <div className="p-3">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Departure */}
            <div className="text-center lg:text-left">

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A2A6B]">{firstFlight?.departure_airport?.time.split(" ")[1]}</h2>

              <p className="text-xs text-slate-500 mt-2">
                {firstFlight?.departure_airport?.time.split(" ")[0]}

              </p>

              <h4 className="text-sm sm:text-base font-semibold text-slate-800 mt-4">
                {firstFlight?.departure_airport?.id}

              </h4>

              <p className="text-xs sm:text-sm break-words leading-5 text-slate-500 mt-1">
                {firstFlight?.departure_airport?.name}
              </p>
            </div>

            {/* Center */}
            <div className="flex flex-col items-center flex-1 px-2 sm:px-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">{hours}h {minutes}m</p>  {/* ✅ Fix 5 */}
              <div className="flex items-center w-full gap-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow">
                  <IoAirplane className="text-white " />
                </div>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2">
                {selectedFlight?.type === "One way" ? "Non-stop" : selectedFlight?.type}  {/* ✅ Fix 3 */}
              </span>
            </div>

            {/* Arrival */}
            <div className="text-center lg:text-right">

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A2A6B]">{firstFlight?.arrival_airport?.time.split(" ")[1]}</h2>

              <p className="text-xs text-slate-500 mt-2">
                {firstFlight?.arrival_airport?.time.split(" ")[0]}
              </p>

              <h4 className="text-sm sm:text-base font-semibold text-slate-800 mt-4">
                {firstFlight?.arrival_airport?.id}
              </h4>

              <p className="text-xs sm:text-sm break-words leading-5 text-slate-500 mt-1 ">
                {firstFlight?.arrival_airport?.name}
              </p>
            </div>
          </div>

          {/* Bottom Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 pt-6 border-t border-slate-200">

            {/* Aircraft */}
            <div className="flex items-start gap-3">

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <FiAirplay className="text-slate-700 text-lg" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Aircraft
                </p>

                <h4 className="text-sm font-semibold text-slate-800 mt-1">
                  {firstFlight?.airline}
                </h4>
              </div>
            </div>

            {/* Baggage */}
            <div className="flex items-start gap-3">

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <FiBriefcase className="text-slate-700 text-lg" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Baggage
                </p>

                <h4 className="text-sm font-semibold text-slate-800 mt-1">
                  15 kg Check-in
                </h4>
              </div>
            </div>

            {/* Cabin */}
            <div className="flex items-start gap-3">

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <FiMapPin className="text-slate-700 text-lg" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Cabin Class

                </p>

                <h4 className="text-sm font-semibold text-slate-800 mt-1">
                  {firstFlight?.travel_class}
                </h4>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
