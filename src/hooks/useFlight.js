import { useContext } from 'react'
import { FlightContext } from '../context/FlightContext'

export const useFlight = () => useContext(FlightContext)
