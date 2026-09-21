// Taxes and fees charged per passenger.
export const TAX_BREAKDOWN = { airport: 500, service: 250, gst: 375 }

export const TAXES_PER_PASSENGER = Object.values(TAX_BREAKDOWN).reduce((sum, amount) => sum + amount, 0)
