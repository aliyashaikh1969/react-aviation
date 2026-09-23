import { useFlight } from '../hooks/useFlight'
import { PROMO_CODES, TAXES_PER_PASSENGER } from '../constants/fare'

// Works out the fare for the current booking (used on Summary, Payment and the e-ticket).
// A round trip is two flights (outbound + return), so its fare and taxes count both legs.
export const useFare = () => {
  const { selectedFlight, selectedReturnFlight, selectedSeats, searchData, promoCode } = useFlight()
  const travellers = searchData.travellers
  const isRoundTrip = searchData.tripType === "round"
  const legCount = isRoundTrip ? 2 : 1

  const outboundPrice = selectedFlight?.price ?? 0
  const returnPrice = isRoundTrip ? (selectedReturnFlight?.price ?? 0) : 0
  const baseFare = (outboundPrice + returnPrice) * travellers
  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0)
  const taxes = TAXES_PER_PASSENGER * travellers * legCount

  // Object.hasOwn guards against a stray "__proto__"/"constructor" promoCode resolving to
  // an inherited Object.prototype property instead of `undefined` (see PriceDetails.jsx).
  const promo = promoCode && Object.hasOwn(PROMO_CODES, promoCode) ? PROMO_CODES[promoCode] : null
  // don't let the discount make the total go negative
  const discount = promo ? Math.min(promo.amount, baseFare + seatTotal) : 0

  const grandTotal = baseFare + seatTotal + taxes - discount

  return { travellers, baseFare, seatTotal, taxes, promo, discount, grandTotal }
}
