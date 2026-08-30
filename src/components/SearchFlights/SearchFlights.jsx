import { useEffect, useRef, useState } from 'react'
import { GiCommercialAirplane } from "react-icons/gi"
import { PiIslandThin } from "react-icons/pi"
import { FiMapPin } from "react-icons/fi"
import { BsAirplane } from "react-icons/bs"
import { SlCalender } from "react-icons/sl"
import { IoPersonOutline } from "react-icons/io5"
import { LiaExchangeAltSolid } from "react-icons/lia"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { useFlight } from '../../context/FlightContext'
import toast from 'react-hot-toast'
import { getIATACode } from '../../services/flightService'

export const SearchFlights = ({ onSearch, update = false }) => {
  const dateRef = useRef(null)
  const navigate = useNavigate()
  const { flightData, setFlightData } = useFlight()
  const [formData, setFormData] = useState(flightData)
  const today = new Date().toISOString().split("T")[0];



  useEffect(() => {
    setFormData(flightData)
  }, [])

  const tripType = formData.tripType

  const openCalendar = () => {
    if (dateRef.current?.showPicker) dateRef.current.showPicker()
    else dateRef.current?.focus()
  }

  const swapLocation = () => {
    setFormData(prev => ({ ...prev, from: prev.to, to: prev.from }))
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === "travellers") value = Math.max(1, parseInt(value) || 1)
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.date) {
      return toast.error("Please fill all required fields")
    }
    setFlightData({
      ...formData,
      from: getIATACode(formData.from),  
      to: getIATACode(formData.to),      
    })
    navigate('/booking')
  }

  const updateData = () => {
    setFlightData({
      ...formData,
      from: getIATACode(formData.from),  
      to: getIATACode(formData.to),      
    })
    onSearch?.()  //
  }



  return (
    <div className="w-full">

      {/* ✅ Trip Type Tabs */}
      <div className="bg-gray-200 w-full sm:w-fit rounded-t-lg flex gap-1 p-1 pb-2 overflow-x-auto">
        {[
          { type: "oneway", label: "One way", Icon: GiCommercialAirplane },
          { type: "round", label: "Round trip", Icon: GiCommercialAirplane },
          { type: "multicity", label: "Multi city", Icon: PiIslandThin },
        ].map(({ type, label, Icon }) => (
          <button
            key={type}
            onClick={() => setFormData(prev => ({ ...prev, tripType: type }))}
            className={`py-2 px-3 flex items-center gap-1 text-sm rounded-xl whitespace-nowrap transition-all
              ${tripType === type
                ? "text-white bg-[#031e3d]"
                : "text-gray-700 hover:text-white hover:bg-[#031e3d]"
              }`}
          >
            <Icon className="text-base flex-shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* ✅ Search Form */}
      <div className="relative bg-white shadow-2xl w-full md:rounded-e-xl md:rounded-bl-xl">

        {/* ✅ Main fields row */}
        <div className="flex flex-col lg:flex-row items-stretch p-2">

          {/* FROM */}
          <div className="flex-1 min-w-0 p-3 lg:border-r border-gray-200">
            <p className="text-xs text-gray-500 font-semibold mb-1 pb-2">FROM</p>
            <div className="flex items-center gap-2 pr-6">
              <FiMapPin className="text-[#06448a] text-lg flex-shrink-0" />
              <input
                name="from"
                type="text"
                value={formData.from}
                onChange={handleChange}
                placeholder="City or IATA code (e.g. Delhi or DEL)"
                className="flex-1 min-w-0 text-sm font-bold outline-none text-black placeholder:font-normal placeholder:text-gray-400"
              />
              {/* ✅ Airport code — sirf lg pe dikhao */}
              <span className="hidden lg:block text-xs text-gray-400 font-medium flex-shrink-0">
                {formData.from?.slice(0, 3).toUpperCase() || "---"}
              </span>
            </div>
          </div>

          {/* ✅ SWAP BUTTON — properly positioned */}
          <div className="hidden lg:flex items-center justify-center w-0 relative z-10 p-2">
            <button
              type="button"
              onClick={swapLocation}
              aria-label="Swap airports"
              className="absolute border p-2 rounded-full bg-white shadow-lg text-[#06448a] hover:bg-gray-50 transition-all -translate-x-2"
            >
              <LiaExchangeAltSolid className="text-base" />
            </button>
          </div>

          {/* ✅ Mobile swap — as a row between FROM and TO */}
          <div className="absolute top-10 left-1/2 lg:hidden items-center justify-center py-1 ">
            <button
              type="button"
              onClick={swapLocation}
              aria-label="Swap airports"
              className="flex items-center gap-2 text-[#06448a] text-xs font-medium p-2 rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <LiaExchangeAltSolid className="text-base" />

            </button>
          </div>

          {/* TO */}
          <div className="flex-1 min-w-0 p-2 lg:border-r border-gray-200">
            <p className="text-xs text-gray-500 font-semibold mb-1 p-2">TO</p>
            <div className="flex items-center gap-2">
              <BsAirplane className="text-[#06448a] text-lg flex-shrink-0" />
              <input
                name="to"
                type="text"
                value={formData.to}
                onChange={handleChange}
                placeholder="City or airport"
                className="flex-1 min-w-0 text-sm font-bold outline-none text-black placeholder:font-normal placeholder:text-gray-400"
              />
              <span className="hidden lg:block text-xs text-gray-400 font-medium flex-shrink-0">
                {formData.to?.slice(0, 3).toUpperCase() || "---"}
              </span>
            </div>
          </div>

          {/* ✅ Date fields row — side by side on mobile too */}
          <div className="flex flex-1 border-t lg:border-t-0 border-gray-100">

            {/* DEPARTURE */}
            <div className="flex-1 min-w-0 p-3 border-r border-gray-200">
              <p className="text-xs text-gray-500 font-semibold mb-1 p-2">DEPARTURE</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openCalendar}
                  className="text-[#06448a] text-lg flex-shrink-0"
                >
                  <SlCalender />
                </button>
                <input
                  ref={dateRef}
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}

                  className="flex-1 min-w-0 bg-transparent text-sm font-bold outline-none text-black"
                />
              </div>
            </div>

            {/* RETURN DATE — only round trip */}
            {tripType === "round" && (
              <div className="flex-1 min-w-0 p-3 border-r border-gray-200">
                <p className="text-xs text-gray-500 font-semibold mb-1 p-2">RETURN</p>
                <div className="flex items-center gap-2">
                  <SlCalender className="text-[#06448a] text-lg flex-shrink-0" />
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    min={formData.date || new Date().toISOString().split("T")[0]}
                    className="flex-1 min-w-0 bg-transparent text-sm font-bold outline-none text-black"
                  />
                </div>
              </div>
            )}
          </div>

          {/* TRAVELLERS */}
          <div className="flex-1 min-w-0 p-3 border-t lg:border-t-0  lg:border-r border-gray-200">
            <p className="text-xs text-gray-500 font-semibold mb-1 p-2">PASSENGERS</p>
            <div className="flex items-center gap-2">
              <IoPersonOutline className="text-[#06448a] text-lg flex-shrink-0" />
              <input
                type="number"
                min={1}
                max={9}
                name="travellers"
                value={formData.travellers}
                onChange={handleChange}
                className="w-16 bg-transparent text-sm font-bold outline-none text-black
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-xs text-gray-400">
                {formData.travellers > 1 ? "Adults" : "Adult"}
              </span>
            </div>
          </div>

          {/* ✅ ACTION BUTTON */}
          <div className="p-3 flex items-center border-t lg:border-t-0 border-gray-100">
            {update ? (
              <button
                type="button"
                onClick={updateData}
                className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#031e3d] hover:bg-[#052a5a] transition-all px-6 py-3 rounded-xl text-white text-sm font-semibold"
              >
                Update search
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSearch}
                className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#031e3d] hover:bg-[#052a5a] transition-all px-6 py-3 rounded-xl text-white text-sm font-semibold"
              >
                Search Flights
                <IoIosArrowForward className="text-sm" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}