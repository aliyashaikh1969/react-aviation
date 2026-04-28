import React from 'react'
import { IoPricetagsOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsCalendar2Check } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";


export const Features = () => {
  return (
    <>
      <div className='flex px-36 py-6'>
        <div className='flex items-center gap-3 flex-[20%]'>
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center'>
            <span className='text-3xl'><IoPricetagsOutline /></span>
          </div>
          <div>
            <p className='font-semibold text-sm'>Best Price Guarantee</p>
            <p className='text-xs text-gray-500 max-w-40'>We ensure you get the best fares on every booking</p>
          </div>
        </div>
        <div className='flex items-center gap-3 flex-[20%]'>
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center'>
            <span className='text-3xl'><TfiHeadphoneAlt /></span>
          </div>
          <div>
            <p className='font-semibold text-sm'>24/7 Customer Support</p>
            <p className='text-xs text-gray-500 max-w-40'>we're here to help you anytime, anywhere.</p>
          </div>
        </div>
        <div className='flex items-center gap-3 flex-[20%]'>
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center '>
            <span className='text-3xl'> <BsCalendar2Check /></span>
          </div>
          <div>
            <p className='font-semibold text-sm'>Easy Booking</p>
            <p className='text-xs text-gray-500 max-w-40'>Simple steps to book your perfect flight.</p>
          </div>
        </div>
         <div className='flex items-center gap-3 flex-[20%]'>
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center '>
            <span className='text-3xl'><IoShieldCheckmarkOutline /></span>
          </div>
          <div>
            <p className='font-semibold text-sm'>Safe & Secure</p>
            <p className='text-xs text-gray-500 max-w-40'>Your data is safe and protected.</p>
          </div>
        </div>
      </div>
    </>
  )
}
