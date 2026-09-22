import { getIataCode } from '../utils/airports'

// Searches go through our own /api/flights endpoint (api/flights.js), which adds
// the SerpApi key on the server so it never reaches the browser, and normalizes
// the response before it gets here.
export const searchFlights = async (searchData) => {
  let response
  try {
    response = await fetch('/api/flights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: getIataCode(searchData.from),
        to: getIataCode(searchData.to),
        date: searchData.date,
        returnDate: searchData.returnDate,
        travellers: searchData.travellers,
        tripType: searchData.tripType,
      }),
    })
  } catch (networkErr) {
    // fetch() itself only throws for network-level failures (offline, DNS, CORS) —
    // an HTTP error status still resolves normally and is handled below instead.
    const err = new Error('Network error. Please check your connection and try again.')
    err.isNetworkError = true
    err.cause = networkErr
    throw err
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error ?? `Flight search failed (${response.status})`)

  return [...(data.best_flights ?? []), ...(data.other_flights ?? [])]
}
