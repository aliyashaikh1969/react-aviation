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
import { FaArrowRight } from 'react-icons/fa';
import { IoAirplane } from 'react-icons/io5';
import { FlightDetails } from '../../components/FlightDetails';

import { saveBooking } from "../../firebase/bookingFunctions"
import { useAuth } from "../../context/AuthContext"



export const Confirmation = () => {
  useScrollToTop();
  const { user } = useAuth()
  const [bookingSaved, setBookingSaved] = useState(false)


  const [showTicket, setShowTicket] = useState(false)

  const { selectedFlight, resetFlightData, selectedSeats, flightData } = useFlight();
  const { passengerData, passengers } = usePassenger();

  const [activePax, setActivePax] = useState(0)

  const navigate = useNavigate();


  const firstFlight = selectedFlight?.flights?.[0];
  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0)
  const TAXES = 1125;
  const totalTaxes = TAXES * flightData.travellers;

  const grandTotal = ((selectedFlight?.price ?? 0) * flightData.travellers) + seatTotal + totalTaxes;


  const flightDuration = selectedFlight?.total_duration

  const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
  const minutes = String(flightDuration % 60).padStart(2, "0");





  useEffect(() => {
    const save = async () => {
      if (!user || bookingSaved || !selectedFlight) return

      try {
        await saveBooking(user.uid, {
          pnr,
          flight: {
            airline: firstFlight?.airline,
            flightNumber: firstFlight?.flight_number,
            airplane: firstFlight?.airplane,
            airlineLogo: selectedFlight?.airline_logo,
            from: firstFlight?.departure_airport?.id,
            fromName: firstFlight?.departure_airport?.name,
            to: firstFlight?.arrival_airport?.id,
            toName: firstFlight?.arrival_airport?.name,
            departureTime: firstFlight?.departure_airport?.time,
            arrivalTime: firstFlight?.arrival_airport?.time,
            duration: selectedFlight?.total_duration,
            type: selectedFlight?.type,
          },
          passengers: passengers?.map((p, i) => ({
            ...p,
            seat: selectedSeats[i]?.seatNo ?? "--",
            seatPrice: selectedSeats[i]?.price ?? 0,
          })),
          seats: selectedSeats.map(s => s.seatNo),
          fare: {
            baseFare: selectedFlight?.price,
            seatTotal,
            taxes: TAXES * flightData.travellers,
            grandTotal,
          },
          tripType: flightData.tripType,
          travellers: flightData.travellers,
          status: "confirmed",
        })
        setBookingSaved(true)
      } catch (err) {
        console.error("Save error:", err)
      }
    }
    save()
  }, [])


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

  const resetPage = () => {
    navigate("/myTrips")
    resetFlightData()
  }

  const getPaymentLabel = (method) => {
    const labels = {
      card: "Credit / Debit Card",
      upi: "UPI",
      bank: "Net Banking",
      wallet: "Wallet",
    }
    return labels[method] ?? "Online Payment"
  }

  const getDayName = (dateStr)=>{

    if(!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-In',{weekday:'short'})    
  }

  const departureDay = getDayName(firstFlight?.departure_airport?.time?.split(" ")[0])
  const arivalDay = getDayName(firstFlight?.arrival_airport?.time?.split(" ")[0])

  return (
    <div className="px-4 sm:px-8 lg:px-16 pt-2 py-4">

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

          <FlightDetails />
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

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="flex-1 h-16 rounded-2xl border-2 border-blue-600 text-blue-700 font-semibold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
          >
            <FiDownload className="text-xl" />
            Download Ticket
          </button>

          <button
            onClick={resetPage}
            className="flex-1 h-16 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all text-white font-semibold text-lg shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
          >
            Go to My Trips
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* ticket  */}
      <div ref={ticketRef} className="fixed bg-white"
        style={{ left: "-10000px", top: 0, width: "900px", padding: "0" }}>

        {/* Header */}
        <div className="bg-[#0A2A6B] p-5 flex justify-between">
          <div className="flex items-center gap-3">
            <img src={selectedFlight?.airline_logo} className="w-10 h-10 rounded-lg bg-white object-contain p-1" alt="" />
            <div>
              <p className="text-white font-semibold">{firstFlight?.airline}</p>
              <p className="text-[#a8bcd8] text-xs">
                {firstFlight?.flight_number} · {firstFlight?.travel_class} · {firstFlight?.airplane} · SkyBook
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#a8bcd8] text-xs">Booking Reference (PNR)</p>
            <p className="text-white font-semibold tracking-widest mt-1">{pnr}</p>  {/* ✅ Fix 1 */}
          </div>
        </div>

        {/* Confirmed strip */}
        <div className="bg-[#EAF3DE] px-5 py-2 border-b border-[#c8e6b0]">
          <p className="text-[#3B6D11] text-xs font-medium">
            ✓ Booking Confirmed — E-ticket sent to {passengers?.[0]?.email}
          </p>
        </div>

        {/* Booking meta */}
        <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50">
          {[
            { label: "Booking Date", value: bookingDate },
            { label: "Ticket Type", value: "E-Ticket" },
            { label: "Journey Type", value: flightData.tripType === "round" ? "Round Trip" : "One Way" },
            { label: "Total Passengers", value: `${passengers?.length} Adult${passengers?.length > 1 ? "s" : ""}` },
          ].map((item, i) => (
            <div key={i} className="p-3 border-r border-gray-200 last:border-r-0">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-sm font-medium mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Route */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div>
            <p className="text-4xl font-semibold text-[#0A2A6B]">{firstFlight?.departure_airport?.id}</p>
            <p className="text-xs text-gray-500 mt-1">{firstFlight?.departure_airport?.name}</p>
            <p className="font-semibold mt-3">{firstFlight?.departure_airport?.time?.split(" ")[1]}</p>
            <p className="text-xs text-gray-500">{departureDay}, {firstFlight?.departure_airport?.time?.split(" ")[0]}</p>
          </div>
          <div className="flex flex-col items-center flex-1 px-6">
            <p className="text-xs text-gray-500 mb-2">{hours}h {minutes}m</p>  {/* ✅ Fix 5 */}
            <div className="flex items-center w-full gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow">
                <IoAirplane className="text-white " />
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2">
              {selectedFlight?.type === "One way" ? "Non-stop" : selectedFlight?.type}  {/* ✅ Fix 3 */}
            </span>
          </div>
          <div className="text-right">
            <p className="text-4xl font-semibold text-[#0A2A6B]">{firstFlight?.arrival_airport?.id}</p>
            <p className="text-xs text-gray-500 mt-1">{firstFlight?.arrival_airport?.name}</p>
            <p className="font-semibold mt-3">{firstFlight?.arrival_airport?.time?.split(" ")[1]}</p>
            <p className="text-xs text-gray-500">{arivalDay}, {firstFlight?.arrival_airport?.time?.split(" ")[0]}</p>
          </div>
        </div>

        {/* Flight info strip */}
        <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
          {[
            { label: "Flight No.", value: firstFlight?.flight_number },
            { label: "Aircraft", value: firstFlight?.airplane },
            { label: "Cabin Class", value: firstFlight?.travel_class },
            { label: "Baggage", value: "15 kg/person" },
            { label: "Check-in", value: "Opens 24h prior" },
          ].map((item, i) => (
            <div key={i} className="p-3 border-r border-gray-200 last:border-r-0">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-sm font-medium mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Passengers table */}
        <div className="p-4 border-b border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Passenger Details</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Gender</th>
                <th className="text-left p-2">Date of Birth</th>
                <th className="text-left p-2">ID Proof</th>
                <th className="text-left p-2">Phone</th>
                <th className="text-left p-2">Seat</th>
              </tr>
            </thead>
            <tbody>
              {passengers?.map((p, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-2 text-gray-400">{i + 1}</td>
                  <td className="p-2 font-semibold">{p.name}</td>
                  <td className="p-2">{p.gender}</td>
                  <td className="p-2">{p.dob}</td>
                  <td className="p-2">{p.IDProof} · {p.IDNumber}</td>
                  <td className="p-2">{p.number}</td>
                  <td className="p-2">
                    <span className="bg-[#0A2A6B] text-white text-xs px-2 py-1 rounded">
                      {selectedSeats[i]?.seatNo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fare summary */}
        <div className="p-4 border-b border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Fare Summary</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
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
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                <span className="font-semibold">Total Paid</span>
                <span className="font-semibold text-[#0A2A6B]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between py-1"><span>Payment Method</span><span>{getPaymentLabel(flightData.paymentMethod)}</span></div>
              <div className="flex justify-between py-1"><span>Booking Date</span><span>{bookingDate}</span></div>
              <div className="flex justify-between py-1"><span>Cancellation</span><span> {flightData.tripType === "round" ? "Partially refundable": "Non-refundable"}</span></div>
              <div className="flex justify-between py-1"><span>Meal</span><span>Not included</span></div>
              <div className="flex justify-between py-1"><span>Status</span><span className="text-green-700 font-semibold">✓ Confirmed</span></div>
            </div>
          </div>
        </div>

        {/* Important note */}
        <div className="mx-5 my-3 bg-[#FFF8E6] border-l-4 border-[#F59E0B] px-3 py-2 rounded-r">
          <p className="text-xs text-[#92400E] font-semibold">⚠️ Important</p>
          <p className="text-xs text-[#78350F] mt-1">
            Carry a valid government-issued photo ID at the airport. Web check-in opens 24 hours before departure.
          </p>
        </div>

        {/* QR + summary */}
        <div className="flex items-start justify-between p-4 border-t border-b border-gray-200">
          <div className="text-xs text-gray-600 space-y-1">
            {/* ✅ Fix 2 — join use karo */}
            <p><strong>Passengers:</strong> {passengers?.map(p => p.name).join(", ")}</p>
            <p><strong>Seats:</strong> {selectedSeats.map(s => s.seatNo).join(" · ")}</p>
            <p><strong>Flight:</strong> {firstFlight?.flight_number} · {firstFlight?.departure_airport?.id} → {firstFlight?.arrival_airport?.id}</p>
            <p><strong>PNR:</strong> {pnr}</p>
            <p className="text-gray-400 mt-2">Scan QR for digital check-in</p>
          </div>
          <QRCode
            value={JSON.stringify({
              pnr,
              flightNo: firstFlight?.flight_number,
              passengers: passengers?.map(p => p.name).join(", "),
              seats: selectedSeats.map(s => s.seatNo).join(", "),
              from: firstFlight?.departure_airport?.id,
              to: firstFlight?.arrival_airport?.id,
            })}
            size={90}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Terms & Conditions</p>
          <ul className="text-xs text-gray-500 space-y-2">
            {[
              "Passengers must carry a valid government-issued photo ID (Aadhaar, Passport, Voter ID, or Driving License) at check-in and boarding.",
              "Web check-in opens 24 hours before departure and closes 1 hour before scheduled departure. Airport check-in closes 45 minutes before departure.",
              "Baggage allowance is 15 kg check-in and 7 kg cabin baggage per passenger. Excess baggage charges will apply.",
              "This ticket is non-transferable. The name on the ticket must match the ID presented at the airport.",
              "Cancellation and rescheduling are subject to airline policy and applicable fees. Please visit the airline website for details.",
              "Passengers are advised to report at the airport at least 2 hours before departure for domestic flights.",
              "SkyBook acts as an intermediary and is not responsible for flight delays, cancellations, or changes made by the airline.",
              "In case of flight cancellation by the airline, refund will be processed within 7-10 business days to the original payment method.",
              "Prohibited items as per DGCA regulations are not allowed in cabin or checked baggage.",
              "This is a computer-generated e-ticket and does not require a signature or stamp to be valid.",
            ].map((term, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#0A2A6B] flex-shrink-0">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="bg-[#0A2A6B] p-4 flex justify-between items-center">
          <p className="text-[#a8bcd8] text-xs">
            E-ticket · {passengers?.[0]?.email ?? user?.email} · Booking ID: {pnr}
          </p>
          <p className="text-[#a8bcd8] text-xs">
            SkyAero · skyAero.com · support@skyAero.com
          </p>
        </div>
      </div>

    </div>
  )
}
