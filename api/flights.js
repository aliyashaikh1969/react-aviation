// Serverless function for flight search (also served by `npm run dev`).
// Keeps SERPAPI_KEY on the server so it never reaches the browser, and cleans up
// SerpApi's response so the UI doesn't have to guard against missing fields everywhere.

const IATA_CODE = /^[A-Za-z]{3}$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

// --- Response normalization -------------------------------------------------------------
const normalizeAirport = (airport) => ({
  id: airport?.id || '—',
  name: airport?.name || '',
  time: airport?.time || '',
})

const normalizeLeg = (leg) => ({
  ...leg,
  airline: leg?.airline || 'Unknown airline',
  airline_logo: leg?.airline_logo || '',
  flight_number: leg?.flight_number || '—',
  airplane: leg?.airplane || '',
  travel_class: leg?.travel_class || '',
  duration: Number(leg?.duration) || 0,
  departure_airport: normalizeAirport(leg?.departure_airport),
  arrival_airport: normalizeAirport(leg?.arrival_airport),
  extensions: Array.isArray(leg?.extensions) ? leg.extensions : [],
})

// drop any result with no usable legs instead of rendering a broken flight card
const normalizeFlight = (flight, index, source) => {
  const legs = Array.isArray(flight?.flights) ? flight.flights.map(normalizeLeg) : []
  if (legs.length === 0) return null

  const totalDuration = Number(flight?.total_duration) || legs.reduce((sum, leg) => sum + leg.duration, 0)

  return {
    ...flight,
    // used as the React list key, so make sure it's always there and unique
    booking_token: flight?.booking_token || `${source}-${index}-${legs[0].flight_number}-${legs[0].departure_airport.time}`,
    flights: legs,
    layovers: Array.isArray(flight?.layovers) ? flight.layovers : [],
    price: Number(flight?.price) || 0,
    total_duration: totalDuration,
    type: flight?.type || 'One way',
    airline_logo: flight?.airline_logo || legs[0].airline_logo,
  }
}

const normalizeResults = (list, source) =>
  (Array.isArray(list) ? list : [])
    .map((flight, index) => normalizeFlight(flight, index, source))
    .filter(Boolean)

// A round trip is modeled as two independent one-way searches (there and back), rather than
// Google Flights' own two-step "pick outbound, then fetch return options for it" flow — much
// simpler, and it still gives a real, bookable outbound + return pair.
const searchOneWay = async (from, to, date, adults, apiKey) => {
  const params = new URLSearchParams({
    engine: 'google_flights',
    departure_id: from.toUpperCase(),
    arrival_id: to.toUpperCase(),
    outbound_date: date,
    type: '2', // one-way
    adults: String(adults),
    currency: 'INR',
    hl: 'en',
    api_key: apiKey,
  })

  const upstream = await fetch(`https://serpapi.com/search.json?${params}`)
  const data = await upstream.json()

  // "no flights for this query" is an empty result, not a failure
  if (data.error && !/hasn't returned any results|no results/i.test(data.error)) {
    console.error('SerpApi error:', data.error)
    throw new Error('upstream error')
  }

  return {
    best_flights: normalizeResults(data.best_flights, 'best'),
    other_flights: normalizeResults(data.other_flights, 'other'),
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.SERPAPI_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Flight search is not configured (SERPAPI_KEY is missing)' })
  }

  const { from, to, date, returnDate, travellers, tripType } = req.body ?? {}

  if (!IATA_CODE.test(from ?? '') || !IATA_CODE.test(to ?? '') || !ISO_DATE.test(date ?? '')) {
    return res.status(400).json({ error: 'from, to (3-letter airport codes) and date (YYYY-MM-DD) are required' })
  }
  if (from.toUpperCase() === to.toUpperCase()) {
    return res.status(400).json({ error: 'from and to cannot be the same airport' })
  }

  const isRoundTrip = tripType === 'round'
  if (isRoundTrip) {
    if (!ISO_DATE.test(returnDate ?? '')) {
      return res.status(400).json({ error: 'returnDate (YYYY-MM-DD) is required for a round trip' })
    }
    if (returnDate < date) {
      return res.status(400).json({ error: 'returnDate cannot be before date' })
    }
  }

  const adults = Math.min(9, Math.max(1, parseInt(travellers, 10) || 1))

  try {
    if (isRoundTrip) {
      const [outbound, returnLeg] = await Promise.all([
        searchOneWay(from, to, date, adults, apiKey),
        searchOneWay(to, from, returnDate, adults, apiKey),
      ])
      return res.status(200).json({ outbound, return: returnLeg })
    }

    const oneWay = await searchOneWay(from, to, date, adults, apiKey)
    return res.status(200).json(oneWay)
  } catch (error) {
    console.error('Flight search failed:', error)
    return res.status(502).json({ error: 'Flight search is temporarily unavailable' })
  }
}
