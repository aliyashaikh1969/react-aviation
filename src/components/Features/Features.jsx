import React from 'react'
import { IoPricetagsOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsCalendar2Check } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";


export const Features = () => {
  return (
    <>
      <div>
        <div>
          <div>
            <span><IoPricetagsOutline /></span>
          </div>
          <div>
            <p>Best Price Guarantee</p>
            <p>We ensure you get the best fares on every booking</p>
          </div>
        </div>
        <div>
          <div>
            <span><TfiHeadphoneAlt /></span>
          </div>
          <div>
            <p>24/7 Customer Support</p>
            <p>we're here to help you anytime, anywhere.</p>
          </div>
        </div>
        <div>
          <div>
            <span> <BsCalendar2Check /></span>
          </div>
          <div>
            <p>Best Price Guarantee</p>
            <p>We ensure you get the best fares on every booking</p>
          </div>
        </div>
         <div>
          <div>
            <span><IoShieldCheckmarkOutline /></span>
          </div>
          <div>
            <p>Best Price Guarantee</p>
            <p>We ensure you get the best fares on every booking</p>
          </div>
        </div>
      </div>
    </>
  )
}
