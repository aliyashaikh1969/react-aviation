import QRCode from "react-qr-code";
import { IoAirplane } from 'react-icons/io5';
import { BsAirplaneFill } from 'react-icons/bs';
import { TAXES_PER_PASSENGER } from '../../constants/fare';
import { PAYMENT_METHOD_LABELS } from '../../constants/payment';
import { formatDuration, fullName, summarizePassengerTypes } from '../../utils/format';
import { getStopsBadge, summarizeFlight } from '../../utils/flight';

const weekdayOf = (isoDate) =>
  isoDate ? new Date(isoDate).toLocaleDateString('en-IN', { weekday: 'short' }) : ''

// Small "Outbound"/"Return" section label, used above each leg on a round-trip ticket.
const LegBadge = ({ variant }) => (
  <div className="flex items-center gap-2 px-5 pt-4">
    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${variant === "return" ? "bg-amber-50" : "bg-blue-50"}`}>
      <BsAirplaneFill className={`text-[10px] ${variant === "return" ? "text-amber-600 -rotate-[135deg]" : "text-blue-600"}`} />
    </span>
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{variant === "return" ? "Return" : "Outbound"}</p>
  </div>
)

// Route + flight-info-strip for one leg. Used once for a one-way ticket, twice (outbound
// and return) for a round trip -- kept as one component so the two never drift apart.
const TicketLeg = ({ flight }) => {
  const { first, stops } = summarizeFlight(flight)
  const departureDay = weekdayOf(first?.departure_airport?.time?.split(" ")[0])
  const arrivalDay = weekdayOf(first?.arrival_airport?.time?.split(" ")[0])

  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div>
          <p className="text-4xl font-semibold text-navy">{first?.departure_airport?.id}</p>
          <p className="text-xs text-gray-500 mt-1">{first?.departure_airport?.name}</p>
          <p className="font-semibold mt-3">{first?.departure_airport?.time?.split(" ")[1]}</p>
          <p className="text-xs text-gray-500">{departureDay}, {first?.departure_airport?.time?.split(" ")[0]}</p>
        </div>
        <div className="flex flex-col items-center flex-1 px-6">
          <p className="text-xs text-gray-500 mb-2">{formatDuration(flight?.total_duration)}</p>
          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow">
              <IoAirplane className="text-white " />
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2">
            {getStopsBadge(stops).label}
          </span>
        </div>
        <div className="text-right">
          <p className="text-4xl font-semibold text-navy">{first?.arrival_airport?.id}</p>
          <p className="text-xs text-gray-500 mt-1">{first?.arrival_airport?.name}</p>
          <p className="font-semibold mt-3">{first?.arrival_airport?.time?.split(" ")[1]}</p>
          <p className="text-xs text-gray-500">{arrivalDay}, {first?.arrival_airport?.time?.split(" ")[0]}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
        {[
          { label: "Flight No.", value: first?.flight_number },
          { label: "Aircraft", value: first?.airplane },
          { label: "Cabin Class", value: first?.travel_class },
          { label: "Baggage", value: "15 kg/person" },
          { label: "Check-in", value: "Opens 24h prior" },
        ].map((item, i) => (
          <div key={i} className="p-3 border-r border-gray-200 last:border-r-0">
            <p className="text-xs text-gray-400">{item.label}</p>
            <p className="text-sm font-medium mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// Full e-ticket. Pass `offscreen` (default true) to render it hidden off-screen just so it
// can be captured as a PDF (see downloadElementAsPdf) — set it to false to show the ticket
// on the page itself, e.g. on the confirmation page.
export const ETicket = ({ innerRef, pnr, bookingDate, selectedFlight, selectedReturnFlight, passengers, selectedSeats, searchData, seatTotal, discount, grandTotal, userEmail, offscreen = true }) => {
  const isRoundTrip = searchData.tripType === "round" && !!selectedReturnFlight
  const legCount = isRoundTrip ? 2 : 1

  const { first } = summarizeFlight(selectedFlight)
  const { first: returnFirst } = summarizeFlight(selectedReturnFlight)

  const combinedBaseFare = ((selectedFlight?.price ?? 0) + (isRoundTrip ? selectedReturnFlight?.price ?? 0 : 0)) * (passengers?.length ?? 0)
  const combinedTaxes = TAXES_PER_PASSENGER * (passengers?.length ?? 0) * legCount

  return (
    <div
      ref={innerRef}
      className={offscreen
        ? "fixed bg-white"
        : "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden shrink-0 w-[900px] print:w-full print:rounded-none print:border-0 print:shadow-none"}
      style={offscreen ? { left: "-10000px", top: 0, width: "900px", padding: "0" } : undefined}
    >

      {/* Header */}
      <div className="bg-navy p-5 flex justify-between">
        <div className="flex items-center gap-3">
          <img
            src={selectedFlight?.airline_logo}
            onError={(e) => { e.currentTarget.style.display = "none" }}
            className="w-10 h-10 rounded-lg bg-white object-contain p-1"
            alt=""
          />
          <div>
            <p className="text-white font-semibold">{first?.airline}</p>
            <p className="text-[#a8bcd8] text-xs">
              {first?.flight_number} · {first?.travel_class} · {first?.airplane} · SkyBook
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[#a8bcd8] text-xs">Booking Reference (PNR)</p>
          <p className="text-white font-semibold tracking-widest mt-1">{pnr}</p>  
        </div>
      </div>

      {/* Confirmed strip */}
      <div className="bg-[#EAF3DE] px-5 py-2 border-b border-[#c8e6b0]">
        <p className="text-[#3B6D11] text-xs font-medium">
          ✓ Booking Confirmed — E-ticket issued to {passengers?.[0]?.email}
        </p>
      </div>

      {/* Booking meta */}
      <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50">
        {[
          { label: "Booking Date", value: bookingDate },
          { label: "Ticket Type", value: "E-Ticket" },
          { label: "Journey Type", value: searchData.tripType === "round" ? "Round Trip" : "One Way" },
          { label: "Total Passengers", value: summarizePassengerTypes(passengers) || `${passengers?.length ?? 0}` },
        ].map((item, i) => (
          <div key={i} className="p-3 border-r border-gray-200 last:border-r-0">
            <p className="text-xs text-gray-400">{item.label}</p>
            <p className="text-sm font-medium mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {isRoundTrip && <LegBadge variant="outbound" />}
      <TicketLeg flight={selectedFlight} />

      {isRoundTrip && (
        <>
          <LegBadge variant="return" />
          <TicketLeg flight={selectedReturnFlight} />
        </>
      )}

      {/* Passengers table */}
      <div className="p-4 border-b border-gray-200">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Passenger Details</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400">
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Gender</th>
              <th className="text-left p-2">Date of Birth</th>
              <th className="text-left p-2">ID Proof</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">Seat</th>
            </tr>
          </thead>
          <tbody>
            {passengers?.map((p, i) => (
              <tr key={p.id ?? i} className="border-t border-gray-100">
                <td className="p-2 text-gray-400">{i + 1}</td>
                <td className="p-2 font-semibold">{fullName(p)}</td>
                <td className="p-2">{p.passengerType || "Adult"}</td>
                <td className="p-2">{p.gender}</td>
                <td className="p-2">{p.dob}</td>
                <td className="p-2">{p.IDProof} · {p.IDNumber}</td>
                <td className="p-2">{p.number}</td>
                <td className="p-2">
                  <span className="bg-navy text-white text-xs px-2 py-1 rounded">
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
              <span>Base fare × {passengers?.length}{isRoundTrip ? " × 2 legs" : ""}</span>
              <span>₹{combinedBaseFare.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 py-1">
              <span>Seat charges</span>
              <span>₹{seatTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 py-1">
              <span>Taxes × {passengers?.length}{isRoundTrip ? " × 2 legs" : ""}</span>
              <span>₹{combinedTaxes.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-xs text-green-600 py-1">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
              <span className="font-semibold">Total Paid</span>
              <span className="font-semibold text-navy">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between py-1"><span>Payment Method</span><span>{PAYMENT_METHOD_LABELS[searchData.paymentMethod] ?? "Online Payment"}</span></div>
            <div className="flex justify-between py-1"><span>Booking Date</span><span>{bookingDate}</span></div>
            <div className="flex justify-between py-1"><span>Cancellation</span><span> {searchData.tripType === "round" ? "Partially refundable": "Non-refundable"}</span></div>
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
          
          <p><strong>Passengers:</strong> {passengers?.map(p => fullName(p)).join(", ")}</p>
          <p><strong>Seats:</strong> {selectedSeats.map(s => s.seatNo).join(" · ")}</p>
          <p>
            <strong>{isRoundTrip ? "Outbound:" : "Flight:"}</strong> {first?.flight_number} · {first?.departure_airport?.id} → {first?.arrival_airport?.id}
          </p>
          {isRoundTrip && (
            <p>
              <strong>Return:</strong> {returnFirst?.flight_number} · {returnFirst?.departure_airport?.id} → {returnFirst?.arrival_airport?.id}
            </p>
          )}
          <p><strong>PNR:</strong> {pnr}</p>
          <p className="text-gray-400 mt-2">Scan QR for digital check-in</p>
        </div>
        <QRCode
          value={JSON.stringify({
            pnr,
            flightNo: first?.flight_number,
            returnFlightNo: isRoundTrip ? returnFirst?.flight_number : undefined,
            passengers: passengers?.map(p => fullName(p)).join(", "),
            seats: selectedSeats.map(s => s.seatNo).join(", "),
            from: first?.departure_airport?.id,
            to: first?.arrival_airport?.id,
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
              <span className="text-navy flex-shrink-0">•</span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="bg-navy p-4 flex justify-between items-center">
        <p className="text-[#a8bcd8] text-xs">
          E-ticket · {passengers?.[0]?.email ?? userEmail} · Booking ID: {pnr}
        </p>
        <p className="text-[#a8bcd8] text-xs">
          SkyAero · skyAero.com · support@skyAero.com
        </p>
      </div>
    </div>
  )
}
