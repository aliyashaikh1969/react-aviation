import { getIataCode } from '../utils/airports'

// Calls our own /api/flights endpoint, which talks to SerpApi so the API key
// stays on the server.
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
    // fetch throws for network issues (offline, DNS, etc.) - a bad HTTP status doesn't throw here
    const err = new Error('Network error. Please check your connection and try again.')
    err.isNetworkError = true
    err.cause = networkErr
    throw err
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error ?? `Flight search failed (${response.status})`)

  const flatten = (leg) => [...(leg?.best_flights ?? []), ...(leg?.other_flights ?? [])]

  // a round trip is two independent one-way searches — the outbound and return legs
  // come back as separate flight lists instead of one flat list
  if (searchData.tripType === 'round') {
    return { outbound: flatten(data.outbound), return: flatten(data.return) }
  }
  return flatten(data)
}
