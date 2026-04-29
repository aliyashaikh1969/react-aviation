import React from 'react'

export const NewsLetter = () => {
  return (
    <div className='px-16 bg-blue-100 py-8' >
    <div className=' flex md:flex-row flex-col gap-5 items-center justify-between'>
      <div>
        <p className='font-bold py-1 text-lg'>Get the best travel deals straight to your inbox!</p>
        <p className='text-sm'>Subscribe to our newsletter and never miss an offer.</p>
      </div>
      <div className='flex rounded-md overflow-hidden w-[600px]'>
        <input type="text" placeholder='enter email address' className='flex-[70%] px-4 py-3'/>
        <button className='flex-[30%] px-4 bg-[#031e3d] text-white text-lg'>Subscribe</button> 
      </div>
    </div>
    </div>
  )
}
