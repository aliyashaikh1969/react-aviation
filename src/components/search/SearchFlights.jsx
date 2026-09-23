import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GiCommercialAirplane } from "react-icons/gi"
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
import { todayIso } from '../../utils/format'
import { ROUTES } from '../../constants/routes'

const TRIP_TYPES = [
  { type: "oneway", label: "One way", Icon: GiCommercialAirplane },
  { type: "round", label: "Round trip", Icon: GiCommercialAirplane },
]

const MAX_TRAVELLERS = 9

const Field = ({ label, className = "", children, onClick, error }) => (
  <div
    onClick={onClick}
    className={`flex-1 min-w-0 px-4 py-3 transition-colors focus-within:bg-blue-50 ${error ? "bg-red-50/60" : "hover:bg-slate-50"} ${className}`}
  >
    <p className="text-[11px] tracking-wider text-gray-500 font-semibold mb-1.5">{label}</p>
    <div className="flex items-center gap-2.5">{children}</div>
  </div>
)

// the input itself has no visible border to put a focus ring on, so the focus state is
// shown on the Field wrapper instead (see focus-within:bg-blue-50 above)
const inputClass =
  "flex-1 min-w-0 bg-transparent text-sm font-bold outline-none text-black placeholder:font-normal placeholder:text-gray-400"

const codeHint = (value) => (value && value.trim().length >= 2 ? getIataCode(value) : "")

const validateSearch = (data, today) => {
  const errors = {}
  const from = data.from?.trim()
  const to = data.to?.trim()

  if (!from) errors.from = "Please enter a departure city"
  if (!to) errors.to = "Please enter a destination city"
  if (from && to && getIataCode(from) === getIataCode(to)) {
    errors.from = "Origin and destination can't be the same"
    errors.to = "Origin and destination can't be the same"
  }

  if (!data.date) errors.date = "Departure date is required"
  else if (data.date < today) errors.date = "Departure date can't be in the past"

  if (data.tripType === "round") {
    if (!data.returnDate) errors.returnDate = "Return date is required for round trips"
    else if (data.returnDate < data.date) errors.returnDate = "Return date can't be before the departure date"
  }

  const travellers = Number(data.travellers)
  if (!Number.isInteger(travellers) || travellers < 1) errors.travellers = "At least 1 traveller is required"
  else if (travellers > MAX_TRAVELLERS) errors.travellers = `A maximum of ${MAX_TRAVELLERS} travellers is allowed`

  return errors
}

