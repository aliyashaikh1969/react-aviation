import React, { useEffect, useRef, useState } from 'react'
import { GiCommercialAirplane } from "react-icons/gi";
import { PiIslandThin } from "react-icons/pi";
import {  FiMapPin } from "react-icons/fi";
import { BsAirplane } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import {  IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useFlight } from '../../context/FlightContext';
import toast from 'react-hot-toast';


export const SearchFlights = ({ onSearch, update}) => {

  const dateRef = useRef(null);
  const navigate = useNavigate()

  const { flightData, setFlightData ,initialFlightData} = useFlight();
  
  const [formData, setFormData] = useState(flightData)

  useEffect(()=>{
    setFormData(flightData);
  },[])


  const openCalendar = () => {
    if (dateRef.current?.showPicker) {
      dateRef.current.showPicker();
    } else {
      dateRef.current.focus();
    }
  };
  const tripType = formData.tripType


  const swapLocation = () => {
    setFormData((prev)=>({ ...prev,from:prev.to ,to:prev.from}))
  };


  const handleChange = (e) => {

    
    let { name, value } = e.target
    if(name === "travellers") value = Math.max(1,parseInt(value) || 1);

    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))
  }
  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.date) {
      return toast.error("Fill all the Fields");
    }

    setFlightData(formData);

    navigate('/booking');
  };


  const updateData=() =>{
    setFlightData(formData)
    onSearch?.()
  }
  return (
    <div>
      {/* trip type */}
      <div className='bg-gray-200 md:w-fit rounded-t-lg flex gap-2 justify-between md:justify-start md:p-1 md:pb-2 p-1 pb-2  '>
        <button onClick={() => setFormData(prev => ({ ...prev, tripType: "oneway" }))} className={`py-2 px-3 flex items-center text-sm rounded-xl ${tripType === "oneway" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <GiCommercialAirplane />One way</button>

        <button onClick={() => setFormData(prev => ({ ...prev, tripType: "round" }))} className={`py-2 px-3 flex items-center text-sm rounded-xl ${tripType === "round" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <GiCommercialAirplane />round Trip</button>

        <button  onClick={() => setFormData(prev => ({ ...prev, tripType: "multicity" }))} className={`py-2 px-3 flex items-center text-sm  rounded-xl ${tripType === "multicity" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <PiIslandThin />Multi City</button>
      </div>

      {/* search form */}
      <div className="relative p-4 shadow-2xl flex flex-col lg:flex-row overflow-visible bg-white justify-between  w-full md:rounded-e-xl md:rounded-bl-xl md:items-center">

        {/* FROM */}
        <div className="flex-1 min-w-0 p-2 lg:border overflow-hidden">
          <p className="text-xs text-gray-600 font-semibold">FROM</p>

          <div className="flex items-center justify-between md:pr-3">
            <div className="flex items-center w-full">
              <span className="text-[#06448a] p-2 text-xl">
                <FiMapPin />
              </span>

              <input
              name='from'
                type="text"
                value={formData.from}
                onChange={handleChange}
                className="w-full text-sm font-bold outline-none text-black"
              />
            </div>

            <p className="text-sm text-gray-700 hidden md:block">
  {formData.from?.slice(0, 3).toUpperCase() || "---"}
            </p>
          </div>
        </div>

        {/* SWAP BUTTON */}
        <div className='md:w-2 h-2  flex items-center justify-center -translate-x-[2px]'>

          <button
            onClick={swapLocation}
            className=" border p-2 rounded-full bg-white shadow-lg text-[#06448a] z-20"
          >
            <LiaExchangeAltSolid />
          </button>
        </div>

        {/* TO */}
        <div className="flex-1 min-w-0 p-2 lg:border overflow-hidden">
          <p className="text-xs text-gray-600 font-semibold">TO</p>

          <div className="flex items-center justify-between md:pl-3">
            <div className="flex items-center w-full">
              <span className="text-[#06448a] p-2 text-xl">
                <BsAirplane />
              </span>

              <input
                name='to'
                type="text"
                value={formData.to}
                onChange={handleChange}
                className="w-full text-sm font-bold outline-none text-black"
              />
            </div>

            <p className="text-sm text-gray-700 hidden md:block">
  {formData.to?.slice(0, 3).toUpperCase() || "---"}
            </p>
          </div>
        </div>

        {/* DEPARTURE */}
        <div className="flex-1 min-w-0 p-2 lg:border-r">
          <p className="text-xs text-gray-600 font-semibold">
            DEPARTURE
          </p>

          <div className="flex items-center">
            <button
              type="button"
              onClick={openCalendar}
              className="text-[#06448a] p-3 text-xl"
            >
              <SlCalender />
            </button>

            <input
              ref={dateRef}
              name='date'
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-transparent text-sm font-bold outline-none text-black" />
          </div>
        </div>

        {/* RETURN DATE */}
        {tripType === "round" && (
          <div className="flex-1 min-w-0 p-2 lg:border-r">
            <p className="text-xs text-gray-600 font-semibold">
              RETURN
            </p>

            <div className="flex items-center">
              <span className="text-[#06448a] p-3 text-xl">
                <SlCalender />
              </span>

              <input
                type="date"
                name='returnDate'
                value={formData.returnDate}
                onChange={handleChange}
                className=" w-full bg-transparent text-sm font-bold outline-none text-black "
              />
            </div>
          </div>
        )}

        {/* TRAVELLERS */}
        <div className="flex-1 min-w-0 p-2">
          <p className="text-xs text-gray-600 font-semibold">
            PASSENGER & CLASS
          </p>

          <div className="flex items-center">
            <span className="text-[#06448a] p-3 text-xl">
              <IoPersonOutline />
            </span>

            <input
              type="number"
              min={1}
              name='travellers'
              value={formData.travellers}
              onChange={handleChange}
              className=" w-full bg-transparent text-sm font-bold outline-none text-black"
            />
          </div>
        </div>

        {
          update ? (
            <button 
                className=" flex items-center justify-center bg-[#031e3d] px-5 py-3 rounded-lg text-white w-full lg:w-auto"
             onClick={()=>updateData()}>
              Update data
            </button>
          ) : (
            <div className="flex items-center justify-center p-2">
              <button

                onClick={handleSearch}
                className=" flex items-center justify-center bg-[#031e3d] px-5 py-3 rounded-lg text-white w-full lg:w-auto"
              >
                Search Flights
                <span className="pl-2">
                  <IoIosArrowForward />
                </span>
              </button>
            </div>
          )
        }
        {/* SEARCH BUTTON */}

      </div>
    </div>
  )
}
