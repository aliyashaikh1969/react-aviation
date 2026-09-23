import { useContext } from 'react'
import { FlightContext } from '../context/FlightProvider'

export const useFlight = () => useContext(FlightContext)
