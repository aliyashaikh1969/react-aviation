import React from 'react'
import { PassengerDeatils } from '../../components/PassengerDeatils'
import { PriceDetails } from '../../components/PriceDetails'
import { FlightDetails } from '../../components/FlightDetails'
import { SeatDetails } from '../../components/SeatDetails'
import { WhyChooseUs } from '../../components/WhyChoose/WhyChooseUs'
import { FaArrowLeft } from "react-icons/fa6";


export const Summary = ({
  nextStep,
  prevStep,
  bookingData
}) => {

  console.log(bookingData)
  return (
    <div className='px-16 pt-20 '>
       <h2 className='md:text-xl text-lg text-[#031e3d] font-semibold'>Booking Summary</h2>
        <p className='text-[#031e3d]   text-sm'>Review your booking details before confirming your flight.</p>
      
      <div className='flex gap-5 md:flex-row flex-col pt-5'>

        <div className='flex-[40%] flex gap-5 flex-col'>
          <PassengerDeatils/>
          <PriceDetails />
        </div>
        <div className='flex-[60%] flex gap-5  flex-col'>
          <FlightDetails />
          <SeatDetails prevStep={prevStep}/>
        </div>
      </div>
      <WhyChooseUs />
      <div className='flex justify-between items-center mb-4'>
        <button className='flex items-center gap-4 p-3 text-blue-600' onClick={prevStep}><span><FaArrowLeft />
</span> Back to Seats</button>
        <button onClick={nextStep} className="  rounded-md bg-[#0A2A6B] hover:bg-[#081f52] transition-all duration-300 text-white font-semibold text-sm  shadow-lg py-2 px-4">
        Confirm & Pay ₹3,624
      </button>
      </div>
    </div>
  )
}
