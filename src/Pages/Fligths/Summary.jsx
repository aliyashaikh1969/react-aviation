import React from 'react'
import { PassengerDeatils } from '../../components/PassengerDeatils'
import { PriceDetails } from '../../components/PriceDetails'
import { FlightDetails } from '../../components/FlightDetails'
import { SeatDetails } from '../../components/SeatDetails'
import { WhyChooseUs } from '../../components/WhyChoose/WhyChooseUs'

export const Summary = () => {
  return (
    <div className=''>
      <div className='flex gap-5 md:flex-row flex-col shadow-md justify-center'>

        <div className='flex gap-5 flex-col'>
          <PassengerDeatils/>
          <PriceDetails />
        </div>
        <div className='flex gap-5  flex-col'>
          <FlightDetails />
          <SeatDetails />
        </div>
      </div>
      <WhyChooseUs />
      <div>
        <button>Back to Seats</button>
        <button>Confirm & Pay 3</button>
      </div>
    </div>
  )
}
