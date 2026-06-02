import { all } from 'axios'
import React, { useState } from 'react'

export const Filters = ({ filters, setFilters, flights = [] }) => {

  const [searchAirline, setSearchAirline] = useState("")

  const allAirlines = (
    [...new Set(flights.map(f => f.flights?.[0]?.airline).filter(Boolean))]
  )

  const visibleAirlines = allAirlines.filter(a =>
    a.toLowerCase().includes(searchAirline.toLowerCase())
  )



  const handleDeparture = (e) => {

    const val = e.target.value
    const updated = e.target.checked
      ? [...filters.departure, val]
      : filters.departure.filter(d => d !== val)
    setFilters(prev => ({ ...prev, departure: updated }))
  }


  const nonstopCount = flights.filter(f => f.flights?.length === 1).length
  const onestopCount = flights.filter(f => f.flights?.length === 2).length
  const twostopCount = flights.filter(f => f.flights?.length > 2).length



  const getTimeSlot = (flight) => {
    const time = flight.flights?.[0]?.departure_airport?.time
    const hour = time ? parseInt(time.split(" ")[1].split(":")[0]) : 0
    if (hour < 6) return "earlymorning"
    if (hour < 12) return "morning"
    if (hour < 18) return "afternoon"
    return "night"
  }

  const earlyMorningCount = flights.filter(f => getTimeSlot(f) === "earlymorning").length
  const morningCount = flights.filter(f => getTimeSlot(f) === "morning").length
  const afternoonCount = flights.filter(f => getTimeSlot(f) === "afternoon").length
  const nightCount = flights.filter(f => getTimeSlot(f) === "night").length


  const handlePrice = (e) => {
    setFilters(prev => ({ ...prev, price: Number(e.target.value) }))
  }

  const handleStops = (e) => {
    const val = Number(e.target.value);
    const updated = e.target.checked
      ? [...filters.stops, val]
      : filters.stops.filter(s => s !== val)
    setFilters(prev => ({ ...prev, stops: updated }))
  }

  const handleAirline = (e) => {
    const val = e.target.value
    const updated = e.target.checked
      ? [...filters.airlines, val]
      : filters.airlines.filter(a => a !== val)
    setFilters(prev => ({ ...prev, airlines: updated }))
  }


  const clearAll =()=>{
    setFilters(
      {
        price: 15000,
        stops: [],
        airlines: [],
        departure: [],
      }
    )

    setSearchAirline("")
  }
  return (
    <div className=' bg-white p-3 rounded-xl shadow-md '>
      <div>
        {/* heading */}
        <div className='flex items-center justify-between py-3 border-b'>
          <p className='font-semibold text-xl'>Filter</p>
          <button onClick={clearAll} className='text-sm text-blue-600'>Clear All</button>
        </div>

        <div >
          {/* price range */}
          <div className='py-3 border-b'>
            <p className='font-semibold text-gray-800'>Price Range</p>
            <p className='font-semibold text-gray-800'>₹2000 - ₹{filters.price}</p>
            <input
              type="range"
              value={filters.price}
              onChange={handlePrice}
              min={2000}
              max={15000}
              step={500}
              className='w-full h-1' />
            <div className='flex items-center justify-between text-gray-700 text-sm'>
              <span>₹2000</span>
              <span>₹15000</span>
            </div>
          </div>

          {/* stops */}
          <div className='py-3 border-b'>
            <p className='font-semibold text-gray-800 pb-2'>Stops</p>
            <ul className='flex flex-col gap-2'>
              <li className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  name="nonstop"
                  id="nonstop"
                  value={0}
                  checked={filters.stops.includes(0)}
                  onChange={handleStops} />

                <label htmlFor="nonstop" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Non-Stop</span>
                  <span>{nonstopCount}</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  name="oneStop"
                  id="oneStop"
                  value={1}
                  checked={filters.stops.includes(1)}
                  onChange={handleStops} />
                <label htmlFor="oneStop" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>1 Stop</span>
                  <span>{onestopCount}</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="twoStop" id="twoStop"
                  value={2}
                  checked={filters.stops.includes(2)}
                  onChange={handleStops} />
                <label htmlFor="twoStop" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>2+ Stop</span>
                  <span>{twostopCount}</span>
                </label>
              </li>
            </ul>
          </div>

          {/* departure */}
          <div className='py-3 border-b'>
            <p className='font-semibold text-gray-800 pb-2'>Departure Time</p>
            <ul className='flex flex-col gap-2'>
              {
                [
                  { id: "earlymorning", label: "Early Morning (00:00 - 06:00)", count: earlyMorningCount },
                  { id: "morning", label: "Morning (06:00 - 12:00)", count: morningCount },
                  { id: "afternoon", label: "Afternoon (12:00 - 18:00)", count: afternoonCount },
                  { id: "night", label: "Night (18:00 - 24:00)", count: nightCount },
                ].map(slot => (
                  <li key={slot.id} className='flex items-center gap-2'>
                    <input
                      type="checkbox"
                      name={slot.id}
                      id={slot.id}
                      value={slot.id}
                      checked={filters.departure.includes(slot.id)}
                      onChange={handleDeparture} />

                    <label htmlFor={slot.id} className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                      <span>{slot.label}</span>
                      <span>{slot.count}</span>
                    </label>
                  </li>
                ))
              }

            </ul>
          </div>


          {/* airlines */}
          <div className='py-3 '>
            <p className='font-semibold text-gray-800 pb-2'>Airlines</p>
            <input
              type="text"
              name="search-airlines"
              id="search-airlines"
              value={searchAirline}
              onChange={(e) => setSearchAirline(e.target.value)}
              placeholder='search'
              className='text-gray-700 border border-gray-300 w-full rounded py-1 px-2 mb-2' />
            <ul className='flex flex-col gap-2'>
              {
                visibleAirlines.map(airline => {
                  const count = flights.filter(
                    f => f.flights?.[0]?.airline === airline
                  ).length
                  return(
                    <li key={airline} className='flex items-center gap-2'>
                      <input 
                      type="checkbox" 
                      name={airline} 
                      id={airline} 
                      value={airline}
                      checked={filters.airlines.includes(airline)}
                      onChange={handleAirline}
                      />
                      <label htmlFor={airline} className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                        <span>{airline}</span>
                        <span>
                          {count}
                        </span>
                      </label>
                    </li>
                  )
                })

              }

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
