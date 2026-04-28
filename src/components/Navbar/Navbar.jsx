import React, { useState } from 'react'
import logo from '../../assets/aviation-logo.png'
import { GrLanguage } from "react-icons/gr";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { IoIosClose } from 'react-icons/io';


export const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <nav className='flex items-center justify-between px-10 bg-[#031e3d] text-white py-3 relative z-50'>

            <div className="logo  z-10">
                <img src={logo} alt="" className='w-40' />
            </div>
            <ul className={`nav-list p-5 flex gap-8 flex-col top-[4.9rem] left-0 bg-[#031e3d] w-full  items-start flex-1 absolute md:static  md:flex-row md:h-fit ${!open ? "hidden md:flex" : "flex-col"}`}>
                <li className={`relative mx-8 cursor-pointer group text-white `}>
                    Home
                    <span className="absolute left-0 bottom-[-8px] w-full h-[2px] bg-white transition-all duration-300"></span>
                </li>
                <li className="relative mx-8 group cursor-pointer opacity-55  hover:opacity-100 group" >
                    Fligths
                    <span className="absolute left-1/2 bottom-[-8px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </li>
                <li className="relative mx-8 cursor-pointer group opacity-55 hover:opacity-100">
                    My Trips
                    <span className='absolute left-1/2 bottom-[-8px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0'></span>
                </li>
                <li className='relative mx-8 cursor-pointer opacity-55 hover:opacity-100 after:absolute after:left-1/2 hover:after:left-0 after:transition-all after:duration-300 after:bottom-[-8px] after:content-[""] after:w-0 after:h-[2px] after:bg-white after:hover:w-full'>
                    Deals
                </li>
                <li className="relative mx-8 cursor-pointer opacity-55 hover:opacity-100 after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
                    Contact
                </li>

                <li className={`${open ? "block sm:hidden" : "hidden"}`}>
                    <button className='py-3 px-5 border rounded-xl text-sm'>Login/Sign Up</button>
                </li>

            </ul>
            <div className={`flex items-center justify-end  `}>
                <div className={`sm:flex hidden`}>

                    <div className='sm:flex items-center px-4 hidden'>
                        <GrLanguage />
                        <span className='px-2'>En </span>
                    </div>

                    <button className='py-3 px-5 border rounded-xl text-sm'>Login/Sign Up</button>
                </div>

                <div className='text-4xl md:hidden mx-5' onClick={() => setOpen(!open)}>
                    {!open ? <span > <IoMenuOutline /> </span> : <IoIosClose />}
                </div>
            </div>


        </nav>
    )
}
