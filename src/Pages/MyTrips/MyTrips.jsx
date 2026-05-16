import React, { useState } from 'react';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaDownload,
  FaTicketAlt,
  FaClock,
  FaUserFriends,
  FaCalendarAlt,
} from 'react-icons/fa';

const tripsData = {
  upcoming: [
    {
      id: 'SKY12345',
      airline: 'IndiGo',
      from: 'New Delhi',
      to: 'Mumbai',
      fromCode: 'DEL',
      toCode: 'BOM',
      date: '24 May 2026',
      time: '10:00 AM - 12:30 PM',
      seats: 'A1, A2',
      passengers: 2,
      price: '₹4,500',
      status: 'Upcoming',
    },
    {
      id: 'SKY67890',
      airline: 'Air India',
      from: 'Bangalore',
      to: 'Goa',
      fromCode: 'BLR',
      toCode: 'GOI',
      date: '30 May 2026',
      time: '06:30 PM - 08:00 PM',
      seats: 'C2, C3',
      passengers: 2,
      price: '₹5,200',
      status: 'Upcoming',
    },
  ],
  completed: [],
  cancelled: [],
};

const tabs = ['upcoming', 'completed', 'cancelled'];

export const MyTrips=()=> {
  const [activeTab, setActiveTab] = useState('upcoming');

  const currentTrips = tripsData[activeTab];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1E293B]">
      {/* Header */}
      <div className="bg-[#0A2647] text-white py-14 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#2C74B3] opacity-80"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            My Trips ✈️
          </h1>
          <p className="text-gray-200 text-lg">
            Manage all your bookings in one place.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full capitalize font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-[#0A2647] text-white shadow-lg'
                  : 'bg-white text-[#0A2647] border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab} Trips
            </button>
          ))}
        </div>

        {/* Trips */}
        {currentTrips.length > 0 ? (
          <div className="grid gap-6">
            {currentTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-6"
              >
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                      <div>
                        <h2 className="text-2xl font-bold text-[#0A2647]">
                          {trip.airline}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Booking ID: {trip.id}
                        </p>
                      </div>

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {trip.status}
                      </span>
                    </div>

                    {/* Route */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                      <div>
                        <p className="text-3xl font-bold text-[#0A2647]">
                          {trip.fromCode}
                        </p>
                        <p className="text-gray-500">{trip.from}</p>
                      </div>

                      <div className="flex items-center justify-center flex-1 relative">
                        <div className="h-[2px] bg-gray-300 w-full"></div>
                        <div className="absolute bg-white p-3 rounded-full shadow-md text-[#0A2647]">
                          <FaPlaneDeparture size={18} />
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#0A2647]">
                          {trip.toCode}
                        </p>
                        <p className="text-gray-500">{trip.to}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="bg-[#F5F7FA] p-4 rounded-2xl flex items-center gap-3">
                        <FaCalendarAlt className="text-[#0A2647]" />
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-semibold">{trip.date}</p>
                        </div>
                      </div>

                      <div className="bg-[#F5F7FA] p-4 rounded-2xl flex items-center gap-3">
                        <FaClock className="text-[#0A2647]" />
                        <div>
                          <p className="text-gray-500">Time</p>
                          <p className="font-semibold">{trip.time}</p>
                        </div>
                      </div>

                      <div className="bg-[#F5F7FA] p-4 rounded-2xl flex items-center gap-3">
                        <FaTicketAlt className="text-[#0A2647]" />
                        <div>
                          <p className="text-gray-500">Seats</p>
                          <p className="font-semibold">{trip.seats}</p>
                        </div>
                      </div>

                      <div className="bg-[#F5F7FA] p-4 rounded-2xl flex items-center gap-3">
                        <FaUserFriends className="text-[#0A2647]" />
                        <div>
                          <p className="text-gray-500">Passengers</p>
                          <p className="font-semibold">{trip.passengers}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="xl:w-[260px] border-t xl:border-t-0 xl:border-l border-gray-200 pt-6 xl:pt-0 xl:pl-6 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">Total Price</p>
                      <h3 className="text-4xl font-bold text-[#0A2647] mb-6">
                        {trip.price}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button className="bg-[#0A2647] hover:bg-[#144272] text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300">
                        <FaTicketAlt />
                        View Ticket
                      </button>

                      <button className="border border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300">
                        <FaDownload />
                        Download Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-3xl font-bold text-[#0A2647] mb-3">
              No Trips Found
            </h2>
            <p className="text-gray-500 mb-6">
              Start booking your next adventure today.
            </p>

            <button className="bg-[#0A2647] hover:bg-[#144272] text-white px-6 py-3 rounded-2xl transition-all duration-300">
              Search Flights
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
