import { IoBagHandleOutline } from "react-icons/io5"
import { GiMeal } from "react-icons/gi"
import { PiSeatBold } from "react-icons/pi"
import { IoIosAirplane } from "react-icons/io"
import { useFlight } from '../../context/FlightContext'
import { FiClock } from "react-icons/fi"

export const FlightCard = ({ flight, nextStep }) => {
  const { setSelectedFlight } = useFlight()

  const selectedFunction = () => {
    setSelectedFlight(flight)
    nextStep()
  }

  const firstFlight = flight?.flights?.[0]
  const lastFlight = flight?.flights?.[flight.flights.length - 1]

  // ✅ Total duration
  const flightDuration = flight?.total_duration ?? firstFlight?.duration ?? 0
  const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0")
  const minutes = String(flightDuration % 60).padStart(2, "0")

  // ✅ Stops calculate karo
  const stopsCount = (flight?.flights?.length ?? 1) - 1
  const layovers = flight?.layovers ?? []

  const getStopLabel = (stops) => {
    if (stops === 0) return "Non-stop"
    if (stops === 1) return "1 Stop"
    return `${stops} Stops`
  }

  return (
    <div className="bg-white text-black p-2 rounded-xl shadow-md flex justify-between lg:items-center lg:flex-row flex-col">

      <div className='px-3 flex-1'>
        <div className='flex px-2 py-5 lg:items-center border-b lg:flex-row flex-col overflow-hidden'>

          {/* Airline */}
          <div className='flex items-center gap-3 w-[220px] shrink-0'>
            <div className='w-16 h-16'>
              <img
                src={flight?.airline_logo ?? firstFlight?.airline_logo}
                className='w-full h-full object-contain'
                alt={firstFlight?.airline}
              />
            </div>
            <div>
              <p className="font-bold text-sm">{firstFlight?.airline}</p>
              <span className='text-gray-600 text-xs'>
                {flight?.flights?.map(f => f.flight_number).join(" · ")}
              </span>
            </div>
          </div>

          {/* Route */}
          <div className='flex flex-1 md:flex-auto items-center justify-between'>

            {/* Departure */}
            <div>
              <p className='font-bold text-xl'>
                {firstFlight?.departure_airport?.time.split(" ")[1]}
              </p>
              <span className='text-sm'>{firstFlight?.departure_airport?.id}</span>
              <p className='text-xs text-gray-400'>
                {firstFlight?.departure_airport?.time.split(" ")[0]}
              </p>
            </div>

            {/* Duration + Stops */}
            <div className='flex flex-col items-center gap-1 flex-1 px-4'>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiClock />
                <span className='font-semibold'>{hours}h {minutes}m</span>
              </div>

              {/* Flight line */}
              <div className="flex items-center w-full gap-1">
                <div className="flex-1 h-px bg-gray-300"></div>
                <IoIosAirplane className="text-gray-400 text-lg" />
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* ✅ Stop label */}
              <span className={`text-xs font-semibold
                ${stopsCount === 0 ? "text-green-600" : "text-orange-500"}`}>
                {getStopLabel(stopsCount)}
              </span>

              {/* ✅ Layover info */}
              {stopsCount > 0 && layovers.map((layover, i) => (
                <div key={i} className="flex items-center gap-1 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                  <span>{layover.name} · {Math.floor(layover.duration / 60)}h {layover.duration % 60}m</span>
                </div>
              ))}
            </div>

            {/* Arrival */}
            <div className='text-center'>
              <p className='font-bold text-xl'>
                {lastFlight?.arrival_airport?.time.split(" ")[1]}
              </p>
              <span className='text-sm'>{lastFlight?.arrival_airport?.id}</span>
              <p className='text-xs text-gray-400'>
                {lastFlight?.arrival_airport?.time.split(" ")[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className='flex items-center gap-10 p-3 text-gray-600'>
          <div className='flex items-center gap-3'>
            <IoBagHandleOutline className="text-lg" />
            <p className='text-xs font-semibold'>15 kg Baggage</p>
          </div>
          <div className='flex items-center gap-3'>
            <GiMeal className="text-lg" />
            <p className='text-xs font-semibold'>Meal Available</p>
          </div>
          <div className='flex items-center'>
            <PiSeatBold className="text-lg" />
            <p className='text-xs font-semibold'>Standard Seat</p>
          </div>
        </div>
      </div>

      {/* Price + Select */}
      <div className="px-10 text-center flex justify-between lg:flex-col">
        <div>
          <h2 className="text-xl font-bold text-black">₹{flight.price?.toLocaleString('en-IN')}</h2>
          <p className='text-xs font-semibold'>per person</p>
        </div>
        <div>
          <button
            onClick={selectedFunction}
            className="m-2 bg-blue-500 text-white px-10 py-1 rounded"
          >
            Select
          </button>
          <p className='text-xs font-semibold text-green-600'>
            {flight.seatsAvailable ? `${flight.seatsAvailable} seats left` : "Seats available"}
          </p>
        </div>
      </div>
    </div>
  )
}