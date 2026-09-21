// Airport lookup used by the search form and the flight search service.

const CITY_TO_IATA = {
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

// one entry per airport, for the search autocomplete
export const AIRPORT_SUGGESTIONS = [
  ["Delhi", "DEL"], ["Mumbai", "BOM"], ["Bangalore", "BLR"], ["Hyderabad", "HYD"],
  ["Chennai", "MAA"], ["Kolkata", "CCU"], ["Pune", "PNQ"], ["Ahmedabad", "AMD"],
  ["Goa", "GOI"], ["Jaipur", "JAI"], ["Kochi", "COK"], ["Lucknow", "LKO"],
  ["Nagpur", "NAG"], ["Indore", "IDR"], ["Varanasi", "VNS"], ["Amritsar", "ATQ"],
  ["Chandigarh", "IXC"], ["Guwahati", "GAU"], ["Patna", "PAT"], ["Bhopal", "BHO"],
  ["Raipur", "RPR"], ["Surat", "STV"], ["Coimbatore", "CJB"], ["Bhubaneswar", "BBI"],
  ["Ranchi", "IXR"], ["Thiruvananthapuram", "TRV"],
]

// "Delhi" -> "DEL"; an existing 3-letter code is returned unchanged
export const getIataCode = (input) => {
  if (!input) return ""
  const lower = input.toLowerCase().trim()
  if (input.length === 3 && input === input.toUpperCase()) return input
  return CITY_TO_IATA[lower] ?? input.slice(0, 3).toUpperCase()
}
