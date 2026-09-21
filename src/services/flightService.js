import { getIataCode } from '../utils/airports'

// Searches go through our own /api/flights endpoint (api/flights.js), which adds
// the SerpApi key on the server so it never reaches the browser.
export const searchFlights = async (searchData) => {
  const response = await fetch('/api/flights', {
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

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error ?? `Flight search failed (${response.status})`)

  return [...(data.best_flights ?? []), ...(data.other_flights ?? [])]
}
