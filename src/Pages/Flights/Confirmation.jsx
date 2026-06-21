import React, { useEffect, useRef, useState } from 'react'
import { FiCheck, FiCalendar, FiDownload, FiArrowRight, FiUser, FiCreditCard, FiHeadphones, FiGift, FiShield, FiClock, FiMail, FiUsers, } from "react-icons/fi";
import { BsAirplaneFill, } from "react-icons/bs";
import { useFlight } from '../../context/FlightContext';
import { useNavigate } from 'react-router-dom';
import { usePassenger } from '../../context/PassengerContext';
import { useScrollToTop } from "../../hooks/useScrollToTop";
import QRCode from "react-qr-code";

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'



export const Confirmation = () => {
  useScrollToTop();

  const [showTicket, setShowTicket] = useState(false)

  const { selectedFlight, resetFlightData, selectedSeats, flightData } = useFlight();
  const { passengerData, passengers } = usePassenger();

  const [activePax, setActivePax] = useState(0)

  const navigate = useNavigate();

  console.log("flightData", flightData.travellers)

  const firstFlight = selectedFlight?.flights?.[0];
  const TAXES = 1201;
  const seatTotal = selectedSeats.reduce((t, s) => t + s.price, 0);
  const grandTotal = ((selectedFlight?.price ?? 0) * flightData.travellers) + seatTotal + TAXES;


  const flightDuration = selectedFlight?.total_duration

  const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
  const minutes = String(flightDuration % 60).padStart(2, "0");




  const [pnr] = useState(
    () => `SBLK${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  );


  const bookingDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });


  const ticketRef = useRef(null)



  const handleDownload = async () => {
    try {
      if (!ticketRef.current) return;

      const canvas = await html2canvas(ticketRef.current, {
        scale: 3,          // better quality
        useCORS: true,
        backgroundColor: "#ffffff",
      })
      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF('p', 'mm', 'a4')

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)


      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pdfHeight;
      }
      pdf.save(`ticket-${pnr}.pdf`)

    } catch (error) {
      console.log("pdf Download Error:", error)
    }

  }



  const resetPage =()=>{
    navigate("/myTrip")
    resetFlightData()
  }

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
                    <p className="text-sm text-slate-500">  Booking Reference (PNR)  </p>

                    <h3 className="text-lg font-bold text-[#0A2A6B] mt-1">
                      {pnr}
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
                        {bookingDate}· 09:45 AM
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

          <div className="space-y-2">

            {/* Flight Details */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">

              {/* Top */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0A2A6B]"> Flight Details </h2>

                <div className="flex items-center gap-3">
                  <img src={firstFlight.airline_logo} alt="" className='w-8' />
                  <span className="text-xl font-bold text-[#0A2A6B]">
                    {firstFlight.airline}
                  </span>
                </div>
              </div>

              {/* Flight Route */}
              <div className="grid grid-cols-3 items-center gap-6">

                {/* Departure */}
                <div>
                  <h3 className="text-xl font-bold text-[#0A2A6B]">
                    {firstFlight?.departure_airport.id}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {firstFlight?.departure_airport.name}
                  </p>

                  <h2 className="text-2xl font-bold text-[#0A2A6B] mt-5">
                    {firstFlight?.departure_airport?.time.split(" ")[1]}
                  </h2>

                  <p className="text-xs text-slate-500 mt-2">
                    {firstFlight?.departure_airport?.time.split(" ")[0]}
                  </p>
                </div>

                {/* Center */}
                <div className="flex flex-col items-center">

                  <div className=" text-xs flex items-center gap-2 text-slate-500 mb-4">
                    <FiClock />
                    <span>{hours}h {minutes}m</span>
                  </div>

                  <div className="relative w-full flex items-center">

                    <div className="h-[2px] bg-slate-200 flex-1"></div>

                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mx-3 shadow-lg shadow-blue-100">
                      <BsAirplaneFill className="text-white text-lg rotate-90" />
                    </div>

                    <div className="h-[2px] bg-slate-200 flex-1"></div>
                  </div>

                  <div className="mt-4 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-xs">
                    {selectedFlight?.type === "One way" ? "Non-stop" : selectedFlight?.type}

                  </div>
                </div>

                {/* Arrival */}
                <div className="text-left md:text-right">

                  <h3 className="text-sm font-bold text-[#0A2A6B]">
                    {firstFlight?.arrival_airport.id}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {firstFlight?.arrival_airport.name}
                  </p>

                  <h2 className="text-2xl font-bold text-[#0A2A6B] mt-5">
                    {firstFlight?.arrival_airport?.time.split(" ")[1]}
                  </h2>

                  <p className="text-xs text-slate-500 mt-2">
                    {firstFlight?.arrival_airport?.time.split(" ")[0]}
                  </p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="grid grid-cols-4 md:grid-cols-4 gap-5 mt-8 pt-6 border-t border-slate-200">

                <div>
                  <p className="text-sm text-slate-500">
                    Flight Number
                  </p>

                  <h4 className="font-bold text-[#0A2A6B] mt-1">
                    {firstFlight?.flight_number}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Aircraft
                  </p>

                  <h4 className="font-bold text-[#0A2A6B] mt-1">
                    {firstFlight?.airplane}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Cabin Class
                  </p>

                  <h4 className="font-bold text-[#0A2A6B] mt-1">
                    {firstFlight?.travel_class}
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
            <div className="grid md:grid-cols-3 gap-4">

              {/* Passenger */}
              <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-3 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FiUsers className="text-blue-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A2A6B] text-lg">Passengers</h3>
                    <p className="text-sm text-slate-500">
                      {passengers?.length} passenger{passengers?.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {passengers?.length > 1 && (
                  <div className="flex gap-2 flex-wrap mb-4">
                    {passengers.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePax(i)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition-all
            ${activePax === i
                            ? "bg-[#0A2A6B] text-white border-[#0A2A6B]"
                            : "text-slate-500 border-slate-300 hover:border-slate-400"
                          }`}
                      >
                        Passenger {i + 1}
                      </button>
                    ))}
                  </div>
                )}

                {passengers?.[activePax] && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Full name", value: passengers[activePax].name },
                      { label: "Gender", value: passengers[activePax].gender },
                      { label: "Date of birth", value: passengers[activePax].dob },
                      { label: "Phone", value: passengers[activePax].number },
                      { label: "Email", value: passengers[activePax].email },
                      { label: "ID proof", value: `${passengers[activePax].IDProof} · ${passengers[activePax].IDNumber}` },
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-xs text-slate-400">{item.label}</p>
                        <p className="text-sm font-medium text-slate-800 mt-0.5">{item.value || "--"}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Seat Badge */}
                {selectedSeats[activePax] && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-[#0A2A6B] text-white rounded-lg px-3 py-1.5 text-sm font-medium">
                    Seat {selectedSeats[activePax].seatNo}
                  </div>
                )}

                {/* All seats summary */}
                {passengers?.length > 1 && (
                  <>
                    <hr className="border-slate-200 my-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">All seats</span>
                      <span className="font-medium">
                        {selectedSeats.map(s => s.seatNo).join(" · ")}
                      </span>
                    </div>
                  </>
                )}

              </div>


              {/* Payment */}
              <div className="bg-white rounded-3xl border border-slate-200 p-3 shadow-sm">

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
                    <span>₹ {(selectedFlight?.price) * flightData.travellers}</span>
                  </div>

                  <div className="text-xs flex justify-between text-slate-600">
                    <span>Taxes</span>
                    <span>₹ {TAXES}</span>
                  </div>

                  <div className="text-xs flex justify-between text-slate-600">
                    <span>Seat Charge</span>
                    <span>₹ {seatTotal}</span>
                  </div>

                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">

                    <span className="font-bold text-[#0A2A6B]">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#0A58FF]">
                      ₹ {grandTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">

              <button onClick={handleDownload} className="flex-1 h-16 rounded-2xl border-2 border-blue-600 text-blue-700 font-semibold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3">
                <FiDownload className="text-xl" />

                Download Ticket
              </button>

              <button onClick={() => resetPage()} className="flex-1 h-16 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all text-white font-semibold text-lg shadow-lg shadow-blue-100 flex items-center justify-center gap-3">
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

      <div ref={ticketRef} className=" bg-white"
        style={{
          top: 0, width: "900px", padding: "20px",
        }}>

        {/* Header — Navy Blue */}
        <div className="bg-[#0A2A6B] p-5 flex justify-between">
          <div className="flex items-center gap-3">
            <img src={selectedFlight?.airline_logo} className="w-10 h-10 rounded-lg bg-white object-contain p-1" alt="" />
            <div>
              <p className="text-white font-medium">{firstFlight?.airline}</p>
              <p className="text-[#a8bcd8] text-xs">
                {firstFlight?.flight_number} · {firstFlight?.travel_class} · {firstFlight?.airplane}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#a8bcd8] text-xs">Booking ref ({pnr})</p>
            <p className="text-white font-medium tracking-widest mt-1">SBLK72451</p>
          </div>
        </div>



        {/* Route */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <p className="text-4xl font-medium text-[#0A2A6B]">{firstFlight?.departure_airport?.id}</p>
            <p className="text-xs text-gray-500 mt-1">{firstFlight?.departure_airport?.name}</p>
            <p className="font-medium mt-2">{firstFlight?.departure_airport?.time?.split(" ")[1]}</p>
            <p className="text-xs text-gray-500">{firstFlight?.departure_airport?.time?.split(" ")[0]}</p>
          </div>
          <div className="flex flex-col items-center flex-1 px-4">
            <p className="text-xs text-gray-500 mb-2">{selectedFlight?.total_duration}m</p>
            <div className="flex items-center w-full gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-[#0A2A6B] text-xl">✈</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <p className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2">Non-stop</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-medium text-[#0A2A6B]">{firstFlight?.arrival_airport?.id}</p>
            <p className="text-xs text-gray-500 mt-1">{firstFlight?.arrival_airport?.name}</p>
            <p className="font-medium mt-2">{firstFlight?.arrival_airport?.time?.split(" ")[1]}</p>
            <p className="text-xs text-gray-500">{firstFlight?.arrival_airport?.time?.split(" ")[0]}</p>
          </div>
        </div>
        <div className="bg-[#EAF3DE] px-4 py-2">
          <p className="text-[#3B6D11] text-xs">
            ✓ Booking confirmed — E-ticket sent to {passengers?.[0]?.email}
          </p>
        </div>


        <div className="p-4 border-b">
          <p className="text-xs text-gray-400 mb-3">Passengers ({passengers?.length})</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Gender</th>
                <th className="text-left p-2">DOB</th>
                <th className="text-left p-2">ID proof</th>
                <th className="text-left p-2">Seat</th>
              </tr>
            </thead>
            <tbody>
              {passengers?.map((p, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-2 text-gray-400">{i + 1}</td>
                  <td className="p-2 font-medium">{p.name}</td>
                  <td className="p-2">{p.gender}</td>
                  <td className="p-2">{p.dob}</td>
                  <td className="p-2">{p.IDProof} · {p.IDNumber}</td>
                  <td className="p-2">
                    <span className="bg-[#0A2A6B] text-white text-xs p-2 rounded">
                      {selectedSeats[i]?.seatNo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fare summary */}
        <div className="p-4 border-b">
          <div className="flex justify-between text-xs text-gray-500 py-1">
            <span>Base fare × {passengers?.length}</span>
            <span>₹{((selectedFlight?.price ?? 0) * passengers?.length).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 py-1">
            <span>Seat charges</span>
            <span>₹{seatTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 py-1">
            <span>Taxes × {passengers?.length}</span>
            <span>₹{(TAXES * passengers?.length).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-1">
            <span className="font-medium">Total paid</span>
            <span className="font-medium text-[#0A2A6B]">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 border-t">
          <div>
            <p className="font-semibold">
              Passenger: {passengers?.[0]?.name}
            </p>
            <p>Seat: {selectedSeats?.[0]?.seatNo}</p>
          </div>

          <QRCode
            value={JSON.stringify({
              pnr,
              flightNo: firstFlight?.flight_number,
              passenger: passengers?.[0]?.name,
            })}
            size={90}
          />
        </div>

        {/* Footer */}
        <div className="bg-blue-50 p-4 flex justify-between items-center">
          <p className="text-blue-700 text-xs">E-ticket sent to {passengers?.[0]?.email}</p>
          <span className="text-green-700 bg-green-50 text-xs px-3 py-1 rounded-full">Confirmed</span>
        </div>
      </div>

    </div>
  )
}
