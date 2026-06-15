import React, { useEffect, useRef, useState } from 'react'

import {
  FiUser,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";

import { LiaIdCardSolid } from "react-icons/lia";
import { usePassenger } from '../context/PassengerContext';
import { useFlight } from '../context/FlightContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


export const PassengerDetails = () => {
  const { passengerData, setPassengerData, passengers, setPassengers, errors, list, setList } = usePassenger();


  const { flightData } = useFlight()
  const totalPassengers = flightData.travellers;
  const dateRef = useRef([]);

  const openCalendar = (index) => {
    const ref = dateRef.current[index]
    if (ref?.showPicker) ref.showPicker()
    else ref?.focus()
  };





  useEffect(() => {
    if (passengers.length === 0) {
      setPassengers(
        Array.from(
          { length: flightData.travellers },
          (_, index) => ({
            id: index + 1,
            name: "",
            email: "",
            number: "",
            dob: "",
            gender: "",
            nationality: "",
            IDProof: "",
            IDNumber: "",
          })
        )
      )
    }
  }, [])


  const handleChange = (index, name, value) => {
    const updatedPassengers = passengers.map((p, i) => i === index ? { ...p, [name]: value } : p)
    setPassengers(updatedPassengers)
    setPassengerData({ passengers: updatedPassengers })

  }


  const showForm = (id) => {
    if (list.includes(id)) {
      setList(list.filter(item => item !== id))
    } else {
      setList([...list, id])
    }
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

      <div className='gap-3 flex flex-col'>
        {
          passengers.map((passenger, index) => (
            <div key={index} className=''>

              <div className=' p-2 flex items-center justify-between' onClick={() => showForm(index)}>
                <h1>passenger {index + 1}</h1>
                {
                  list.includes(index) ? <FaChevronUp /> : <FaChevronDown />
                }

              </div>
              {
                list.includes(index) &&
                <div className="">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-2">
                      Full Name (as per ID)
                    </label>

                    <input
                      type="text"
                      name='name'
                      value={passenger.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      placeholder="Rahul Sharma"
                      className={`text-sm w-full h-14 px-4 rounded-xl border  outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition ${errors[index]?.name ? "border-red-500" : "border-slate-200"}`}
                    />
                    {errors[index]?.name && (
                      <p className="text-red-500 text-xs mt-1">{errors[index].name}</p>
                    )}

                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-2">
                      Email Address
                    </label>

                    <input
                      name='email'
                      type="email"
                      value={passenger.email}
                      onChange={(e) => handleChange(index, "email", e.target.value)}
                      placeholder="rahul@email.com"
                      className={`text-sm w-full h-14 px-4 rounded-xl border  outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition ${errors[index]?.email ? "border-red-500":"border-slate-200" }`}
                    />
                    {
                      errors[index]?.email && (
                        <p>{errors[index].email}</p>
                      )
                    }
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-2">
                      Phone Number
                    </label>

                    <input
                      name='number'
                      type="tel"
                      value={passenger.number}
                      onChange={(e) => handleChange(index, "number", e.target.value)}
                      placeholder="+91 98765 43210"
                      className={` text-sm w-full h-14 px-4 rounded-xl border outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition ${errors[index]?.name ? "border-red-500" : "border-slate-200"}`}
                    />
                     {
                      errors[index]?.number && (
                        <p>{errors[index].number}</p>
                      )
                    }
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
                          ref={el => dateRef.current[index] = el}
                          type="date"
                          name='dob'
                          value={passenger.dob}
                          onChange={(e) => handleChange(index, "dob", e.target.value)}
                          className={`hide-date-icon appearance-none w-full h-14 px-4 pr-12 rounded-xl border outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition ${errors[index]?.name ? "border-red-500" : "border-slate-200"}`}
                        />

                        <FiCalendar
                          onClick={() => openCalendar(index)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 cursor-pointer"
                        />
                      </div>
                       {
                      errors[index]?.dob && (
                        <p>{errors[index].dob}</p>
                      )
                    }
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-2">
                        Gender
                      </label>

                      <div className="relative">
                        <select name='gender' value={passenger.gender} onChange={(e) => handleChange(index, "gender", e.target.value)} className={`text-sm appearance-none w-full h-14 px-4 rounded-xl border outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition bg-white ${errors[index]?.name ? "border-red-500" : "border-slate-200"}`}>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>

                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
                      </div>
                      {
                      errors[index]?.gender && (
                        <p>{errors[index].gender}</p>
                      )
                    }
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
                        <select name='nationality' value={passenger.nationality} onChange={(e) => handleChange(index, "nationality", e.target.value)} className={`text-sm appearance-none w-full h-14 px-4 rounded-xl border  outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition bg-white ${errors[index]?.name ? "border-red-500" : "border-slate-200"}`}>
                          <option>Indian</option>
                          <option>American</option>
                          <option>Canadian</option>
                        </select>

                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
                      </div>
                      {
                      errors[index]?.nationality && (
                        <p>{errors[index].nationality}</p>
                      )
                    }
                    </div>

                    {/* ID Proof */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-2">
                        ID Proof
                      </label>

                      <div className="relative">
                        <select name='IDProof' value={passenger.IDProof} onChange={(e) => handleChange(index, "IDProof", e.target.value)} className=" text-sm appearance-none w-full h-14 px-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition bg-white">
                          <option>Aadhaar Card</option>
                          <option>PAN Card</option>
                          <option>Passport</option>
                        </select>

                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
                      </div>
                      {
                      errors[index]?.IDProof && (
                        <p>{errors[index].IDProof}</p>
                      )
                    }
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
                        value={passenger.IDNumber}
                        onChange={(e) => handleChange(index, "IDNumber", e.target.value)}
                        type="text"
                        placeholder="1234 5678 9012"
                        className=" text-sm w-full h-14 px-4 pr-12 rounded-xl border border-slate-200 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                      />

                      <LiaIdCardSolid className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl" />
                    </div>
                    {
                      errors[index]?.IDNumber && (
                        <p>{errors[index].IDNumber}</p>
                      )
                    }
                  </div>
                </div>
              }
            </div>


          ))
        }
      </div>

    </div >
  );
};
