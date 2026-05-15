import React from "react";
import { BsAirplane } from "react-icons/bs";
import { FaPlaneDeparture, FaUserFriends } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { useFlight } from "../context/FlightContext";


export const SearchSummary = ({ onModify }) => {

  const {flightData} = useFlight()

  console.log(flightData)

  return (
    <div className="bg-white text-black rounded-xl shadow-md">

      {/* <div className="flex items-center gap-6">
        <div>
          <p className="text-sm text-gray-500">From</p>
          <h2 className="font-bold">{from}</h2>
        </div>

        ✈

        <div>
          <p className="text-sm text-gray-500">To</p>
          <h2 className="font-bold">{to}</h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>
          <h2 className="font-bold">{date}</h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Travellers</p>
          <h2 className="font-bold">{travellers}</h2>
        </div>

        <button
          onClick={onModify}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Modify
        </button>
      </div> */}

      <div className='rounded-2xl relative flex justify-between p-2  w-full md:flex-row flex-col'>
        <div className='flex-1 border-r-2 p-2 pr-8'>
          <p className="text-xs text-gray-600 font-semibold ">FROM</p>
          <div className='flex items-center justify-between pt-2'>
            <div className='flex items-center'>
              <span className='text-[#06448a] p-2 text-xl'><FiMapPin /></span>
              <p className='font-bold'>{flightData.from}</p>
            </div>
            {/* <p className='text-gray-700'>DEL</p> */}
          </div>
        </div>
        <span className='absolute md:left-[17.8rem] md:top-10 left-[50%] top-[5.2rem] rotate-90 md:rotate-0 border p-2 rounded-full bg-white shadow-lg text-[#06448a]'>
          <LiaExchangeAltSolid />
        </span>
        <div className='flex-1 border-r-2 py-2 pl-7 pr-2'>
          <p className="text-xs text-gray-600 font-semibold">TO</p>
          <div className='flex items-center justify-between pt-2'>
            <div className='flex items-center '>
              <span className='text-[#06448a] p-2 text-xl'><BsAirplane /></span>
              <p className='font-bold'>{flightData.to}</p>
            </div>
            {/* <p className='text-gray-700'>BOM</p> */}
          </div>
        </div>
        <div className='flex-1 border-r-2 p-2'>
          <p className="text-xs text-gray-600 font-semibold">DEPARTURE</p>
          <div className='flex items-center pt-2'>
            <span className='text-[#06448a] p-4 text-xl'><SlCalender /></span>
            <div>
              <p className='font-medium text-sm'>{flightData.date}</p>
              {/* <span className='text-sm text-gray-600'>Friday</span> */}
            </div>
          </div>
        </div>
        <div className='flex-1 border-r-2 p-2 '>
          <p className="text-xs text-gray-600 font-semibold">PASSANGER & CLASS</p>
          <div className='flex items-center pt-2'>
            <span className='text-[#06448a] p-4 text-xl'><IoPersonOutline /></span>
            <div>
              <p className='font-semibold flex items-center'>{flightData.travellers} </p>
              <span className='text-sm text-gray-600'>Economy</span>
            </div>

          </div>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          
          <button className='flex items-center bg-[#031e3d] px-5 py-2 rounded-lg text-white' onClick={onModify}> <span><PiPencilSimpleLineLight /></span> Modify </button>
        </div>
      </div>
    </div>
  );
};
