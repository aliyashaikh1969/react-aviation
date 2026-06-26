import React from "react";
import { IoSunnySharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

export const OfferBanner = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 bg-gray-100 py-8">
      <div className="bg-[#031e3d] py-6 px-6 sm:px-8 rounded-xl text-white flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center">

        <div className="text-center md:text-left">
          <p className="text-xs tracking-wider text-yellow-300">
            FLAT 20% OFF
          </p>

          <p className="flex items-center justify-center md:justify-start gap-3 py-2 text-2xl sm:text-3xl font-bold">
            Summer Travel Bonanza
            <span className="text-yellow-300 text-2xl">
              <IoSunnySharp />
            </span>
          </p>

          <p className="text-sm text-gray-300">
            Book your flights and get exciting discounts!
          </p>
        </div>

        <button className="w-full md:w-auto border border-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-white hover:text-[#031e3d] transition">
          Explore Deals
          <FaArrowRight />
        </button>

      </div>
    </div>
  );
};