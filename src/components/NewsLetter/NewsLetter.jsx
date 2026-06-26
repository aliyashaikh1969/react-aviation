import React from "react";

export const NewsLetter = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 bg-blue-100 py-8">
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between">

        {/* Text */}
        <div className="text-center md:text-left">
          <p className="font-bold py-1 text-lg">
            Get the best travel deals straight to your inbox!
          </p>

          <p className="text-sm text-gray-600">
            Subscribe to our newsletter and never miss an offer.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row rounded-md overflow-hidden w-full md:max-w-[600px]">
          <input
            type="email"
            placeholder="Enter email address"
            className="flex-1 px-4 py-3 outline-none"
          />

          <button className="px-6 py-3 bg-[#031e3d] hover:bg-[#052a54] transition text-white">            Subscribe
          </button>
        </div>

      </div>
    </div>
  );
};