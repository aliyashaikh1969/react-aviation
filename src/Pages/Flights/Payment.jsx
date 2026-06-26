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
import { FlightDetails } from '../../components/FlightDetails';


export const Payment = ({ nextStep, prevStep }) => {

  useScrollToTop();

  const { selectedFlight, selectedSeats, flightData } = useFlight()
  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0)
  const TAXES = 1125;
  const totalTaxes = TAXES * flightData.travellers;

  const baseFare = (selectedFlight?.price ?? 0) * flightData.travellers;

  const totalAmount = baseFare + seatTotal + totalTaxes;

  const flightDuration = selectedFlight?.total_duration

  const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
  const minutes = String(flightDuration % 60).padStart(2, "0");




  return (
    <div className="px-4 sm:px-6 lg:px-16 pt-6 lg:pt-20 pb-10">
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="flex-1 ">
          <PaymentMethod nextStep={nextStep} />

        </div>
        <div className="w-full xl:w-[380px] xl:sticky xl:top-6 self-start bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 ">
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

          <FlightDetails />

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
                <span className="font-medium">₹ {baseFare}</span>
              </div>

              <div className="text-xs flex items-center justify-between text-slate-600">
                <span>Seat Charges</span>
                <span className="font-medium">₹{seatTotal}</span>
              </div>

              <div className="text-xs flex items-center justify-between text-slate-600">
                <span>Taxes & Fees</span>
                <span className="font-medium">₹{totalTaxes}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-slate-200 mt-2 pt-3 flex items-center justify-between">

              <h3 className="text-lg font-bold text-[#0A2A6B]">
                Total Amount
              </h3>

              <h2 className="text-xl font-Bold text-[#0A58FF]">
                ₹{totalAmount.toLocaleString('en-IN')}
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
          <div className="grid grid-cols-3  gap-3 mt-4 pt-3 border-t border-slate-200">

            {/* Secure */}
            <div className="text-center">

              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
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

              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
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

              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
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
      </div>
      <div className="mt-6">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft />
          Back to Summary
        </button>
      </div>
    </div>
  )
}
