import React from 'react'
import apple from '../../assets/apple.png'
import logo from '../../assets/aviation-logo.png'
import google from '../../assets/google.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialSkype } from "react-icons/ti";




export const Footer = () => {
  return (
    <div className='px-16 py-8 bg-[#031e3d] text-white '>
        <div className='flex gap-5 justify-evenly border-b border-gray-700 pb-8 '>  
          <ul className='flex-1'>
            <li>
              <img src={logo} alt="" />
            </li>
            <li className='text-xs py-1'>Your trusted travel partner.</li>
            <li className='text-xs py-1'>Book flights, explore destinations</li>
            <li className='text-xs py-1'>and enjoy the best deals.</li>
            <li className='flex items-center gap-3'>
              <span><FaFacebookF /></span>
              <span><FaTwitter /></span>
              <span><TiSocialSkype /></span>
              <span><TiSocialInstagram /></span>
              <span><TiSocialYoutube /></span>
            </li>
          </ul>
          <ul className='flex-1 '>
            <li className='font-semibold '>Company</li>
            <li className='text-xs py-1'>About Us</li>
            <li className='text-xs py-1'>Careers</li>
            <li className='text-xs py-1'>Press</li>
            <li className='text-xs py-1'>Contact Us</li>
          </ul>
          <ul className='flex-1 '>
            <li className='font-semibold'>Support</li>
            <li className='text-xs py-1'>Help Center</li>
            <li className='text-xs py-1'>FAQs</li>
            <li className='text-xs py-1'>Cancel Booking</li>
            <li className='text-xs py-1'>Refund Policy</li>
          </ul>
          <ul className='flex-1 '>
            <li className='font-semibold '>Information</li>
            <li className='text-xs py-1'>Privacy Policy</li>
            <li className='text-xs py-1'>Turms & Conditions</li>
            <li className='text-xs py-1'>Baggage Policy</li>
            <li className='text-xs py-1'>Travel Guide</li>
          </ul>
          <ul className='flex-1 '>
            <li className='font-semibold'>Download Our App</li>
            <li><img src={google} alt="" /></li>
            <li><img src={apple} alt="" /></li>
          </ul>
        </div>
        <div>
          <p className='text-sm py-2'>@2026 Sky Aero Bookings. All rights reserved by Aliya</p>
        </div>
    </div>
  )
}
