// Helpers for the flight objects returned by the search API.

// Splits a flight (which may have several legs) into the pieces the UI needs.
export const summarizeFlight = (flight) => {
  const legs = flight?.flights ?? []
  return {
    legs,
    first: legs[0],
    last: legs[legs.length - 1],
    stops: Math.max(legs.length - 1, 0),
    layovers: flight?.layovers ?? [],
  }
}

// Badge text and colour for a stop count: "Non-stop" (green), "1 stop" / "2 stops" (orange).
export const getStopsBadge = (stops) => ({
  label: stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`,
  tone: stops === 0 ? 'green' : 'orange',
})

// Departure/arrival time-of-day buckets, shared by the filter checkboxes (FlightFilters)
// and the actual filtering predicate (ResultsStep) so there's one definition of each slot's
// boundaries instead of two that could quietly drift apart.
export const TIME_SLOTS = [
  { id: "earlymorning", label: "Early morning", range: "00:00 – 06:00" },
  { id: "morning", label: "Morning", range: "06:00 – 12:00" },
  { id: "afternoon", label: "Afternoon", range: "12:00 – 18:00" },
  { id: "night", label: "Night", range: "18:00 – 24:00" },
]

// "2026-12-01 11:50" -> "morning"
export const getTimeSlot = (dateTimeStr) => {
  const timePart = dateTimeStr?.split(" ")[1]
  const hour = timePart ? parseInt(timePart.split(":")[0], 10) : 0
  if (hour < 6) return "earlymorning"
  if (hour < 12) return "morning"
  if (hour < 18) return "afternoon"
  return "night"
}

// Slider range for the price filter: the cheapest/dearest fare rounded outwards to the nearest 500.
export const getPriceBounds = (flights, fallback = { min: 2000, max: 15000 }) => {
  const prices = flights.map(flight => flight.price).filter(price => typeof price === 'number')
  if (prices.length === 0) return fallback
  return {
    min: Math.floor(Math.min(...prices) / 500) * 500,
    max: Math.ceil(Math.max(...prices) / 500) * 500,
  }
}
