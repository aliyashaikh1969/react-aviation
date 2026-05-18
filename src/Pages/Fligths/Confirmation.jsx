import React from 'react'
import {
  FiCheck,
  FiCalendar,
  FiDownload,
  FiArrowRight,
  FiUser,
  FiCreditCard,
  FiHeadphones,
  FiGift,
  FiShield,
  FiClock,
  FiMail,
} from "react-icons/fi";

import {
  BsAirplaneFill,
} from "react-icons/bs";
import { useFlight } from '../../context/FlightContext';

export const Confirmation = () => {

    const { selectedFlight } = useFlight()
  
  return (
    <div className="min-h-screen bg-[#F5F7FB] px-16 pt-20 pb-10">

      <div className="max-w-7xl mx-auto">

        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-3xl overflow-hidden shadow-sm">

          <div className="grid lg:grid-cols-[1fr_300px] items-center">

            {/* Left */}
            <div className="p-5 flex gap-3">

              {/* Success Icon */}
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0 shadow-lg shadow-green-200">
                <FiCheck className="text-white text-2xl" />
              </div>

              {/* Content */}
              <div>

                <h1 className="text-2xl font-bold text-green-600">
                  Booking Confirmed!
                </h1>

                <p className="text-slate-600 mt-2 leading-8">
                  Thank you for booking with SkyBook.
                  Your booking has been confirmed and
                  ticket details have been sent to your email.
                </p>

                {/* Booking Info */}
                <div className="flex flex-wrap gap-10 mt-4">

                  <div>
                    <p className="text-sm text-slate-500">
                      Booking Reference (PNR)
                    </p>

                    <h3 className="text-lg font-bold text-[#0A2A6B] mt-1">
                      SBLK72451
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <FiCalendar className="text-blue-700 text-2xl" />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Booking Date
                      </p>

                      <h4 className="font-bold text-[#0A2A6B] text-lg mt-1">
                        24 May 2024 · 09:45 AM
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden lg:flex items-center justify-center p-6">

              <div className="relative">

                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full blur-2xl"></div>

                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
                  <BsAirplaneFill className="text-blue-700 text-5xl rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-6 mt-6">

          {/* Left Side */}
          <div className="space-y-6">

            {/* Flight Details */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

              {/* Top */}
              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold text-[#0A2A6B]">
                  Flight Details
                </h2>

                <div className="flex items-center gap-3">
                  <BsAirplaneFill className="text-blue-700 text-2xl rotate-45" />

                  <span className="text-xl font-bold text-[#0A2A6B]">
                    IndiGo
                  </span>
                </div>
              </div>

              {/* Flight Route */}
              <div className="grid md:grid-cols-3 items-center gap-6">

                {/* Departure */}
                <div>
                  <h3 className="text-xl font-bold text-[#0A2A6B]">
                    New Delhi (DEL)
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Indira Gandhi Intl. Airport
                  </p>

                  <h2 className="text-4xl font-bold text-[#0A2A6B] mt-5">
                    10:30
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    24 May 2024
                  </p>
                </div>

                {/* Center */}
                <div className="flex flex-col items-center">

                  <div className=" text-xs flex items-center gap-2 text-slate-500 mb-4">
                    <FiClock />
                    <span>2h 15m</span>
                  </div>

                  <div className="relative w-full flex items-center">

                    <div className="h-[2px] bg-slate-200 flex-1"></div>

                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-3 shadow-lg shadow-blue-100">
                      <BsAirplaneFill className="text-white text-lg rotate-90" />
                    </div>

                    <div className="h-[2px] bg-slate-200 flex-1"></div>
                  </div>

                  <div className="mt-4 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-xs">
                    Non-stop
                  </div>
                </div>

                {/* Arrival */}
                <div className="text-left md:text-right">

                  <h3 className="text-xl font-bold text-[#0A2A6B]">
                    Mumbai (BOM)
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Chhatrapati Shivaji Airport
                  </p>

                  <h2 className="text-4xl font-bold text-[#0A2A6B] mt-5">
                    12:45
                  </h2>

                  <p className="text-slate-500 mt-2">
                    24 May 2024
                  </p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8 pt-6 border-t border-slate-200">

                <div>
                  <p className="text-sm text-slate-500">
                    Flight Number
                  </p>

                  <h4 className="font-bold text-[#0A2A6B] mt-1">
                    6E 2345
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Aircraft
                  </p>

                  <h4 className="font-bold text-[#0A2A6B] mt-1">
                    Airbus A320
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Cabin Class
                  </p>

                  <h4 className="font-bold text-[#0A2A6B] mt-1">
                    Economy
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Baggage
                  </p>

                  <h4 className="font-bold text-[#0A2A6B] mt-1">
                    15 kg
                  </h4>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">

              {/* Passenger */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <FiUser className="text-blue-700 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0A2A6B] text-lg">
                      Passenger
                    </h3>

                    <p className="text-sm text-slate-500">
                      1 Passenger
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-slate-500">Name</span>
                    <span className="font-medium">Rahul Sharma</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Gender</span>
                    <span className="font-medium">Male</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">DOB</span>
                    <span className="font-medium">12 Feb 1995</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-medium">+91 9876543210</span>
                  </div>
                </div>
              </div>

              {/* Seat */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <FiCreditCard className="text-blue-700 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0A2A6B] text-lg">
                      Seat Details
                    </h3>

                    <p className="text-sm text-slate-500">
                      Economy Class
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-slate-500 text-xs">
                      Your Seat
                    </p>

                    <h2 className="text-3xl font-bold text-[#0A2A6B] mt-2">
                      7E
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center">
                    <FiCheck className="text-blue-700 text-2xl" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <FiShield className="text-blue-700 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0A2A6B] text-lg">
                      Payment
                    </h3>

                    <p className="text-xs text-slate-500">
                      Paid Successfully
                    </p>
                  </div>
                </div>

                <div className="space-y-3">

                  <div className="text-xs flex justify-between text-slate-600">
                    <span>Base Fare</span>
                    <span>₹ 8,999</span>
                  </div>

                  <div className="text-xs flex justify-between text-slate-600">
                    <span>Taxes</span>
                    <span>₹ 1,501</span>
                  </div>

                  <div className="text-xs flex justify-between text-slate-600">
                    <span>Seat Charge</span>
                    <span>₹ 299</span>
                  </div>

                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">

                    <span className="font-bold text-[#0A2A6B]">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#0A58FF]">
                      ₹ 10,799
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">

              <button className="flex-1 h-16 rounded-2xl border-2 border-blue-600 text-blue-700 font-semibold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3">
                <FiDownload className="text-xl" />

                Download Ticket
              </button>

              <button className="flex-1 h-16 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all text-white font-semibold text-lg shadow-lg shadow-blue-100 flex items-center justify-center gap-3">
                Go to My Trips

                <FiArrowRight className="text-xl" />
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* What's Next */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

              <h3 className="text-2xl font-bold text-[#0A2A6B] mb-6">
                What's Next?
              </h3>

              <div className="space-y-5">

                <div className="flex gap-4">

                  <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <FiMail className="text-blue-700 text-xl" />
                  </div>

                  <p className="text-slate-600 leading-7">
                    Your e-ticket has been sent to your email.
                  </p>
                </div>

                <div className="flex gap-4">

                  <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <FiClock className="text-blue-700 text-xl" />
                  </div>

                  <p className="text-slate-600 leading-7">
                    Arrive at airport at least 2 hours before departure.
                  </p>
                </div>

                <div className="flex gap-4">

                  <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <FiShield className="text-blue-700 text-xl" />
                  </div>

                  <p className="text-slate-600 leading-7">
                    Carry a valid ID proof for verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-slate-200 p-6 shadow-sm">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3 className="text-2xl font-bold text-[#0A2A6B]">
                    Need Help?
                  </h3>

                  <p className="text-slate-600 mt-3 leading-7">
                    Our customer support is available 24/7.
                  </p>

                  <button className="mt-5 h-12 px-6 rounded-2xl border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-all flex items-center gap-2">
                    <FiHeadphones />

                    Contact Support
                  </button>
                </div>

                <div className="hidden md:flex w-28 h-28 rounded-full bg-blue-100 items-center justify-center">
                  <FiHeadphones className="text-blue-700 text-5xl" />
                </div>
              </div>
            </div>

            {/* Refer Card */}
            <div className="bg-[#0A2A6B] rounded-3xl p-6 text-white shadow-xl overflow-hidden relative">

              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">

                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <FiGift className="text-4xl" />
                </div>

                <h3 className="text-3xl font-bold">
                  Refer & Earn
                </h3>

                <p className="mt-4 text-blue-100 leading-7">
                  Invite your friends and earn exciting rewards.
                </p>

                <button className="mt-6 h-12 px-6 rounded-2xl bg-white text-[#0A2A6B] font-semibold hover:bg-slate-100 transition-all">
                  Refer Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
