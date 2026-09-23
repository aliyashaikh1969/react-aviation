// Taxes and fees charged per passenger.
export const TAX_BREAKDOWN = { airport: 500, service: 250, gst: 375 }

export const TAXES_PER_PASSENGER = Object.values(TAX_BREAKDOWN).reduce((sum, amount) => sum + amount, 0)

// Promo codes a traveller can enter at checkout for a flat discount. Also shown as
// coupon codes on the Deals page.
export const PROMO_CODES = {
  FIRST100: { amount: 100, label: "Flat ₹100 off — first booking" },
  FLY10: { amount: 250, label: "₹250 off" },
  SAVE500: { amount: 500, label: "Flat ₹500 off" },
  WELCOME150: { amount: 150, label: "Flat ₹150 off" },
  GLOBAL1000: { amount: 1000, label: "Flat ₹1,000 off international flights" },
}
