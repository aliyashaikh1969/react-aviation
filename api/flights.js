// api/flights.js
export default async function handler(req, res) {

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { from, to, date, returnDate, travellers, tripType } = req.body

  if (!from || !to || !date) {
    return res.status(400).json({ error: 'from, to, date required hai' })
  }

  const params = new URLSearchParams({
    engine: "google_flights",
    departure_id: from.toUpperCase(),
    arrival_id: to.toUpperCase(),
    outbound_date: date,
    adults: String(travellers ?? 1),
    currency: "INR",
    hl: "en",
    api_key: process.env.SERPAPI_KEY,  // ✅ Server side — safe!
  })

  // Round trip ke liye
  if (tripType === "round" && returnDate) {
    params.set("return_date", returnDate)
    params.set("type", "1")
  } else {
    params.set("type", "2")
  }

  try {
    const response = await fetch(`https://serpapi.com/search?${params}`)
    const data = await response.json()

    return res.status(200).json({
      best_flights: data.best_flights ?? [],
      other_flights: data.other_flights ?? [],
      price_insights: data.price_insights ?? null,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}