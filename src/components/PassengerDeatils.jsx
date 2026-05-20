import React, { useRef } from 'react'

import {
  FiUser,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";

import { LiaIdCardSolid } from "react-icons/lia";
import { usePassenger } from '../context/PassengerContext';

export const PassengerDeatils = () => {
  const dateRef = useRef(null);

  const openCalendar = () => {
    if (dateRef.current?.showPicker) {
      dateRef.current.showPicker();
    } else {
      dateRef.current.focus();
    }
  };



  const {
    passengerData,
    setPassengerData,
  } = usePassenger();


  const handleChange = (e) => {

    const { name, value } = e.target;

    setPassengerData({
      ...passengerData,
      [name]: value
    })
    console.log(name, value)
  }


  const handleSubmit = ()=>{
    e.preventDefault();
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-md w-full">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
          <FiUser className="text-blue-700 text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#0A2A6B]">
            Passenger Details
          </h2>

          <p className="text-xs text-slate-500">
            Fill in passenger information carefully
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Full Name */}
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-2">
            Full Name (as per ID)
          </label>

          <input
            type="text"
            name='name'
            value={passengerData.name}
            onChange={handleChange}
            placeholder="Rahul Sharma"
            className="text-sm w-full h-14 px-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-2">
            Email Address
          </label>

          <input
            name='email'
            type="email"
            value={passengerData.email}
            onChange={handleChange}
            placeholder="rahul@email.com"
            className=" text-sm w-full h-14 px-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-2">
            Phone Number
          </label>

          <input
            name='number'
            type="tel"
            value={passengerData.number}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className=" text-sm w-full h-14 px-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        {/* DOB + Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* DOB */}
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-2">
              Date of Birth
            </label>

            <div className="relative">
              <input
                ref={dateRef}
                type="date"
                name='dob'
                value={passengerData.dob}
                onChange={handleChange}
                className="hide-date-icon appearance-none w-full h-14 px-4 pr-12 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
              />

              <FiCalendar
                onClick={openCalendar}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-2">
              Gender
            </label>

            <div className="relative">
              <select name='gender' value={passengerData.gender} onChange={handleChange} className=" text-sm appearance-none w-full h-14 px-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition bg-white">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Nationality + ID Proof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Nationality */}
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-2">
              Nationality
            </label>

            <div className="relative">
              <select name='nationality' value={passengerData.nationality} onChange={handleChange} className=" text-sm appearance-none w-full h-14 px-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition bg-white">
                <option>Indian</option>
                <option>American</option>
                <option>Canadian</option>
              </select>

              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
            </div>
          </div>

          {/* ID Proof */}
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-2">
              ID Proof
            </label>

            <div className="relative">
              <select name='IDProof' value={passengerData.IDProof} onChange={handleChange} className=" text-sm appearance-none w-full h-14 px-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition bg-white">
                <option>Aadhaar Card</option>
                <option>PAN Card</option>
                <option>Passport</option>
              </select>

              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ID Number */}
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-2">
            ID Number
          </label>

          <div className="relative">
            <input
              name='IDNumber'
              value={passengerData.IDNumber}
              onChange={handleChange}
              type="text"
              placeholder="1234 5678 9012"
              className=" text-sm w-full h-14 px-4 pr-12 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
            />

            <LiaIdCardSolid className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl" />
          </div>
        </div>

        {/* Frequent Flyer */}
        <button
          type="button"
          className="text-blue-700 text-xs font-semibold hover:underline"
        >
          + Add Frequent Flyer (Optional)
        </button>

      </form>
    </div>
  );
};
