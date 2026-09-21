import { useContext } from 'react'
import { PassengerContext } from '../context/PassengerContext'

export const usePassenger = () => useContext(PassengerContext)
