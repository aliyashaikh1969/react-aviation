import React, { useState } from 'react'
import PaymentMethod from '../../components/PaymentMethod'
import {
  FiCalendar,
  FiUser,
  FiCreditCard,
  FiShield,
  FiRefreshCcw,
  FiHeadphones,
  FiClock,
} from "react-icons/fi";

import { BsAirplaneFill } from "react-icons/bs";
import { useFlight } from '../../context/FlightContext';
import { FaArrowLeft } from 'react-icons/fa';
import { useScrollToTop } from "../../hooks/useScrollToTop"


export const Payment = ({ nextStep, prevStep }) => {

  useScrollToTop();
  
  const { selectedFlight, selectedSeats, flightData } = useFlight()
  const TAXES = 1125;

  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const grandTotal = (selectedFlight?.price ?? 0) + seatTotal + TAXES


  const flightDuration = selectedFlight?.total_duration

  const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
  const minutes = String(flightDuration % 60).padStart(2, "0");




  return (
    <div className='relative flex justify-center gap-5 pb-10 pt-20 px-16 flex-col md:flex-row'>
      <div>
        <PaymentMethod nextStep={nextStep} />

      </div>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-3 w-full md:max-w-md">

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#0A2A6B]">
            Your Booking Summary
          </h2>

          <p className="text-slate-500 mt-1 text-xs">
            Review your trip details before payment
          </p>
        </div>

        {/* Flight Details Card */}
        <div className="border border-slate-200 rounded-3xl p-5">

          {/* Top */}
          <div className="flex items-start justify-between mb-5">

            <div>
              <h3 className="font-bold text-[#0A2A6B] text-lg">
                Flight Details
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                {selectedFlight?.flights?.[0]?.flight_number} |{" "}
                {selectedFlight?.flights?.[0]?.airplane ?? "Economy"}
              </p>
            </div>

            <button className="text-blue-600 text-sm font-semibold hover:underline">
              Change
            </button>
          </div>

          {/* Airline */}
          <div className="flex items-center gap-3 mb-6">

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <img src={selectedFlight?.airline_logo} className='w-[100%] h-[100%] object-cover' alt="" />
            </div>

            <div>
              <h4 className="font-bold text-[#0A2A6B]">
                {selectedFlight?.flights?.[0]?.airline}
              </h4>

              <p className="text-xs text-slate-500">
                Non-stop Flight
              </p>
            </div>
          </div>

          {/* Flight Route */}
          <div className="flex items-center justify-between">

            {/* From */}
            <div>
              <h2 className="text-2xl font-bold text-[#0A2A6B]">
                {selectedFlight?.flights[0].departure_airport?.id}

              </h2>

              <p className="text-slate-500 mt-1 text-xs max-w-32">
                {selectedFlight?.flights?.[0]?.departure_airport?.name}

              </p>

              <p className="text-sm font-semibold text-slate-800 mt-2">
                {selectedFlight?.flights?.[0]?.departure_airport?.time.split(" ")[1]}
              </p>
            </div>

            {/* Flight Middle */}
            <div className="flex flex-col items-center flex-1 px-4">
              <div className='flex items-center gap-2  text-xs text-gray-500'>
                <FiClock />
                <span className='text-xs text-gray-500'>{hours}h:{minutes}m</span>
              </div>

              <div className="relative w-full flex items-center">

                <div className="h-[2px] bg-slate-200 flex-1"></div>

                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mx-2 shadow-md">
                  <BsAirplaneFill className="text-white text-xs rotate-90" />
                </div>

                <div className="h-[2px] bg-slate-200 flex-1"></div>
              </div>

              <span className="text-xs text-blue-700 bg-blue-50 px-3 py-1 rounded-full mt-3 font-medium">
                {selectedFlight?.type === "One way" ? "Non-stop" : selectedFlight?.type}
              </span>
            </div>

            {/* To */}
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#0A2A6B]">
                {selectedFlight?.flights.map((item) => item?.arrival_airport?.id)}

              </h2>

              <p className="text-slate-500 mt-1 text-xs max-w-32">
                {selectedFlight?.flights.map((item) => item?.arrival_airport?.name)}

              </p>

              <p className="text-xs font-semibold text-slate-800 mt-2">
                {selectedFlight?.flights.map((item) => item?.arrival_airport?.time.split(" ")[1])}
              </p>
            </div>
          </div>

          {/* Extra Info */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-5 border-t border-slate-200">

            {/* Date */}
            <div className="flex items-start gap-2">

              <FiCalendar className="text-blue-700 text-lg mt-1" />

              <div>
                <p className="text-xs text-slate-500">
                  Date
                </p>

                <h4 className="font-semibold text-xs text-slate-800 mt-1">
                  {selectedFlight?.flights.map((item) => item?.departure_airport?.time.split(" ")[0])}

                </h4>
              </div>
            </div>

            {/* Passenger */}
            <div className="flex items-start gap-2">

              <FiUser className="text-blue-700 text-lg mt-1" />

              <div>
                <p className="text-xs text-slate-500">
                  Passenger
                </p>

                <h4 className="font-semibold text-xs text-slate-800 mt-1">
                  {flightData.travellers} Adult{flightData.travellers > 1 ? "s" : ""}
                </h4>
              </div>
            </div>

            {/* Seat */}
            <div className="flex items-start gap-2">

              <FiCreditCard className="text-blue-700 text-lg mt-1" />

              <div>
                <p className="text-xs text-slate-500">
                  Seats
                </p>

                <h4 className="font-semibold text-xs text-slate-800 mt-1">
                  {selectedSeats.length > 0
                    ? selectedSeats.map(s => s.seatNo).join(", ")
                    : "--"}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="border border-slate-200 rounded-3xl p-5 mt-5">

          {/* Top */}
          <div className="flex items-center justify-between mb-5">

            <h3 className="font-bold text-[#0A2A6B] text-lg">
              Fare Breakdown
            </h3>

            <button className="text-blue-600 text-xs font-semibold hover:underline">
              View Details
            </button>
          </div>

          {/* Price Items */}
          <div className="space-y-4">

            <div className="text-xs flex items-center justify-between text-slate-600">
              <span>Base Fare</span>
              <span className="font-medium">₹ {selectedFlight?.price}</span>
            </div>

            <div className="text-xs flex items-center justify-between text-slate-600">
              <span>Seat Charges</span>
              <span className="font-medium">₹{seatTotal}</span>
            </div>

            <div className="text-xs flex items-center justify-between text-slate-600">
              <span>Taxes & Fees</span>
              <span className="font-medium">₹{TAXES}</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-slate-200 mt-2 pt-3 flex items-center justify-between">

            <h3 className="text-lg font-bold text-[#0A2A6B]">
              Total Amount
            </h3>

            <h2 className="text-xl font-bold text-[#0A58FF]">
              ₹{grandTotal.toLocaleString('en-IN')}
            </h2>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-3 bg-green-50 border border-green-200 rounded-2xl p-3 flex items-start gap-3">

          <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <FiShield className="text-green-700 text-xl" />
          </div>

          <div>
            <h4 className="font-semibold text-green-800">
              Best Price Guarantee
            </h4>

            <p className="text-xs text-green-700 mt-1">
              We ensure you get the best prices on every booking.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t border-slate-200">

          {/* Secure */}
          <div className="text-center">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
              <FiShield className="text-blue-700 text-xl" />
            </div>

            <h4 className="font-semibold text-sm text-[#0A2A6B] mt-3">
              Secure
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              100% protected
            </p>
          </div>

          {/* Refund */}
          <div className="text-center">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
              <FiRefreshCcw className="text-blue-700 text-xl" />
            </div>

            <h4 className="font-semibold text-sm text-[#0A2A6B] mt-3">
              Refunds
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              Hassle-free
            </p>
          </div>

          {/* Support */}
          <div className="text-center">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
              <FiHeadphones className="text-blue-700 text-xl" />
            </div>

            <h4 className="font-semibold text-sm text-[#0A2A6B] mt-3">
              Support
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              24/7 Help
            </p>
          </div>
        </div>
       
      </div>
       <div className="flex justify-between  md:absolute bottom-0 left-20 p-3 ">
          <button onClick={prevStep} className="flex items-center gap-2 text-blue-600">
            <FaArrowLeft /> Back to Summary
          </button>
        </div>
    </div>
  )
}
