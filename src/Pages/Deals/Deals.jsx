import React from 'react'


import {
  FiArrowRight,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiTag,
  FiPercent,
} from "react-icons/fi";

export const Deals = () => {

  const topDeals = [
    {
      id: 1,
      from: "Delhi",
      to: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
      price: "3,299",
      oldPrice: "4,199",
      offer: "20% OFF",
      duration: "2h 15m",
    },

    {
      id: 2,
      from: "Bangalore",
      to: "Goa",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
      price: "2,799",
      oldPrice: "3,299",
      offer: "15% OFF",
      duration: "1h 25m",
    },

    {
      id: 3,
      from: "Hyderabad",
      to: "Chennai",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
      price: "3,799",
      oldPrice: "3,899",
      offer: "18% OFF",
      duration: "1h 30m",
    },

    {
      id: 4,
      from: "Kolkata",
      to: "Delhi",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
      price: "3,999",
      oldPrice: "4,499",
      offer: "12% OFF",
      duration: "2h 20m",
    },
  ];

  const categories = [
    {
      title: "Domestic Deals",
      desc: "Best offers across India",
      icon: <FiMapPin />,
      bg: "bg-blue-600",
    },

    {
      title: "International Deals",
      desc: "Fly across the world",
      icon: <FiGlobe />,
      bg: "bg-green-600",
    },

    {
      title: "Weekend Getaways",
      desc: "Short trips, big savings",
      icon: <FiCalendar />,
      bg: "bg-purple-600",
    },

    {
      title: "Seasonal Offers",
      desc: "Limited time mega offers",
      icon: <FiTag />,
      bg: "bg-orange-500",
    },
  ];

  const destinations = [
    {
      city: "Dubai",
      country: "United Arab Emirates",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
      price: "12,499",
      oldPrice: "14,699",
      offer: "15% OFF",
    },

    {
      city: "Singapore",
      country: "Singapore",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
      price: "10,999",
      oldPrice: "12,999",
      offer: "15% OFF",
    },

    {
      city: "Bangkok",
      country: "Thailand",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
      price: "8,499",
      oldPrice: "10,399",
      offer: "18% OFF",
    },

    {
      city: "Kuala Lumpur",
      country: "Malaysia",
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop",
      price: "7,499",
      oldPrice: "8,599",
      offer: "12% OFF",
    },

    {
      city: "Maldives",
      country: "Maldives",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      price: "15,999",
      oldPrice: "19,999",
      offer: "20% OFF",
    },
  ];

  return (
        <div className="bg-[#F7F9FC] py-12">

      <div className="max-w-7xl mx-auto px-5">

        {/* Top Flight Deals */}
        <div>

          {/* Heading */}
          <div className="flex items-center justify-between mb-7">

            <h2 className="text-3xl font-bold text-[#0A2A6B]">
              Top Flight Deals
            </h2>

            <button className="flex items-center gap-2 text-blue-700 font-medium hover:gap-3 transition-all">
              View All Deals

              <FiArrowRight />
            </button>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

            {topDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 group"
              >

                {/* Image */}
                <div className="relative h-52 overflow-hidden">

                  <img
                    src={deal.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Offer */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {deal.offer}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">

                  {/* Route */}
                  <div className="flex items-center gap-3">

                    <h3 className="text-2xl font-bold text-[#0A2A6B]">
                      {deal.from}
                    </h3>

                    <FiArrowRight className="text-blue-700" />

                    <h3 className="text-2xl font-bold text-[#0A2A6B]">
                      {deal.to}
                    </h3>
                  </div>

                  {/* Info */}
                  <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">

                    <span>Non-stop</span>

                    <span>•</span>

                    <span>{deal.duration}</span>
                  </div>

                  {/* Price */}
                  <div className="mt-5 flex items-end gap-2">

                    <span className="text-slate-500">
                      From
                    </span>

                    <h2 className="text-3xl font-bold text-blue-700">
                      ₹ {deal.price}
                    </h2>

                    <span className="text-slate-400 line-through">
                      ₹ {deal.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deals by Category */}
        <div className="mt-16">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-[#0A2A6B] mb-7">
            Deals by Category
          </h2>

          {/* Category Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

            {categories.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
              >

                <div className="flex items-start gap-4">

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} text-white flex items-center justify-center text-2xl shrink-0`}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div>

                    <h3 className="text-xl font-bold text-[#0A2A6B]">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 mt-2 leading-7">
                      {item.desc}
                    </p>

                    <button className="flex items-center gap-2 text-blue-700 font-medium mt-4 hover:gap-3 transition-all">
                      Explore

                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Destinations */}
        <div className="mt-16">

          {/* Heading */}
          <div className="flex items-center justify-between mb-7">

            <h2 className="text-3xl font-bold text-[#0A2A6B]">
              Trending Destinations
            </h2>

            <button className="flex items-center gap-2 text-blue-700 font-medium hover:gap-3 transition-all">
              View All Destinations

              <FiArrowRight />
            </button>
          </div>

          {/* Destination Cards */}
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-5">

            {destinations.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 group"
              >

                {/* Image */}
                <div className="relative h-56 overflow-hidden">

                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Offer */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.offer}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">

                  <h3 className="text-2xl font-bold text-[#0A2A6B]">
                    {item.city}
                  </h3>

                  <p className="text-slate-500 mt-2">
                    {item.country}
                  </p>

                  {/* Price */}
                  <div className="mt-5 flex items-end gap-2 flex-wrap">

                    <span className="text-slate-500">
                      From
                    </span>

                    <h2 className="text-2xl font-bold text-blue-700">
                      ₹ {item.price}
                    </h2>

                    <span className="text-slate-400 line-through">
                      ₹ {item.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offer */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-white border border-slate-200 rounded-3xl p-8">

          <div className="grid lg:grid-cols-[1fr_450px] gap-8 items-center">

            {/* Left */}
            <div className="flex items-center gap-5">

              {/* Icon */}
              <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-4xl shrink-0">
                <FiPercent />
              </div>

              {/* Content */}
              <div>

                <h2 className="text-4xl font-bold text-[#0A2A6B]">
                  Special Offers for You!
                </h2>

                <p className="text-slate-600 mt-3 leading-7 text-lg">
                  Sign up now and get exclusive flight deals,
                  discounts and travel updates directly to your inbox.
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col sm:flex-row gap-4">

              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-14 rounded-2xl border border-slate-300 px-5 outline-none focus:border-blue-600"
              />

              <button className="h-14 px-8 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all text-white font-semibold">
                Get Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
