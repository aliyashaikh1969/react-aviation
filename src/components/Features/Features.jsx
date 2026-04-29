import React from 'react'
import { IoPricetagsOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsCalendar2Check } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";


export const Features = () => {
	return (
		<>
			<div className='flex md:px-36 px-24 py-6 gap-5'>
				<div className='flex md:flex-row flex-col items-center gap-3 p-3 flex-[40%] md:flex-[20%]'>
					<div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center'>
						<span className='text-3xl text-[#06448a]'><IoPricetagsOutline /></span>
					</div>
					<div>
						<p className='font-semibold text-sm'>Best Price Guarantee</p>
						<p className='hidden md:block text-xs text-gray-500'>We ensure you get the best fares on every booking</p>
					</div>
				</div>
				<div className='flex md:flex-row flex-col items-center gap-3 p-3 flex-[40%] md:flex-[20%]'>
					<div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center'>
						<span className='text-3xl text-[#06448a]'><TfiHeadphoneAlt /></span>
					</div>
					<div>
						<p className='font-semibold text-sm'>24/7 Customer Support</p>
						<p className='hidden md:block text-xs text-gray-500'>we're here to help you anytime, anywhere.</p>
					</div>
				</div>
				<div className='flex md:flex-row flex-col items-center gap-3 p-3 flex-[40%] md:flex-[20%]'>
					<div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center '>
						<span className='text-3xl text-[#06448a]'> <BsCalendar2Check /></span>
					</div>
					<div>
						<p className='font-semibold text-sm'>Easy Booking</p>
						<p className='hidden md:block text-xs text-gray-500'>Simple steps to book your perfect flight.</p>
					</div>
				</div>
				<div className='flex md:flex-row flex-col items-center gap-3 p-3 flex-[40%] md:flex-[20%]'>
					<div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center '>
						<span className='text-3xl text-[#06448a]'><IoShieldCheckmarkOutline /></span>
					</div>
					<div>
						<p className='font-semibold text-sm'>Safe & Secure</p>
						<p className='hidden md:block text-xs text-gray-500'>Your data is safe and protected.</p>
					</div>
				</div>
			</div>
		</>
	)
}
