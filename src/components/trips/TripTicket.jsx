import { useState } from 'react'
import QRCode from 'react-qr-code'
import { fullName, inr } from '../../utils/format'
import { getTripStatus } from '../../constants/tripStatus'
import { LegRoute } from './LegRoute'

// Printable ticket for a saved booking. Pass `width` to render it at a fixed size for PDF export.
export const TripTicket = ({ booking, innerRef, width }) => {
  const { flight, fare, passengers } = booking
  const returnFlight = booking.returnFlight
  const isRoundTrip = booking.tripType === "round" && !!returnFlight
  const status = getTripStatus(booking.status)
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <div
      ref={innerRef}
      style={width ? { width } : undefined}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden print:rounded-none print:border-0 print:shadow-none"
    >
      <div className="bg-gradient-to-r from-navy to-navy-dark p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {flight?.airlineLogo && !logoFailed && (
            <img
              src={flight.airlineLogo}
              crossOrigin="anonymous"
              onError={() => setLogoFailed(true)}
              className="w-11 h-11 rounded-xl bg-white object-contain p-1"
              alt=""
            />
          )}
          <div>
            <p className="text-white font-semibold">{flight?.airline}</p>
            <p className="text-[#a8bcd8] text-xs">{flight?.flightNumber} · {flight?.airplane}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[#a8bcd8] text-[10px] uppercase tracking-widest">Booking ref</p>
          <p className="text-white font-bold tracking-[0.25em]">{booking.pnr}</p>
        </div>
      </div>

      <LegRoute
        flight={flight}
        variant={isRoundTrip ? "outbound" : undefined}
        badgeClassName="px-6 pt-4"
        rowClassName={`p-6 ${isRoundTrip ? "" : "border-b-2 border-dashed border-gray-200"}`}
      />

      {isRoundTrip && (
        <LegRoute
          flight={returnFlight}
          variant="return"
          badgeClassName="px-6"
          rowClassName="p-6 border-b-2 border-dashed border-gray-200"
        />
      )}

      <div className="p-5 border-b border-gray-100">
        <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-3">Passengers</p>
        <div className="divide-y divide-gray-100">
          {passengers?.map((passenger, i) => (
            <div key={passenger.id ?? i} className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center">{i + 1}</span>
                <span className="font-medium">{fullName(passenger) || passenger.name}</span>
                <span className="text-gray-400 text-xs">{passenger.passengerType || "Adult"}</span>
                <span className="text-gray-400 text-xs capitalize">{passenger.gender}</span>
              </div>
              <span className="bg-navy text-white text-xs px-2.5 py-1 rounded-md font-medium">{passenger.seat ?? '--'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end gap-6 p-5">
        <div className="flex-1 max-w-xs">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-3">Fare breakdown</p>
          <div className="text-sm text-gray-500 space-y-1.5">
            <div className="flex justify-between">
              <span>Base fare × {booking.travellers}{booking.tripType === "round" && booking.returnFlight ? " × 2 legs" : ""}</span>
              <span>{inr(fare?.baseFare)}</span>
            </div>
            <div className="flex justify-between"><span>Seat charges</span><span>{inr(fare?.seatTotal)}</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>{inr(fare?.taxes)}</span></div>
            {fare?.discount > 0 && (
              <div className="flex justify-between text-green-600"><span>Discount</span><span>-{inr(fare.discount)}</span></div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-semibold text-navy">
              <span>Total</span><span>{inr(fare?.grandTotal)}</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <QRCode value={JSON.stringify({ pnr: booking.pnr, from: flight?.from, to: flight?.to })} size={88} />
          <p className="text-[10px] text-gray-400 mt-1">Scan at airport</p>
        </div>
      </div>

      <div className="bg-blue-50 px-5 py-3 flex justify-between items-center gap-3">
        <p className="text-blue-700 text-xs truncate">{passengers?.[0]?.email}</p>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ring-1 ${status.badge}`}>{status.label}</span>
      </div>
    </div>
  )
}
