import React from 'react'
import { FiMail, FiMapPin, FiMessageCircle, FiPhoneCall, FiSend } from 'react-icons/fi'

export const ContactCard = () => {

     const contactInfo = [
    {
      icon: <FiPhoneCall />,
      title: "Call Us",
      info: "+91 98765 43210",
      subInfo: "Mon – Sun | 24/7",
    },

    {
      icon: <FiMail />,
      title: "Email Us",
      info: "support@skybook.com",
      subInfo: "We reply within 30 minutes",
    },

    {
      icon: <FiMessageCircle />,
      title: "Live Chat",
      info: "Chat with our support team",
      subInfo: "Available 24/7",
    },

    {
      icon: <FiMapPin />,
      title: "Visit Us",
      info: "SkyBook Corporate Office",
      subInfo: "Noida, Uttar Pradesh – 201309",
    },
  ];

  return (
    <div> <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
    
              <div className="grid lg:grid-cols-[350px_1fr]">
    
                {/* Left Side */}
                <div className="p-8 border-r border-slate-200">
    
                  <h2 className="text-4xl font-bold text-[#0A2A6B]">
                    Get in Touch
                  </h2>
    
                  <p className="text-slate-500 mt-3 leading-7">
                    Our team is here to help you anytime.
                  </p>
    
                  {/* Contact Items */}
                  <div className="space-y-8 mt-10">
    
                    {contactInfo.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4"
                      >
    
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shrink-0">
                          {item.icon}
                        </div>
    
                        {/* Content */}
                        <div>
    
                          <h3 className="text-xl font-bold text-[#0A2A6B]">
                            {item.title}
                          </h3>
    
                          <p className="text-slate-700 mt-1">
                            {item.info}
                          </p>
    
                          <p className="text-slate-500 mt-1 text-sm">
                            {item.subInfo}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
    
                {/* Right Side */}
                <div className="p-8">
    
                  <h2 className="text-4xl font-bold text-[#0A2A6B]">
                    Send Us a Message
                  </h2>
    
                  <p className="text-slate-500 mt-3 leading-7">
                    Fill out the form below and we’ll get back to you shortly.
                  </p>
    
                  {/* Form */}
                  <form className="mt-10">
    
                    {/* Inputs */}
                    <div className="grid md:grid-cols-2 gap-5">
    
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="h-14 rounded-2xl border border-slate-300 px-5 outline-none focus:border-blue-600"
                      />
    
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="h-14 rounded-2xl border border-slate-300 px-5 outline-none focus:border-blue-600"
                      />
    
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className="h-14 rounded-2xl border border-slate-300 px-5 outline-none focus:border-blue-600"
                      />
    
                      <input
                        type="text"
                        placeholder="Subject"
                        className="h-14 rounded-2xl border border-slate-300 px-5 outline-none focus:border-blue-600"
                      />
                    </div>
    
                    {/* Textarea */}
                    <textarea
                      rows="6"
                      placeholder="Your Message"
                      className="w-full mt-5 rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600 resize-none"
                    ></textarea>
    
                    {/* Button */}
                    <button
                      type="submit"
                      className="mt-6 h-14 px-8 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all text-white font-semibold flex items-center gap-3"
                    >
                      <FiSend />
    
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div></div>
  )
}