export const SearchFlights = ({ onSearch, update = false }) => {
  const navigate = useNavigate()
  const listId = useId()
  const { searchData, setSearchData } = useFlight()
  const [formData, setFormData] = useState(searchData)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [travellersOpen, setTravellersOpen] = useState(false)
  const [travellersRect, setTravellersRect] = useState(null)
  const travellersRef = useRef(null)
  const travellersPanelRef = useRef(null)
  const today = todayIso()

  const tripType = formData.tripType

  const openTravellers = () => {
    setTravellersRect(travellersRef.current?.getBoundingClientRect() ?? null)
    setTravellersOpen(true)
  }

  // close the travellers dropdown on outside click, Escape, or scroll
  useEffect(() => {
    if (!travellersOpen) return
    const onClick = (e) => {
      if (travellersRef.current?.contains(e.target)) return
      if (travellersPanelRef.current?.contains(e.target)) return
      setTravellersOpen(false)
    }
    const onKey = (e) => e.key === "Escape" && setTravellersOpen(false)
    const onScroll = () => setTravellersOpen(false)
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onScroll)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onScroll)
    }
  }, [travellersOpen])

  // open the native date picker when anywhere in the field is clicked
  const openPicker = (e) => {
    const input = e.currentTarget.querySelector('input[type="date"]')
    if (!input) return
    try { input.showPicker() } catch { input.focus() }
  }

  const clearError = (name) => {
    setErrors(prev => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const swapLocation = () => {
    setFormData(prev => ({ ...prev, from: prev.to, to: prev.from }))
    clearError("from")
    clearError("to")
  }

  const setTravellers = (n) => {
    setFormData(prev => ({ ...prev, travellers: Math.min(MAX_TRAVELLERS, Math.max(1, n)) }))
    clearError("travellers")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    clearError(name)
  }

  const selectTripType = (type) => {
    setFormData(prev => ({ ...prev, tripType: type }))
    clearError("returnDate")
  }

  const commit = () =>
    setSearchData({
      ...formData,
      from: getIataCode(formData.from),
      to: getIataCode(formData.to),
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting) return

    const nextErrors = validateSearch(formData, today)
    setErrors(nextErrors)
    const firstError = Object.values(nextErrors)[0]
    if (firstError) {
      toast.error(firstError)
      return
    }

    setSubmitting(true)
    try {
      commit()
      if (update) onSearch?.()
      else navigate(ROUTES.booking)
    } finally {
      setSubmitting(false)
    }
  }

  const summaryError = Object.values(errors).find(Boolean)

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>

      {/* Trip type */}
      <div className="inline-flex max-w-full bg-white/15 backdrop-blur-sm rounded-full p-1 mb-3 overflow-x-auto">
        {TRIP_TYPES.map(({ type, label, Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => selectTripType(type)}
            className={`py-2 px-3 sm:px-4 flex items-center gap-1.5 text-[13px] sm:text-sm rounded-full whitespace-nowrap transition-colors cursor-pointer
              ${tripType === type
                ? "bg-white text-navy font-semibold shadow"
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
            <Field label="FROM" error={errors.from}>
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
                aria-invalid={!!errors.from}
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

            <Field label="TO" className="lg:pl-8" error={errors.to}>
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
                aria-invalid={!!errors.to}
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
            <Field label="DEPARTURE" onClick={openPicker} className="cursor-pointer" error={errors.date}>
              <SlCalender className="text-[#06448a] text-lg shrink-0" />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                aria-label="Departure date"
                aria-invalid={!!errors.date}
                className={`${inputClass} cursor-pointer`}
              />
            </Field>

            {tripType === "round" && (
              <Field label="RETURN" onClick={openPicker} className="cursor-pointer" error={errors.returnDate}>
                <SlCalender className="text-[#06448a] text-lg shrink-0" />
                <input
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.date || today}
                  aria-label="Return date"
                  aria-invalid={!!errors.returnDate}
                  className={`${inputClass} cursor-pointer`}
                />
              </Field>
            )}
          </div>

          {/* Passengers dropdown. Rendered through a portal so it isn't clipped by
              this card's overflow-hidden. */}
          <div ref={travellersRef} className="relative lg:flex-none lg:w-[190px]">
            <button
              type="button"
              onClick={() => (travellersOpen ? setTravellersOpen(false) : openTravellers())}
              aria-haspopup="dialog"
              aria-expanded={travellersOpen}
              className={`w-full h-full flex-1 min-w-0 px-4 py-3 text-left transition-colors cursor-pointer
                ${errors.travellers ? "bg-red-50/60" : "hover:bg-slate-50"}`}
            >
              <p className="text-[11px] tracking-wider text-gray-500 font-semibold mb-1.5">PASSENGERS</p>
              <div className="flex items-center gap-2.5">
                <IoPersonOutline className="text-[#06448a] text-lg shrink-0" />
                <span className="text-sm font-bold truncate">
                  {formData.travellers} {formData.travellers > 1 ? "Adults" : "Adult"}
                </span>
              </div>
            </button>
          </div>

          {travellersOpen && travellersRect && createPortal(
            <div
              ref={travellersPanelRef}
              role="dialog"
              aria-label="Number of travellers"
              style={{
                position: 'fixed',
                top: travellersRect.bottom + 8,
                left: Math.min(travellersRect.left, window.innerWidth - 272),
                zIndex: 60,
              }}
              className="w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy">Travellers</p>
                  <p className="text-xs text-gray-400">Economy class</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravellers(formData.travellers - 1)}
                    disabled={formData.travellers <= 1}
                    aria-label="Fewer travellers"
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-5 text-center text-sm font-bold" aria-live="polite">
                    {formData.travellers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravellers(formData.travellers + 1)}
                    disabled={formData.travellers >= MAX_TRAVELLERS}
                    aria-label="More travellers"
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              {errors.travellers && (
                <p className="text-xs text-red-600 mt-3">{errors.travellers}</p>
              )}

              <button
                type="button"
                onClick={() => setTravellersOpen(false)}
                className="w-full mt-4 bg-navy hover:bg-navy-dark transition-colors text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>,
            document.body
          )}

          {/* ACTION */}
          <div className="p-3 flex items-center">
            <button
              type="submit"
              disabled={submitting}
              className="w-full lg:w-auto flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark disabled:opacity-70 disabled:cursor-not-allowed transition-colors px-7 py-3.5 rounded-xl text-white text-sm font-semibold whitespace-nowrap cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Searching…
                </>
              ) : update ? "Update search" : (<>Search Flights <IoIosArrowForward className="text-sm" /></>)}
            </button>
          </div>
        </div>
      </div>

      {summaryError && (
        <p className="text-sm text-red-100 bg-red-900/30 border border-red-300/30 rounded-xl px-4 py-2 mt-3" role="alert">
          {summaryError}
        </p>
      )}
    </form>
  )
}
