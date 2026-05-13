import React, { useState } from 'react'
import logo from '../../assets/aviation-logo.png'
import { GrLanguage } from "react-icons/gr";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { IoIosClose } from 'react-icons/io';
import { NavLink } from 'react-router-dom';


export const Navbar = () => {
	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "Flights", path: "/results" },
		{ name: "My Trips", path: "/myTrips" },
		{ name: "Deals", path: "/deals" },
		{ name: "Contact", path: "/contact" }
	];
	const [open, setOpen] = useState(false);
	return (
		<nav className='flex items-center px-16 justify-between  bg-[#031e3d] text-white  relative z-50'>


			<div className="logo  z-10">
				<img src={logo} alt="" className='w-40' />
			</div>
			<ul className={`nav-list p-5 flex gap-8 flex-col top-[4.9rem] left-0 bg-[#031e3d] w-full  items-start flex-1 absolute md:static  md:flex-row md:h-fit ${!open ? "hidden md:flex" : "flex-col"}`}>
				{
					navItems.map((items, i) => (
						<li key={i} className="relative mx-8 cursor-pointer group">
							<NavLink to={items.path} onClick={() => setOpen(false)}
								className={({ isActive }) =>
									`relative ${isActive ? 'text-white opacity-100  after:w-full after:left-0'
										: 'opacity-55 hover:opacity-100'
									} after:content-[''] after:absolute   after:bottom-[-8px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}>
								{items.name}</NavLink>
						</li>
					))
				}


				<li className={`${open ? "block sm:hidden" : "hidden"}`}>
					<button className=' border rounded-xl text-sm'>Login/Sign Up</button>
				</li>

			</ul>
			<div className={`flex items-center justify-end  `}>
				<div className={`sm:flex hidden`}>

					<div className='sm:flex items-center px-4 hidden'>
						<GrLanguage />
						<span className='text-xs px-2'>En </span>
					</div>

					<button className='py-2 px-3  border rounded-xl text-xs'>Login/Sign Up</button>
				</div>

				<div className='text-xl md:hidden mx-5' onClick={() => setOpen(!open)}>
					{!open ? <span > <IoMenuOutline /> </span> : <IoIosClose />}
				</div>
			</div>

		</nav>
	)
}
