import { IoBagHandleOutline } from "react-icons/io5"
import { GiMeal } from "react-icons/gi"
import { PiSeatBold } from "react-icons/pi"
import { useNavigate } from 'react-router-dom'
import { useFlight } from '../../hooks/useFlight'
import { ROUTES } from '../../constants/routes'
import { formatDuration, inr, splitDateTime } from '../../utils/format'
import { getStopsBadge, summarizeFlight } from '../../utils/flight'
import { FlightPath } from './FlightPath'

const AMENITIES = [
  { Icon: IoBagHandleOutline, text: "15 kg baggage" },
  { Icon: GiMeal, text: "Meal available" },
  { Icon: PiSeatBold, text: "Standard seat" },
]

export const FlightCard = ({ flight, onSelect }) => {
  const { setSelectedFlight, setDetailFlight } = useFlight()
  const navigate = useNavigate()

  const selectFlight = () => {
    setSelectedFlight(flight)
    onSelect()
  }

  const viewDetails = () => {
    setDetailFlight(flight)
    navigate(ROUTES.flightDetails)
  }

  const { legs, first, last, stops, layovers } = summarizeFlight(flight)
  const duration = flight?.total_duration ?? first?.duration ?? 0
  const departure = splitDateTime(first?.departure_airport?.time)
  const arrival = splitDateTime(last?.arrival_airport?.time)
  const arrivesNextDay = departure.date !== arrival.date
  const stopsBadge = getStopsBadge(stops)

  return (
    <div className="bg-white text-black rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col lg:flex-row overflow-hidden">

      <div className="flex-1 p-5 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center gap-5 pb-4 border-b border-dashed border-gray-200">

          {/* Airline */}
          <div className="flex items-center gap-3 md:w-[200px] shrink-0">
            <div className="w-14 h-14 rounded-xl bg-gray-50 p-1.5 shrink-0">
              <img
                src={flight?.airline_logo ?? first?.airline_logo}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{first?.airline}</p>
              <span className="text-gray-500 text-xs block truncate">
                {legs.map(leg => leg.flight_number).join(" · ")}
              </span>
            </div>
          </div>

          {/* Route */}
          <div className="flex flex-1 items-center justify-between gap-3">
            <div>
              <p className="font-bold text-2xl leading-none">{departure.time}</p>
              <p className="text-sm font-medium mt-1">{first?.departure_airport?.id}</p>
              <p className="text-xs text-gray-400">{departure.date}</p>
            </div>

            <FlightPath duration={duration} {...stopsBadge}>
              {stops > 0 && layovers.map((layover, i) => (
                <div key={i} className="flex items-center gap-1 text-[11px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span>{layover.name} · {formatDuration(layover.duration)}</span>
                </div>
              ))}
            </FlightPath>

            <div className="text-right">
              <p className="font-bold text-2xl leading-none">
                {arrival.time}
                {arrivesNextDay && <sup className="text-[10px] text-orange-500 ml-0.5">+1</sup>}
              </p>
              <p className="text-sm font-medium mt-1">{last?.arrival_airport?.id}</p>
              <p className="text-xs text-gray-400">{arrival.date}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-gray-600">
          {AMENITIES.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="text-lg text-[#06448a]" />
              <p className="text-xs font-medium">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price + select */}
      <div className="lg:w-[210px] shrink-0 bg-slate-50 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-gray-200 p-5 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 text-center">
        <div>
          <h2 className="text-2xl font-bold text-[#031e3d]">{inr(flight.price)}</h2>
          <p className="text-xs text-gray-500">per person</p>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <button
            onClick={selectFlight}
            className="bg-[#031e3d] hover:bg-[#052a5a] transition-colors text-white font-medium px-9 py-2.5 rounded-xl cursor-pointer"
          >
            Select
          </button>
          <button
            onClick={viewDetails}
            className="text-sm font-medium text-[#06448a] hover:underline cursor-pointer"
          >
            Flight details
          </button>
          <p className="text-xs font-medium text-green-600">
            {flight.seatsAvailable ? `${flight.seatsAvailable} seats left` : "Seats available"}
          </p>
        </div>
      </div>
    </div>
  )
}
