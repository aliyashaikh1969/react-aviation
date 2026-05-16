import React from 'react'
import apple from '../../assets/apple.png'
import logo from '../../assets/aviation-logo.png'
import google from '../../assets/google.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialSkype } from "react-icons/ti";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import { BsAirplaneFill } from "react-icons/bs";




export const Footer = () => {
  return (
    <>
      <footer className="bg-[#031e3d] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">

          {/* Top Grid */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">

            {/* Brand */}
            <div className="lg:col-span-1">

              {/* Logo */}
              <div className="flex items-center gap-3">
                <img src={logo} alt="" />
              </div>

              {/* Text */}
              <p className="text-blue-100 text-sm leading-7 mt-6 max-w-[250px]">
                Your trusted travel partner.
                Book flights, explore destinations
                and enjoy the best deals.
              </p>

              {/* Social */}
              <div className="flex items-center gap-3 mt-7">

                <button className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-[#031B57] transition-all flex items-center justify-center">
                  <FiFacebook className="text-lg" />
                </button>

                <button className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-[#031B57] transition-all flex items-center justify-center">
                  <FiTwitter className="text-lg" />
                </button>

                <button className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-[#031B57] transition-all flex items-center justify-center">
                  <FiInstagram className="text-lg" />
                </button>

                <button className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-[#031B57] transition-all flex items-center justify-center">
                  <FiYoutube className="text-lg" />
                </button>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Company
              </h3>

              <div className="space-y-4 text-blue-100 text-sm">

                <a href="#" className="block hover:text-white transition">
                  About Us
                </a>

                <a href="#" className="block hover:text-white transition">
                  Careers
                </a>

                <a href="#" className="block hover:text-white transition">
                  Press
                </a>

                <a href="#" className="block hover:text-white transition">
                  Blog
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Support
              </h3>

              <div className="space-y-4 text-blue-100 text-sm">

                <a href="#" className="block hover:text-white transition">
                  Help Center
                </a>

                <a href="#" className="block hover:text-white transition">
                  FAQs
                </a>

                <a href="#" className="block hover:text-white transition">
                  Baggage Info
                </a>

                <a href="#" className="block hover:text-white transition">
                  Contact Us
                </a>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Policies
              </h3>

              <div className="space-y-4 text-blue-100 text-sm">

                <a href="#" className="block hover:text-white transition">
                  Privacy Policy
                </a>

                <a href="#" className="block hover:text-white transition">
                  Terms & Conditions
                </a>

                <a href="#" className="block hover:text-white transition">
                  Cancellation Policy
                </a>

                <a href="#" className="block hover:text-white transition">
                  Refund Policy
                </a>
              </div>
            </div>

            {/* Newsletter */}

            <div className='font-semibold'>
              <h3 className='text-xl font-semibold mb-6'>Download Our App</h3>
              <div className='flex'>
                <img className='w-[50%]' src={google} alt="" />
                <img className='w-[50%]' src={apple} alt="" />
              </div>
            </div>

          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-blue-200 text-sm">
          © 2024 SkyBook. All rights reserved.
        </div>
      </footer>


    </>
  )
}
