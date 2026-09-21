import { FiAirplay, FiBriefcase, FiMapPin } from "react-icons/fi";
import { BsAirplaneFill } from "react-icons/bs";
import { useFlight } from '../../hooks/useFlight';
import { getStopsBadge, summarizeFlight } from '../../utils/flight';
import { AirportPoint } from './AirportPoint';
import { FlightPath } from './FlightPath';

// Read-only summary of the flight chosen for booking (used on summary, payment and confirmation).
export const FlightOverview = ({ status = "Selected", compact = false }) => {
  const { selectedFlight } = useFlight()
  const { legs, first, last, stops } = summarizeFlight(selectedFlight)

  const details = [
    { icon: FiAirplay, label: "Aircraft", value: legs.map(leg => leg.airplane).filter(Boolean).join(", ") || "—" },
    { icon: FiBriefcase, label: "Baggage", value: "15 kg check-in" },
    { icon: FiMapPin, label: "Cabin class", value: first?.travel_class ?? "—" },
  ]

  return (
    <div className="w-full">

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center">
          <BsAirplaneFill className="text-blue-700 text-base sm:text-lg" />
        </div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A2A6B]">Flight Details</h2>
      </div>

      <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">

        {/* Airline header */}
        <div className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-50 p-1.5 flex items-center justify-center shrink-0">
              <img src={selectedFlight?.airline_logo} className="w-full h-full object-contain" alt="" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#0A2A6B] truncate">{first?.airline}</h3>
              <p className="text-xs text-slate-500 truncate">
                {legs.map(leg => leg.flight_number).join(" · ")} | {first?.travel_class}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200 shrink-0">
            {status}
          </span>
        </div>

        <div className="p-4 sm:p-5">

          {/* Timing */}
          <div className={`flex flex-col ${compact ? "" : "md:flex-row md:items-center"} justify-between gap-6`}>
            <AirportPoint code={first?.departure_airport?.id} name={first?.departure_airport?.name} dateTime={first?.departure_airport?.time} />

            <FlightPath duration={selectedFlight?.total_duration} {...getStopsBadge(stops)} />

            <AirportPoint
              code={last?.arrival_airport?.id}
              name={last?.arrival_airport?.name}
              dateTime={last?.arrival_airport?.time}
              align={compact ? "left" : "right"}
            />
          </div>

          {/* Extra details */}
          <div className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-3"} gap-4 mt-6 pt-5 border-t border-slate-200`}>
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon className="text-slate-700 text-lg" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">{label}</p>
                  <h4 className="text-sm font-semibold text-slate-800 truncate">{value}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
