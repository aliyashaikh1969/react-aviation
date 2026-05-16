import React from 'react'
import {
  FiChevronDown,
  FiArrowRight,
  FiPercent,
  FiHeadphones,
  FiCalendar,
  FiShield,
  FiHome,
} from "react-icons/fi";
import { Home } from '../../components/Home/Home';
import { ContactCard } from './ContactCard';
import { Features } from '../../components/Features/Features';

export const Contact = () => {

  const faqs = [
    "How can I book a flight on SkyBook?",
    "How do I get a refund?",
    "Can I cancel or change my booking?",
    "Is my payment information secure?",
    "What payment methods do you accept?",
    "How can I contact customer support?",
  ];

  const offices = [
    {
      country: "India (Head Office)",
      city: "Noida, Uttar Pradesh",
      phone: "+91 98765 43210",
    },

    {
      country: "USA Office",
      city: "New York, NY 10001",
      phone: "+1 (212) 555-0189",
    },

    {
      country: "UK Office",
      city: "London, EC2A 4NE",
      phone: "+44 20 7946 0958",
    },

    {
      country: "UAE Office",
      city: "Dubai, UAE",
      phone: "+971 4 123 4567",
    },
  ];

  return (

    <div className='min-h-screen relative'>
      <div className="bg-[#0A2647] text-white py-14 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#2C74B3] opacity-80"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Contact us
          </h1>
          <p className="text-gray-200 text-lg">
            Manage all your bookings in one place.
          </p>
        </div>
      </div>
      <div className="bg-[#F7F9FC] py-14 ">

        <div className="max-w-7xl mx-auto px-5">

          {/* Contact Card */}

          <ContactCard />

          {/* FAQ Section */}
          <div className="mt-14 bg-white rounded-3xl border border-slate-200 p-8">

            {/* Top */}
            <div className="flex items-center justify-between mb-8">

              <h2 className="text-4xl font-bold text-[#0A2A6B]">
                Frequently Asked Questions
              </h2>

              <button className="hidden md:flex items-center gap-2 text-blue-700 font-medium hover:gap-3 transition-all">
                View All FAQs

                <FiArrowRight />
              </button>
            </div>

            {/* FAQ Grid */}
            <div className="grid md:grid-cols-2 gap-5">

              {faqs.map((faq, index) => (
                <button
                  key={index}
                  className="h-16 rounded-2xl border border-slate-200 bg-[#FAFBFD] hover:bg-slate-50 transition-all px-5 flex items-center justify-between text-left"
                >

                  <span className="font-medium text-[#0A2A6B]">
                    {faq}
                  </span>

                  <FiChevronDown className="text-slate-500 text-lg" />
                </button>
              ))}
            </div>
          </div>

          {/* Offices */}
          <div className="mt-16">

            {/* Heading */}
            <div className="text-center">

              <h2 className="text-4xl font-bold text-[#0A2A6B]">
                Our Offices
              </h2>

              <p className="text-slate-500 mt-3 text-lg">
                We have a global presence to assist you better.
              </p>
            </div>

            {/* Office Cards */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-10">

              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
                >

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-3xl">
                    <FiHome />
                  </div>

                  {/* Content */}
                  <div className="mt-6">

                    <h3 className="text-2xl font-bold text-[#0A2A6B]">
                      {office.country}
                    </h3>

                    <p className="text-slate-500 mt-3 leading-7">
                      {office.city}
                    </p>

                    <p className="text-slate-700 mt-5 font-medium">
                      {office.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <Features />
        </div>
      </div>
    </div>

  )
}
