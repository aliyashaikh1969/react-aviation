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

// Slider range for the price filter: the cheapest/dearest fare rounded outwards to the nearest 500.
export const getPriceBounds = (flights, fallback = { min: 2000, max: 15000 }) => {
  const prices = flights.map(flight => flight.price).filter(price => typeof price === 'number')
  if (prices.length === 0) return fallback
  return {
    min: Math.floor(Math.min(...prices) / 500) * 500,
    max: Math.ceil(Math.max(...prices) / 500) * 500,
  }
}
