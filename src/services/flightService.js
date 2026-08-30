const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY

const BASE_URL = 'https://serpapi.com/search.json'
// ✅ IATA mapping
const airportCodes = {
  "delhi": "DEL", "new delhi": "DEL",
  "lucknow": "LKO", "lukhnow": "LKO",
  "mumbai": "BOM", "bombay": "BOM",
  "bangalore": "BLR", "bengaluru": "BLR",
  "hyderabad": "HYD",
  "chennai": "MAA", "madras": "MAA",
  "kolkata": "CCU", "calcutta": "CCU",
  "pune": "PNQ",
  "ahmedabad": "AMD",
  "goa": "GOI",
  "jaipur": "JAI",
  "kochi": "COK", "cochin": "COK",
  "nagpur": "NAG",
  "indore": "IDR",
  "varanasi": "VNS",
  "amritsar": "ATQ",
  "chandigarh": "IXC",
  "guwahati": "GAU",
  "patna": "PAT",
  "bhopal": "BHO",
  "raipur": "RPR",
  "surat": "STV",
  "coimbatore": "CJB",
  "bhubaneswar": "BBI",
  "ranchi": "IXR",
  "thiruvananthapuram": "TRV", "trivandrum": "TRV",
}

export const getIATACode = (input) => {
  if (!input) return ""
  const lower = input.toLowerCase().trim()
  if (input.length === 3 && input === input.toUpperCase()) return input
  return airportCodes[lower] ?? input.slice(0, 3).toUpperCase()
}

export const searchFlights = async (flightData) => {
  try {
    const from = getIATACode(flightData.from)
    const to = getIATACode(flightData.to)

    console.log(`Searching: ${from} → ${to}`)  // debug ke liye

    const params = new URLSearchParams({
      engine: "google_flights",
      departure_id: from,
      arrival_id: to,
      outbound_date: flightData.date,
      type: flightData.tripType === "round" ? "1" : "2",
      adults: String(flightData.travellers ?? 1),
      currency: "INR",
      hl: "en",
      api_key: SERPAPI_KEY,
      no_cache: "true",
    })

    if (flightData.tripType === "round" && flightData.returnDate) {
      params.set("return_date", flightData.returnDate)
    }

    const res = await fetch(`${BASE_URL}?${params}`)
    const data = await res.json()

    if (data.error) {
      console.error("SerpApi error:", data.error)
      return []
    }

    return [
      ...(data.best_flights ?? []),
      ...(data.other_flights ?? []),
    ]

  } catch (error) {
    console.error("Search error:", error)
    return []
  }
}