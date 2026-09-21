import { useFlight } from '../hooks/useFlight'
import { TAXES_PER_PASSENGER } from '../constants/fare'

// Single source of truth for the fare shown on every step of the booking flow.
export const useFare = () => {
  const { selectedFlight, selectedSeats, searchData } = useFlight()
  const travellers = searchData.travellers

  const baseFare = (selectedFlight?.price ?? 0) * travellers
  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0)
  const taxes = TAXES_PER_PASSENGER * travellers
  const grandTotal = baseFare + seatTotal + taxes

  return { travellers, baseFare, seatTotal, taxes, grandTotal }
}
