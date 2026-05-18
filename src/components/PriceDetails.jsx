import React from 'react'
import {
  FiCreditCard,
  FiTag,
  FiCheckCircle,
} from "react-icons/fi";
import { useFlight } from '../context/FlightContext';


export const PriceDetails = () => {

  const { selectedFlight } = useFlight()
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-md w-full">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
          <FiCreditCard className="text-blue-700 text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#0A2A6B]">
            Price Details
          </h2>

          <p className="text-xs text-slate-500">
            Review your fare breakdown
          </p>
        </div>
      </div>

      {/* Price List */}
      <div className="space-y-4">

        {/* Base Fare */}
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-sm">
            Base Fare (1 × {selectedFlight?.price})
          </span>

          <span className="font-medium text-slate-800 text-sm">
            {selectedFlight?.price}
          </span>
        </div>

        {/* Airport Charges */}
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-sm">
            Airport Charges
          </span>

          <span className="font-medium text-slate-800 text-sm">
            ₹ 500
          </span>
        </div>

        {/* Service Fee */}
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-sm">
            Passenger Service Fee
          </span>

          <span className="font-medium text-slate-800 text-sm">
            ₹ 250
          </span>
        </div>

        {/* GST */}
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-sm">
            GST
          </span>

          <span className="font-medium text-slate-800 text-sm">
            ₹ 375
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-slate-200 my-6"></div>

      {/* Total */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            Total Amount
          </p>

          <h3 className="text-2xl font-bold text-[#0A58FF] mt-1">
            ₹ 3,624
          </h3>
        </div>

        <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
          <FiTag className="text-blue-700 text-2xl" />
        </div>
      </div>

      {/* Savings Box */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">

        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <FiCheckCircle className="text-green-700 text-xl" />
        </div>

        <div>
          <h4 className="text-green-800 font-semibold text-sm">
            You saved ₹876 on this booking
          </h4>

          <p className="text-xs text-green-700 mt-1">
            Great choice! Enjoy your trip.
          </p>
        </div>
      </div>

      {/* Pay Button */}
      {/* <button className="w-full h-14 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all duration-300 text-white font-semibold text-lg mt-6 shadow-lg shadow-blue-100">
        Confirm & Pay ₹3,624
      </button> */}

    </div>

  )
}
