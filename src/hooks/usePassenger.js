import { useContext } from 'react'
import { PassengerContext } from '../context/PassengerProvider'

export const usePassenger = () => useContext(PassengerContext)
