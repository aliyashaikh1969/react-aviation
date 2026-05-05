import React, { useEffect, useState } from 'react'
import { GiCommercialAirplane } from "react-icons/gi";
import { PiIslandThin } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { BsAirplane } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export const SearchFlights = ({ initialData = {}, onSearch }) => {
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
            navigate('/results', { state: data }); 
        }
    };

    return (
        <div>
            <div className='relative bg-gray-200 md:w-fit rounded-xl'>

                {/* trip type */}
                <div className=' flex gap-2 justify-between md:justify-start md:p-2 md:pb-5 p-1 pb-3 rounded-t-2xl '>
                    <button onClick={() => setTripType("oneway")} className={`py-3 px-5 flex items-center  rounded-xl ${tripType === "oneway" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <GiCommercialAirplane />One way</button>

                    <button onClick={() => setTripType("round")} className={`py-3 px-5 flex items-center  rounded-xl ${tripType === "round" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <GiCommercialAirplane />round Trip</button>

                    <button onClick={() => setTripType("multicity")} className={`py-3 px-5 flex items-center  rounded-xl ${tripType === "multicity" ? "text-white bg-[#031e3d]" : "text-gray-700 hover:text-white hover:bg-[#031e3d]"}`}> <PiIslandThin />Multi City</button>
                </div>

                {/* search form */}
                <div className='bg-white md:absolute rounded-2xl top-16 flex justify-between p-6 md:w-[90vw] w-full md:flex-row flex-col'>
                    <div className='flex-1 border  p-2 pr-8'>
                        <p className="text-xs text-gray-600 font-semibold ">FROM</p>
                        <div className='flex items-center justify-between pt-2'>
                            <div className='flex items-center'>
                                <span className='text-[#06448a] p-2 text-xl'><FiMapPin /></span>
                                <input type="text" value={form.from} onChange={(e) => { setForm({ ...form, from: e.target.value }) }} className="w-full font-bold outline-none text-black placeholder-gray-400"
                                />
                            </div>
                            <p className='text-gray-700'>DEL</p>
                        </div>
                    </div>
                    <button onClick={() => swapLocation()} className='absolute md:left-[20rem] md:top-14 left-[50%] top-[9.3rem] border p-2 rounded-full bg-white shadow-lg text-[#06448a]'>
                        <LiaExchangeAltSolid />
                    </button>
                    <div className='flex-1 border py-2 pl-7 pr-2'>
                        <p className="text-xs text-gray-600 font-semibold">TO</p>
                        <div className='flex items-center justify-between pt-2'>
                            <div className='flex items-center '>
                                <span className='text-[#06448a] p-2 text-xl'><BsAirplane /></span>
                                <input type="text" value={form.to} onChange={(e) => { setForm({ ...form, to: e.target.value }) }} className="w-full font-bold outline-none text-black placeholder-gray-400"
                                />
                            </div>
                            <p className='text-gray-700'>BOM</p>
                        </div>
                    </div>
                    <div className='flex-1 border-r-2 p-2'>
                        <p className="text-xs text-gray-600 font-semibold">DEPARTURE</p>
                        <div className='flex items-center pt-2 '>
                            <span className='text-[#06448a] p-4 text-xl'><SlCalender /></span>
                            <input className="w-full font-bold outline-none text-black placeholder-gray-400"
                                type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                            {/* <p className='font-medium text-sm'>24 May,2024</p> */}
                            {/* <span className='text-sm text-gray-600'>{form.date}</span> */}

                        </div>
                    </div>
                    {tripType === "round" && (
                        <div className='flex-1 border-r-2 p-2'>
                            <p className="text-xs text-gray-600 font-semibold">RETURN</p>
                            <div className='flex items-center pt-2 '>
                                <span className='text-[#06448a] p-4 text-xl'><SlCalender /></span>
                                <input className="w-full font-bold outline-none text-black placeholder-gray-400"
                                    type="date" value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} />
                                {/* <p className='font-medium text-sm'>24 May,2024</p> */}
                                {/* <span className='text-sm text-gray-600'>{form.date}</span> */}

                            </div>
                        </div>
                    )}


                    <div className='flex-1 border-r-2 p-2 '>
                        <p className="text-xs text-gray-600 font-semibold">PASSANGER & CLASS</p>
                        <div className='flex items-center pt-2'>
                            <span className='text-[#06448a] p-4 text-xl'><IoPersonOutline /></span>
                            <input type="number" min={1} value={form.travellers} onChange={(e) => setForm({ ...form, travellers: e.target.value })} className="w-full font-bold outline-none text-black placeholder-gray-400"
                            />
                            {/* <span className='text-sm text-gray-600'>Economy</span> */}
                        </div>

                    </div>
                    <div className='flex-1 flex items-center justify-center'>
                        <button onClick={handleSearch} className='flex items-center bg-[#031e3d] px-5 py-3 rounded-lg text-white'>
                            Search Flights
                            <span className='pl-5'><IoIosArrowForward /></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
