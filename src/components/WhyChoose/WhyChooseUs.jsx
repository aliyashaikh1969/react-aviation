import React from 'react'
import { AiFillOpenAI } from "react-icons/ai";
import { AiFillIeCircle } from "react-icons/ai";
import { AiFillDropboxCircle } from "react-icons/ai";
import { AiFillDribbbleCircle } from "react-icons/ai";


export const WhyChooseUs = () => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-4 sm:px-8 lg:px-16 xl:px-24 py-6">
        <div className="flex flex-col md:flex-row items-center gap-3 p-4 text-center md:text-left">
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center'>
            <span className='text-4xl text-[#06448a]'><AiFillDropboxCircle /></span>
          </div>
          <div>
            <p className='font-semibold text-lg'>Wide Choices</p>
            <p className='hidden md:block text-sm text-gray-500'>We ensure you get the best fares on every booking</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 p-4 text-center md:text-left">
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center'>
            <span className='text-4xl text-[#06448a]'><AiFillDribbbleCircle /></span>
          </div>
          <div>
            <p className='font-semibold text-lg'>Affordable Fares</p>
            <p className='hidden md:block text-sm text-gray-500'>we're here to help you anytime, anywhere.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 p-4 text-center md:text-left">
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center '>
            <span className='text-4xl text-[#06448a]'><AiFillOpenAI /></span>
          </div>
          <div>
            <p className='font-semibold text-lg'>Smooth Experience</p>
            <p className='hidden md:block text-sm text-gray-500'>Simple steps to book your perfect flight.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 p-4 text-center md:text-left">
          <div className='bg-[#5ac3fc4c] rounded-md w-12 h-12 flex items-center justify-center '>
            <span className='text-4xl text-[#06448a]'><AiFillIeCircle /></span>
          </div>
          <div>
            <p className='font-semibold text-lg'>Trusted by Millions</p>
            <p className='hidden md:block text-sm text-gray-500'>Your data is safe and protected.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
