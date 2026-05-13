import React from 'react'
import {
  FiAirplay,
  FiClock,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

import { BsAirplaneFill } from "react-icons/bs";

export const FlightDetails = () => {
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
              <BsAirplaneFill className="text-blue-700 text-xl rotate-45" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0A2A6B]">
                IndiGo
              </h3>

              <p className="text-xs text-slate-500">
                6E 2112 | Economy
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

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Departure */}
            <div className="text-center lg:text-left">

              <h2 className="text-2xl font-bold text-[#0A2A6B]">
                10:00
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                24 May 2024
              </p>

              <h4 className="text-base font-semibold text-slate-800 mt-4">
                Mumbai (BOM)
              </h4>

              <p className="text-xs text-slate-500 mt-1 leading-6">
                Chhatrapati Shivaji <br />
                Maharaj Intl. Airport
              </p>
            </div>

            {/* Center */}
            <div className="flex flex-col items-center w-full max-w-[300px]">

              <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                <FiClock />
                <span>2h 30m</span>
              </div>

              {/* Flight Line */}
              <div className="relative w-full flex items-center">

                <div className="h-[2px] bg-slate-200 flex-1"></div>

                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-3 shadow-lg shadow-blue-100">
                  <BsAirplaneFill className="text-white text-sm rotate-90" />
                </div>

                <div className="h-[2px] bg-slate-200 flex-1"></div>
              </div>

              {/* Non Stop */}
              <div className="mt-4 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                Non-stop
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center lg:text-right">

              <h2 className="text-2xl font-bold text-[#0A2A6B]">
                12:30
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                24 May 2024
              </p>

              <h4 className="text-base font-semibold text-slate-800 mt-4">
                Delhi (DEL)
              </h4>

              <p className="text-xs text-slate-500 mt-1 leading-6">
                Indira Gandhi Intl. <br />
                Airport
              </p>
            </div>
          </div>

          {/* Bottom Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3 pt-6 border-t border-slate-200">

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
                  Airbus A320
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
                  Economy
                </h4>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
