import React, { useState } from "react";
import logo from "../../assets/aviation-logo.png";

import { GrLanguage } from "react-icons/gr";
import { IoMenuOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/booking" },
    { name: "My Trips", path: "/myTrips" },
    { name: "Deals", path: "/deals" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-[#031e3d] text-white w-full sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between px-5 md:px-14 h-20">
        
        {/* LOGO */}
        <div className="z-50">
          <img src={logo} alt="logo" className="w-36 md:w-40" />
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide transition-all duration-300
                  ${
                    isActive
                      ? "opacity-100 after:w-full"
                      : "opacity-60 hover:opacity-100"
                  }
                  
                  after:content-['']
                  after:absolute
                  after:left-0
                  after:bottom-[-6px]
                  after:h-[2px]
                  after:w-0
                  after:bg-white
                  after:transition-all
                  after:duration-300
                  hover:after:w-full`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center text-sm">
            <GrLanguage />
            <span className="ml-2">EN</span>
          </div>

          <button>
          <NavLink to={'AuthPage'} className={({ isActive }) =>`border border-white/30 px-4 py-2 rounded-xl text-sm transition-all duration-300  ${
                    isActive
                      ? "bg-white text-[#031e3d]"
                      : "hover:bg-white hover:text-[#031e3d] "
                  }`}> Login / Sign Up
			</NavLink> 
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div
          className="md:hidden text-3xl z-50 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <IoIosClose /> : <IoMenuOutline />}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-[#031e3d] transition-all duration-500 overflow-hidden
        ${
          open
            ? "h-screen opacity-100"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-10 text-lg">
          {navItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? "opacity-100" : "opacity-70"}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          <div className="flex items-center gap-2">
            <GrLanguage />
            <span>EN</span>
          </div>

          <button className="border px-6 py-3 rounded-xl">
            Login / Sign Up
          </button>
        </ul>
      </div>
    </nav>
  );
};