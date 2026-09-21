import { useId, useState } from 'react'
import { GiCommercialAirplane } from "react-icons/gi"
import { PiIslandThin } from "react-icons/pi"
import { FiMapPin, FiMinus, FiPlus } from "react-icons/fi"
import { BsAirplane } from "react-icons/bs"
import { SlCalender } from "react-icons/sl"
import { IoPersonOutline } from "react-icons/io5"
import { LiaExchangeAltSolid } from "react-icons/lia"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { useFlight } from '../../hooks/useFlight'
import toast from 'react-hot-toast'
import { getIataCode, AIRPORT_SUGGESTIONS } from '../../utils/airports'
import { ROUTES } from '../../constants/routes'

const TRIP_TYPES = [
  { type: "oneway", label: "One way", Icon: GiCommercialAirplane },
  { type: "round", label: "Round trip", Icon: GiCommercialAirplane },
  { type: "multicity", label: "Multi city", Icon: PiIslandThin },
]

const MAX_TRAVELLERS = 9

const Field = ({ label, className = "", children, onClick }) => (
  <div
    onClick={onClick}
    className={`flex-1 min-w-0 px-4 py-3 hover:bg-slate-50 transition-colors ${className}`}
  >
    <p className="text-[11px] tracking-wider text-gray-500 font-semibold mb-1.5">{label}</p>
    <div className="flex items-center gap-2.5">{children}</div>
  </div>
)

const inputClass =
  "flex-1 min-w-0 bg-transparent text-sm font-bold outline-none text-black placeholder:font-normal placeholder:text-gray-400"

const codeHint = (value) => (value && value.trim().length >= 2 ? getIataCode(value) : "")

export const SearchFlights = ({ onSearch, update = false }) => {
  const navigate = useNavigate()
  const listId = useId()
  const { searchData, setSearchData } = useFlight()
  const [formData, setFormData] = useState(searchData)
  const today = new Date().toISOString().split("T")[0]

  const tripType = formData.tripType

  // open the native date picker when anywhere in the field is clicked
  const openPicker = (e) => {
    const input = e.currentTarget.querySelector('input[type="date"]')
    if (!input) return
    try { input.showPicker() } catch { input.focus() }
  }

  const swapLocation = () => {
    setFormData(prev => ({ ...prev, from: prev.to, to: prev.from }))
  }

  const setTravellers = (n) =>
    setFormData(prev => ({ ...prev, travellers: Math.min(MAX_TRAVELLERS, Math.max(1, n)) }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!formData.from || !formData.to || !formData.date) {
      toast.error("Please fill all required fields")
      return false
    }
    if (getIataCode(formData.from) === getIataCode(formData.to)) {
      toast.error("Origin and destination can't be the same")
      return false
    }
    if (tripType === "round" && !formData.returnDate) {
      toast.error("Please choose a return date")
      return false
    }
    return true
  }

  const commit = () =>
    setSearchData({
      ...formData,
      from: getIataCode(formData.from),
      to: getIataCode(formData.to),
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    commit()
    if (update) onSearch?.()
    else navigate(ROUTES.booking)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>

      {/* Trip type */}
      <div className="inline-flex max-w-full bg-white/15 backdrop-blur-sm rounded-full p-1 mb-3 overflow-x-auto">
        {TRIP_TYPES.map(({ type, label, Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, tripType: type }))}
            className={`py-2 px-3 sm:px-4 flex items-center gap-1.5 text-[13px] sm:text-sm rounded-full whitespace-nowrap transition-colors cursor-pointer
              ${tripType === type
                ? "bg-white text-[#031e3d] font-semibold shadow"
                : "text-white/90 hover:bg-white/20"}`}
          >
            <Icon className="text-base shrink-0 hidden min-[400px]:block" />
            {label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

          {/* FROM + TO with swap */}
          <div className="relative flex flex-col lg:flex-row flex-[2] min-w-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            <Field label="FROM">
              <FiMapPin className="text-[#06448a] text-lg shrink-0" />
              <input
                name="from"
                type="text"
                list={listId}
                autoComplete="off"
                value={formData.from}
                onChange={handleChange}
                placeholder="City or airport code"
                aria-label="From"
                className={inputClass}
              />
              <span className="hidden xl:block text-xs text-gray-400 font-medium shrink-0">
                {codeHint(formData.from)}
              </span>
            </Field>

            <button
              type="button"
              onClick={swapLocation}
              aria-label="Swap airports"
              className="absolute z-10 right-4 top-1/2 -translate-y-1/2 lg:right-auto lg:left-1/2 lg:-translate-x-1/2
                border border-gray-200 p-2 rounded-full bg-white shadow-md text-[#06448a] hover:bg-slate-50 hover:rotate-180 transition-all duration-300 cursor-pointer"
            >
              <LiaExchangeAltSolid className="text-base rotate-90 lg:rotate-0" />
            </button>

            <Field label="TO" className="lg:pl-8">
              <BsAirplane className="text-[#06448a] text-lg shrink-0" />
              <input
                name="to"
                type="text"
                list={listId}
                autoComplete="off"
                value={formData.to}
                onChange={handleChange}
                placeholder="City or airport code"
                aria-label="To"
                className={inputClass}
              />
              <span className="hidden xl:block text-xs text-gray-400 font-medium shrink-0">
                {codeHint(formData.to)}
              </span>
            </Field>

            <datalist id={listId}>
              {AIRPORT_SUGGESTIONS.map(([city, code]) => (
                <option key={code} value={city}>{code}</option>
              ))}
            </datalist>
          </div>

          {/* DATES */}
          <div className="flex flex-[1.4] min-w-0 divide-x divide-gray-200">
            <Field label="DEPARTURE" onClick={openPicker} className="cursor-pointer">
              <SlCalender className="text-[#06448a] text-lg shrink-0" />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                aria-label="Departure date"
                className={`${inputClass} cursor-pointer`}
              />
            </Field>

            {tripType === "round" && (
              <Field label="RETURN" onClick={openPicker} className="cursor-pointer">
                <SlCalender className="text-[#06448a] text-lg shrink-0" />
                <input
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.date || today}
                  aria-label="Return date"
                  className={`${inputClass} cursor-pointer`}
                />
              </Field>
            )}
          </div>

          {/* PASSENGERS */}
          <Field label="PASSENGERS" className="lg:flex-none lg:w-[190px]">
            <IoPersonOutline className="text-[#06448a] text-lg shrink-0" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTravellers(formData.travellers - 1)}
                disabled={formData.travellers <= 1}
                aria-label="Fewer passengers"
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <FiMinus size={14} />
              </button>
              <span className="w-14 text-center text-sm font-bold" aria-live="polite">
                {formData.travellers} {formData.travellers > 1 ? "Adults" : "Adult"}
              </span>
              <button
                type="button"
                onClick={() => setTravellers(formData.travellers + 1)}
                disabled={formData.travellers >= MAX_TRAVELLERS}
                aria-label="More passengers"
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <FiPlus size={14} />
              </button>
            </div>
          </Field>

          {/* ACTION */}
          <div className="p-3 flex items-center">
            <button
              type="submit"
              className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#031e3d] hover:bg-[#052a5a] transition-colors px-7 py-3.5 rounded-xl text-white text-sm font-semibold whitespace-nowrap cursor-pointer"
            >
              {update ? "Update search" : (<>Search Flights <IoIosArrowForward className="text-sm" /></>)}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
