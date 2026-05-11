import React from 'react';
import { IoBagHandleOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import { PiSeatBold } from "react-icons/pi";
import { IoIosAirplane } from "react-icons/io";
import airIndia from "../../assets/airIndia.png"
import { useNavigate } from "react-router-dom";



export const FlightCard = ({flight, nextStep}) => {

  console.log(flight)
  const navigate = useNavigate();

  const handleSelectFlight = () => {

  navigate("/booking", {
    state: {
      selectedFlight: flight,
    },
  });
};
  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md flex justify-between md:items-center md:flex-row flex-col">

      <div className='px-3 flex-1'>
        <div className='flex px-2 py-5 md:items-center border-b md:flex-row flex-col overflow-hidden'>

          <div className='flex items-center flex-1  -translate-x-8'>
            <div className='h-20 '>
              <img src={airIndia} className='w-[100%] h-[100%] object-cover' alt="" />
            </div>
            <div>
              <p className="font-bold text-sm">{flight.airline}</p>
              <span className='text-gray-600 text-xs'>6E 213</span>
            </div>
          </div>
          <div className='flex flex-1 md:flex-auto items-center justify-between'>
            <div>
              <p className='font-bold text-xl'>{flight.departure}</p>
              <span className='text-sm'>{flight.from}</span>
            </div>
            <div className='flex items-center gap-3'>

              <span className='text-gray-400'>
                < IoIosAirplane />
              </span>
              <div className='flex flex-col'>
                <span className='text-xs text-gray-500 font-semibold pb-3 px-5 border-b-2 border-gray-400'>{flight.duration}</span>
                <span className='text-xs text-gray-500 font-semibold pt-3 px-5'>Non-stop</span>
              </div>
              <span className='text-gray-400'>
                <IoIosAirplane />
              </span>
            </div>
            <div className='text-center'>
              <p className='font-bold text-xl'>{flight.arrival}</p>
              <span className='text-sm'>{flight.to}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-10 p-3 text-gray-600'>
          <div className='flex items-center gap-3 '>
            <span className='text-lg'><IoBagHandleOutline /></span>
            <p className='text-xs font-semibold'>15 kg Baggage</p>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-lg'><GiMeal /></span>
            <p className='text-xs font-semibold'>Meal Availabe</p>
          </div>
          <div className='flex items-center '>
            <span className='text-lg'><PiSeatBold /></span>
            <p className='text-xs font-semibold'>Standard Seat</p>
          </div>
        </div>
      </div>

      <div className="px-10   text-center flex justify-between md:flex-col">
        <div>
          <h2 className="text-xl font-bold text-black">₹{flight.price}</h2>
          <p className='text-xs font-semibold'>per person</p>
        </div>
        <div>
          <button onClick={nextStep} className="m-2 bg-blue-500 text-white px-10 py-1 rounded">
            Select

          </button>
          <p className='text-xs font-semibold text-green-600'>2 seats left</p>
        </div>
      </div>

    </div>
  );
};

