import React, { useEffect, useRef, useState } from 'react'
import { GiCommercialAirplane } from "react-icons/gi";
import { PiIslandThin } from "react-icons/pi";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { BsAirplane } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export const SearchFlights = ({ initialData = {}, onSearch }) => {
    const dateRef = useRef(null);


    const openCalendar = () => {
        if (dateRef.current?.showPicker) {
            dateRef.current.showPicker();
        } else {
            dateRef.current.focus();
        }
    };
    console.log("initial ", initialData);
    const navigate = useNavigate()
    const [tripType, setTripType] = useState(initialData.tripType || "oneway");

    const [form, setForm] = useState({
        from: initialData.from || 'New Delhi',
        to: initialData.to || 'Mumbai',
        date: initialData.date || "",
        returnDate: initialData.returnDate || '',
        travellers: initialData.travellers || 1,
    })

    const swapLocation = () => {
        setForm({
            ...form,
            from: form.to,
            to: form.from,
        })
    }

    const handleSearch = () => {
        if (!form.from || !form.to || !form.date) {
            alert("Fill all fields");
            return;
        }
        const data = { ...form, tripType };

        if (onSearch) {
            onSearch(data);
        } else {
            navigate('/booking', { state: data });
        }
    };

    return (
        <div>
            {/* trip type */}
            <div className='bg-gray-200 md:w-fit rounded-t-lg flex gap-2 justify-between md:justify-start md:p-1 md:pb-2 p-1 pb-2  '>
                <button onClick={() => setTripType("oneway")} className={`py-2 px-3 flex items-center text-sm rounded-xl ${tripType === "oneway" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <GiCommercialAirplane />One way</button>

                <button onClick={() => setTripType("round")} className={`py-2 px-3 flex items-center text-sm rounded-xl ${tripType === "round" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <GiCommercialAirplane />round Trip</button>

                <button onClick={() => setTripType("multicity")} className={`py-2 px-3 flex items-center text-sm  rounded-xl ${tripType === "multicity" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <PiIslandThin />Multi City</button>
            </div>

            {/* search form */}
            {/* search form */}
<div className="relative shadow-2xl flex flex-col lg:flex-row max-w-7xl overflow-visible bg-white justify-between p-2 w-full md:rounded-e-xl md:rounded-bl-xl">

  {/* FROM */}
  <div className="flex-1 min-w-0 p-2 lg:border-r">
    <p className="text-xs text-gray-600 font-semibold">FROM</p>

    <div className="flex items-center justify-between">
      <div className="flex items-center w-full">
        <span className="text-[#06448a] p-2 text-xl">
          <FiMapPin />
        </span>

        <input
          type="text"
          value={form.from}
          onChange={(e) =>
            setForm({ ...form, from: e.target.value })
          }
          className="w-full text-sm font-bold outline-none text-black"
        />
      </div>

      <p className="text-sm text-gray-700 hidden md:block">
        DEL
      </p>
    </div>
  </div>

  {/* SWAP BUTTON */}
  <button
    onClick={swapLocation}
    className="
      absolute
      lg:left-[24%]
      lg:top-1/2
      lg:-translate-y-1/2

      left-1/2
      top-[92px]
      -translate-x-1/2

      border
      p-2
      rounded-full
      bg-white
      shadow-lg
      text-[#06448a]
      z-20
    "
  >
    <LiaExchangeAltSolid />
  </button>

  {/* TO */}
  <div className="flex-1 min-w-0 p-2 lg:border-r">
    <p className="text-xs text-gray-600 font-semibold">TO</p>

    <div className="flex items-center justify-between">
      <div className="flex items-center w-full">
        <span className="text-[#06448a] p-2 text-xl">
          <BsAirplane />
        </span>

        <input
          type="text"
          value={form.to}
          onChange={(e) =>
            setForm({ ...form, to: e.target.value })
          }
          className="w-full text-sm font-bold outline-none text-black"
        />
      </div>

      <p className="text-sm text-gray-700 hidden md:block">
        BOM
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
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
        className="
          w-full
          bg-transparent
          text-sm
          font-bold
          outline-none
          text-black
        "
      />
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
          value={form.returnDate}
          onChange={(e) =>
            setForm({
              ...form,
              returnDate: e.target.value,
            })
          }
          className="
            w-full
            bg-transparent
            text-sm
            font-bold
            outline-none
            text-black
          "
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
        value={form.travellers}
        onChange={(e) =>
          setForm({
            ...form,
            travellers: e.target.value,
          })
        }
        className="
          w-full
          bg-transparent
          text-sm
          font-bold
          outline-none
          text-black
        "
      />
    </div>
  </div>

  {/* SEARCH BUTTON */}
  <div className="flex items-center justify-center p-2">
    <button
      onClick={handleSearch}
      className="
        flex
        items-center
        justify-center
        bg-[#031e3d]
        px-5
        py-3
        rounded-lg
        text-white
        w-full
        lg:w-auto
      "
    >
      Search Flights

      <span className="pl-2">
        <IoIosArrowForward />
      </span>
    </button>
  </div>
</div>
        </div>
    )
}
