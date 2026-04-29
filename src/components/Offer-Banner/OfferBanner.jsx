import React from 'react'
import { IoSunnySharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";



export const OfferBanner = () => {
  return (
    <div className='px-16 bg-gray-100 py-8' >
      <div className='bg-[#031e3d] py-4 px-8 rounded-md text-white flex justify-between items-center'>
        <div>
          <p className='text-xs'>FLAT 20% OFF</p>
          <p className='flex items-center gap-3 py-2 text-3xl font-bold'>Summer Travel Bonanza <span className='text-yellow-300 text-2xl'><IoSunnySharp /></span></p>
          <p className='text-sm'>Book your flights and get aeciting discounts!</p>
        </div>
        <button className='border flex items-center px-4 py-2 rounded-md gap-3 '>Explore Deals <span><FaArrowRight /></span></button>
      </div>
    </div>
  )
}
