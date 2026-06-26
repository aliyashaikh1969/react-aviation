import React from 'react'
import {
  FiCreditCard,
  FiTag,
  FiCheckCircle,
} from "react-icons/fi";
import { useFlight } from '../context/FlightContext';


export const PriceDetails = () => {
  const { selectedFlight, selectedSeats, setSelectedSeats, flightData } = useFlight()

  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0)
  const TAXES = 1125;
  const totalTaxes = TAXES * flightData.travellers;

  const grandTotal = ((selectedFlight?.price ?? 0) * flightData.travellers) + seatTotal + totalTaxes;
  const charges = ((selectedFlight?.price ?? 0) * flightData.travellers) + totalTaxes;

  const airportCharges = (500 * flightData?.travellers)
  const servicefee = (250 * flightData?.travellers)
  const gst = (375 * flightData?.travellers)



  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 lg:p-6 shadow-md w-full">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <FiCreditCard className="text-blue-700 text-lg sm:text-xl" />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#0A2A6B]">
            Price Details
          </h2>

          <p className="text-xs sm:text-sm text-slate-500">
            Review your fare breakdown
          </p>
        </div>
      </div>

      {/* Price List */}
      <div className="space-y-3">

        <div className="flex justify-between items-center gap-3 text-sm">
          <span className="text-slate-600">
            Base Fare × {flightData.travellers}
          </span>

          <span className="font-semibold whitespace-nowrap">
            ₹{((selectedFlight?.price ?? 0) * flightData.travellers).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between items-center gap-3 text-sm">
          <span className="text-slate-600">
            Airport Charges × {flightData.travellers}
          </span>

          <span className="font-semibold whitespace-nowrap">
            ₹{airportCharges.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between items-center gap-3 text-sm">
          <span className="text-slate-600">
            Passenger Service Fee × {flightData.travellers}
          </span>

          <span className="font-semibold whitespace-nowrap">
            ₹{servicefee.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between items-center gap-3 text-sm">
          <span className="text-slate-600">
            GST × {flightData.travellers}
          </span>

          <span className="font-semibold whitespace-nowrap">
            ₹{gst.toLocaleString("en-IN")}
          </span>
        </div>

      </div>

      <div className="border-t border-dashed border-slate-200 my-5"></div>

      {/* Total */}
<div className="mt-4 bg-blue-50 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Total Amount
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#0A58FF] mt-1">
            ₹{charges.toLocaleString("en-IN")}
          </h3>
        </div>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center">
          <FiTag className="text-blue-700 text-xl sm:text-2xl" />
        </div>

      </div>

      {/* Savings */}
      <div className="mt-5 bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl p-3 flex items-start gap-3">

        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <FiCheckCircle className="text-green-700 text-lg" />
        </div>

        <div>
          <h4 className="text-green-800 font-semibold text-sm">
            You saved ₹876 on this booking
          </h4>

          <p className="text-xs sm:text-sm text-green-700 mt-1">
            Great choice! Enjoy your trip.
          </p>
        </div>

      </div>

    </div>

  )
}
