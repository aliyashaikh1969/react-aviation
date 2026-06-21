import React from 'react'
import {
  FiAirplay,
  FiClock,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

import { BsAirplaneFill } from "react-icons/bs";
import { useFlight } from '../context/FlightContext';

export const FlightDetails = () => {

  const { selectedFlight } = useFlight()

    const flightDuration = selectedFlight?.total_duration

    const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
    const minutes = String(flightDuration % 60).padStart(2, "0");



  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-md w-full">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
          <BsAirplaneFill className="text-blue-700 text-lg rotate-45" />
        </div>


        <h2 className="text-xl font-bold text-[#0A2A6B]">
          Flight Details
        </h2>


      </div>

      {/* Flight Card */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden">

        {/* Airline Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <img src={selectedFlight?.airline_logo} className='w-[100%] h-[100%] object-cover' alt="" />

            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0A2A6B]">
                {selectedFlight?.flights.map((item) => item?.airline)}
              </h3>

              <p className="text-xs text-slate-500">
                {selectedFlight?.flights.map((item) => item?.flight_number)}  |                   {selectedFlight?.flights.map((item) => item.travel_class)}

              </p>
            </div>
          </div>

          {/* Status */}
          <div className="px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
            Confirmed
          </div>
        </div>

        {/* Flight Timing */}
        <div className="p-3">

          <div className="flex  items-center justify-between gap-8">

            {/* Departure */}
            <div className="text-center lg:text-left">

              <h2 className="text-2xl font-bold text-[#0A2A6B]">
                {selectedFlight?.flights.map((item) => item?.departure_airport?.time.split(" ")[1])}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                {selectedFlight?.flights.map((item) => item?.departure_airport?.time.split(" ")[0])}

              </p>

              <h4 className="text-base font-semibold text-slate-800 mt-4">
                {selectedFlight?.flights.map((item) => item?.departure_airport?.id)}

              </h4>

              <p className="text-xs text-slate-500 mt-1 leading-6">
                {selectedFlight?.flights.map((item) => item?.departure_airport?.name)}

              </p>
            </div>

            {/* Center */}
           

            {/* Arrival */}
            <div className="text-center lg:text-right">

              <h2 className="text-2xl font-bold text-[#0A2A6B]">
                {selectedFlight?.flights.map((item) => item?.arrival_airport?.time.split(" ")[1])}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                {selectedFlight?.flights.map((item) => item?.arrival_airport?.time.split(" ")[0])}
              </p>

              <h4 className="text-base font-semibold text-slate-800 mt-4">
                {selectedFlight?.flights.map((item) => item?.arrival_airport?.id)}
              </h4>

              <p className="text-xs text-slate-500 mt-1 leading-6">
                {selectedFlight?.flights.map((item) => item?.arrival_airport?.name)}

              </p>
            </div>
          </div>

          {/* Bottom Details */}
          <div className="grid grid-cols-3 gap-5 mt-3 pt-6 border-t border-slate-200">

            {/* Aircraft */}
            <div className="flex items-start gap-3">

              <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <FiAirplay className="text-slate-700 text-lg" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Aircraft
                </p>

                <h4 className="text-sm font-semibold text-slate-800 mt-1">
                  {selectedFlight?.flights.map((item) => item.airplane)}
                </h4>
              </div>
            </div>

            {/* Baggage */}
            <div className="flex items-start gap-3">

              <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
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

              <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                <FiMapPin className="text-slate-700 text-lg" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Cabin Class

                </p>

                <h4 className="text-sm font-semibold text-slate-800 mt-1">
                  {selectedFlight?.flights.map((item) => item.travel_class)}
                </h4>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
