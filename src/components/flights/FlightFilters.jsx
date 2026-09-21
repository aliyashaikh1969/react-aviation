import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { getPriceBounds } from '../../utils/flight'

const getTimeSlot = (flight) => {
  const time = flight.flights?.[0]?.departure_airport?.time
  const hour = time ? parseInt(time.split(" ")[1].split(":")[0]) : 0
  if (hour < 6) return "earlymorning"
  if (hour < 12) return "morning"
  if (hour < 18) return "afternoon"
  return "night"
}

const TIME_SLOTS = [
  { id: "earlymorning", label: "Early morning", range: "00:00 – 06:00" },
  { id: "morning", label: "Morning", range: "06:00 – 12:00" },
  { id: "afternoon", label: "Afternoon", range: "12:00 – 18:00" },
  { id: "night", label: "Night", range: "18:00 – 24:00" },
]

const toggle = (list, value) =>
  list.includes(value) ? list.filter(v => v !== value) : [...list, value]

const Section = ({ title, children, last }) => (
  <div className={`py-4 ${last ? "" : "border-b border-gray-100"}`}>
    <p className="font-semibold text-gray-800 mb-3 text-sm">{title}</p>
    {children}
  </div>
)

const CheckRow = ({ id, checked, onChange, label, hint, count }) => (
  <li>
    <label
      htmlFor={id}
      className={`flex items-center gap-3 px-2 py-1.5 -mx-2 rounded-lg cursor-pointer hover:bg-slate-50 text-sm
        ${count === 0 ? "opacity-50" : ""}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-[#031e3d] cursor-pointer"
      />
      <span className="flex-1 min-w-0">
        <span className="text-gray-700 block truncate">{label}</span>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </span>
      <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{count}</span>
    </label>
  </li>
)

export const FlightFilters = ({ filters, setFilters, flights = [] }) => {
  const [searchAirline, setSearchAirline] = useState("")

  // slider range follows the actual results instead of fixed limits
  const { min: minPrice, max: maxPrice } = useMemo(() => getPriceBounds(flights), [flights])

  const allAirlines = useMemo(
    () => [...new Set(flights.map(f => f.flights?.[0]?.airline).filter(Boolean))],
    [flights]
  )
  const visibleAirlines = allAirlines.filter(a =>
    a.toLowerCase().includes(searchAirline.toLowerCase())
  )

  const stopOptions = [
    { value: 0, label: "Non-stop", count: flights.filter(f => f.flights?.length === 1).length },
    { value: 1, label: "1 stop", count: flights.filter(f => f.flights?.length === 2).length },
    { value: 2, label: "2+ stops", count: flights.filter(f => f.flights?.length > 2).length },
  ]

  const activeCount =
    filters.stops.length + filters.airlines.length + filters.departure.length +
    (filters.price < maxPrice ? 1 : 0)

  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }))

  const clearAll = () => {
    setFilters({ price: maxPrice, stops: [], airlines: [], departure: [] })
    setSearchAirline("")
  }

  return (
    <div className="bg-white px-4 rounded-2xl shadow-sm border border-gray-100">

      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <p className="font-bold text-lg text-[#031e3d]">
          Filters
          {activeCount > 0 && (
            <span className="ml-2 text-xs font-semibold bg-[#031e3d] text-white rounded-full px-2 py-0.5 align-middle">
              {activeCount}
            </span>
          )}
        </p>
        <button
          onClick={clearAll}
          disabled={activeCount === 0}
          className="text-sm text-blue-600 hover:underline disabled:text-gray-300 disabled:no-underline cursor-pointer disabled:cursor-default"
        >
          Clear all
        </button>
      </div>

      <Section title="Price range">
        <p className="text-[#031e3d] font-bold mb-2">
          Up to ₹{Math.min(filters.price, maxPrice).toLocaleString('en-IN')}
        </p>
        <input
          type="range"
          value={Math.min(filters.price, maxPrice)}
          onChange={(e) => update("price", Number(e.target.value))}
          min={minPrice}
          max={maxPrice}
          step={500}
          aria-label="Maximum price"
          className="w-full h-1.5 accent-[#031e3d] cursor-pointer"
        />
        <div className="flex items-center justify-between text-gray-500 text-xs mt-1">
          <span>₹{minPrice.toLocaleString('en-IN')}</span>
          <span>₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
      </Section>

      <Section title="Stops">
        <ul className="flex flex-col gap-0.5">
          {stopOptions.map(o => (
            <CheckRow
              key={o.value}
              id={`stops-${o.value}`}
              label={o.label}
              count={o.count}
              checked={filters.stops.includes(o.value)}
              onChange={() => update("stops", toggle(filters.stops, o.value))}
            />
          ))}
        </ul>
      </Section>

      <Section title="Departure time">
        <ul className="flex flex-col gap-0.5">
          {TIME_SLOTS.map(slot => (
            <CheckRow
              key={slot.id}
              id={`slot-${slot.id}`}
              label={slot.label}
              hint={slot.range}
              count={flights.filter(f => getTimeSlot(f) === slot.id).length}
              checked={filters.departure.includes(slot.id)}
              onChange={() => update("departure", toggle(filters.departure, slot.id))}
            />
          ))}
        </ul>
      </Section>

      <Section title="Airlines" last>
        <div className="relative mb-2">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchAirline}
            onChange={(e) => setSearchAirline(e.target.value)}
            placeholder="Search airlines"
            aria-label="Search airlines"
            className="text-sm text-gray-700 border border-gray-200 w-full rounded-lg py-2 pl-9 pr-3 outline-none focus:border-[#031e3d]"
          />
        </div>
        <ul className="flex flex-col gap-0.5 max-h-56 overflow-y-auto">
          {visibleAirlines.map(airline => (
            <CheckRow
              key={airline}
              id={`airline-${airline}`}
              label={airline}
              count={flights.filter(f => f.flights?.[0]?.airline === airline).length}
              checked={filters.airlines.includes(airline)}
              onChange={() => update("airlines", toggle(filters.airlines, airline))}
            />
          ))}
          {visibleAirlines.length === 0 && (
            <li className="text-xs text-gray-400 py-2">No airlines match</li>
          )}
        </ul>
      </Section>
    </div>
  )
}
