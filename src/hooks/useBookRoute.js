import { useNavigate } from 'react-router-dom'
import { useFlight } from './useFlight'
import { getIataCode } from '../utils/airports'
import { ROUTES } from '../constants/routes'

// Starts a fresh one-way search for a given route and jumps straight to the results --
// the traveller can change the date once there. Shared by any "click a destination, go
// straight to booking" card (Popular Routes on Home, the deal cards on the Deals page).
export const useBookRoute = () => {
  const navigate = useNavigate()
  const { setSearchData, initialSearchData } = useFlight()

  return (from, to) => {
    const date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    setSearchData({
      ...initialSearchData,
      from: getIataCode(from),
      to: getIataCode(to),
      date,
    })
    navigate(ROUTES.booking)
  }
}
