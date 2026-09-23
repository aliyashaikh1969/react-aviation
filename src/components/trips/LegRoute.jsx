import { BsAirplaneFill } from 'react-icons/bs'
import { AirportPoint } from '../flights/AirportPoint'
import { FlightPath } from '../flights/FlightPath'

const BADGE_SIZES = {
  sm: { badge: "w-5 h-5", icon: "text-[9px]" },
  md: { badge: "w-6 h-6", icon: "text-[10px]" },
}

// One leg's route row for a saved booking (used on the My Trips card and its expanded
// ticket). Pass `variant` ("outbound" | "return") to also show a small leg-direction badge
// above the row, for round-trip bookings -- leave it unset for a one-way booking.
export const LegRoute = ({ flight, variant, size = "md", badgeClassName = "", rowClassName = "" }) => {
  const { badge, icon } = BADGE_SIZES[size]

  return (
    <>
      {variant && (
        <div className={`flex items-center gap-2 ${badgeClassName}`}>
          <span className={`${badge} rounded-full flex items-center justify-center shrink-0 ${variant === "return" ? "bg-amber-50" : "bg-blue-50"}`}>
            <BsAirplaneFill className={`${icon} ${variant === "return" ? "text-amber-600 -rotate-[135deg]" : "text-blue-600"}`} />
          </span>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            {variant === "return" ? "Return" : "Outbound"}
          </p>
        </div>
      )}
      <div className={`flex items-center justify-between gap-4 ${rowClassName}`}>
        <AirportPoint emphasis="code" truncateName code={flight?.from} name={flight?.fromName} dateTime={flight?.departureTime} />
        <FlightPath duration={flight?.duration} label={flight?.type} />
        <AirportPoint emphasis="code" truncateName align="right" code={flight?.to} name={flight?.toName} dateTime={flight?.arrivalTime} />
      </div>
    </>
  )
}
