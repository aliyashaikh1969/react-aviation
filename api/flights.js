// Serverless proxy for flight search (Vercel function; also served by `npm run dev`).
// Keeps SERPAPI_KEY on the server so it is never shipped to the browser.

const IATA_CODE = /^[A-Za-z]{3}$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

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

  const isRoundTrip = tripType === 'round' && ISO_DATE.test(returnDate ?? '')
  const adults = Math.min(9, Math.max(1, parseInt(travellers, 10) || 1))

  const params = new URLSearchParams({
    engine: 'google_flights',
    departure_id: from.toUpperCase(),
    arrival_id: to.toUpperCase(),
    outbound_date: date,
    type: isRoundTrip ? '1' : '2',
    adults: String(adults),
    currency: 'INR',
    hl: 'en',
    api_key: apiKey,
  })
  if (isRoundTrip) params.set('return_date', returnDate)

  try {
    const upstream = await fetch(`https://serpapi.com/search.json?${params}`)
    const data = await upstream.json()

    // "no flights for this query" is an empty result, not a failure
    if (data.error && !/hasn't returned any results|no results/i.test(data.error)) {
      console.error('SerpApi error:', data.error)
      return res.status(502).json({ error: 'Flight search is temporarily unavailable' })
    }

    return res.status(200).json({
      best_flights: data.best_flights ?? [],
      other_flights: data.other_flights ?? [],
    })
  } catch (error) {
    console.error('Flight search failed:', error)
    return res.status(502).json({ error: 'Flight search is temporarily unavailable' })
  }
}
