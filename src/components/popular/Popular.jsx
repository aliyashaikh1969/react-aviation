import React from 'react'
import { GiCommercialAirplane } from 'react-icons/gi';
import { IoIosAirplane } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import eiffelTowerImg from "../../assets/eiffel-tower.png"
import maldivesImg from "../../assets/maldives.png"
import baliImg from "../../assets/bali.png"



export const Popular = () => {
    return (
        <div className='px-16 py-4 bg-gray-100'>
            <div className='flex items-center justify-between py-6'>
                <div className='flex items-center gap-4'>
                    <span className='text-[#06448a] text-3xl'><GiCommercialAirplane /></span>
                    <p className='font-bold text-2xl'>Popular Routes</p>
                </div>
                <button className='text-[#06448a]'>View All</button>
            </div>
            <div className='flex gap-3 flex-wrap flex-row '>
                <div className='sm:flex-[40%] md:flex-[20%] flex-[100%] rounded-md overflow-hidden bg-white flex flex-col '>
                    <img src={eiffelTowerImg} alt=""  />
                    <div className="px-3 py-2  flex items-center justify-between">
                        <p className='text-sm font-semibold'>Delhi</p>
                        <span className="text-lg text-[#06448a]"><IoIosAirplane />
                        </span>
                        <p className='text-sm font-semibold'>Mumbai</p>
                    </div>
                    <p className='px-3 py-2 text-sm text-[#06448a] flex items-center gap-2'>
                        from
                        <span className='text-[#06448a] flex items-center font-bold'><FaIndianRupeeSign />4,299</span>
                    </p>
                </div>
                <div className='sm:flex-[40%] md:flex-[20%] flex-[100%] rounded-md overflow-hidden bg-white flex flex-col'>
                    <img src={maldivesImg} alt=""  />
                    <div className="px-3 py-2  flex items-center justify-between">
                        <p className='text-sm font-semibold'>Delhi</p>
                        <span className="text-lg text-[#06448a]"><IoIosAirplane />
                        </span>
                        <p className='text-sm font-semibold'>Mumbai</p>
                    </div>
                    <p className='px-3 py-2 text-sm text-[#06448a] flex items-center gap-2'>
                        from
                        <span className='text-[#06448a] flex items-center font-bold'><FaIndianRupeeSign />4,299</span>
                    </p>
                </div> 
                <div className='sm:flex-[40%] md:flex-[20%] flex-[100%] rounded-md overflow-hidden bg-white flex flex-col'>
                    <img src={baliImg} alt=""  />
                    <div className="px-3 py-2  flex items-center justify-between">
                        <p className='text-sm font-semibold'>Delhi</p>
                        <span className="text-lg text-[#06448a]"><IoIosAirplane />
                        </span>
                        <p className='text-sm font-semibold'>Mumbai</p>
                    </div>
                    <p className='px-3 py-2 text-sm text-[#06448a] flex items-center gap-2'>
                        from
                        <span className='text-[#06448a] flex items-center font-bold'><FaIndianRupeeSign />4,299</span>
                    </p>
                </div> 
                <div className='sm:flex-[40%] md:flex-[20%] flex-[100%] rounded-md overflow-hidden bg-white flex flex-col'>
                    <img src={eiffelTowerImg} alt=""  />
                    <div className="px-3 py-2  flex items-center justify-between">
                        <p className='text-sm font-semibold'>Delhi</p>
                        <span className="text-lg text-[#06448a]"><IoIosAirplane />
                        </span>
                        <p className='text-sm font-semibold'>Mumbai</p>
                    </div>
                    <p className='px-3 py-2 text-sm text-[#06448a] flex items-center gap-2'>
                        from
                        <span className='text-[#06448a] flex items-center font-bold'><FaIndianRupeeSign />4,299</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
