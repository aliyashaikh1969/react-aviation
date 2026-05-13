import React, { useState } from "react";

import {
  FiCreditCard,
  FiLock,
  FiSmartphone,
  FiHome,
  FiBriefcase,
  FiCheckSquare,
  FiShield,
} from "react-icons/fi";

const PaymentMethod = ({ nextStep }) => {

  const [selectedMethod, setSelectedMethod] = useState("card");

  const paymentMethods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      subtitle: "Visa, Mastercard, Rupay",
      icon: <FiCreditCard />,
    },
    {
      id: "upi",
      title: "UPI",
      subtitle: "Pay using any UPI app",
      icon: <FiSmartphone />,
    },
    {
      id: "bank",
      title: "Net Banking",
      subtitle: "All major banks supported",
      icon: <FiHome />,
    },
    {
      id: "wallet",
      title: "Wallets",
      subtitle: "Pay using mobile wallets",
      icon: <FiBriefcase />,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-3 border-b border-slate-200 bg-blue-50/50">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <FiLock className="text-blue-700 text-2xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0A2A6B]">
              Secure Payment
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Your payment details are encrypted and safe with us.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">

        {/* Payment Methods */}
        <div className="border-r border-slate-200 bg-slate-50">

          <div className="p-3 border-b border-slate-200">
            <h3 className="text-base font-bold text-[#0A2A6B]">
              Choose Payment
            </h3>
          </div>

          <div className="space-y-1 p-3">

            {paymentMethods.map((method) => (

              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 text-left
                  
                  ${selectedMethod === method.id
                    ? "bg-blue-50 border-blue-600"
                    : "bg-white border-transparent hover:border-slate-200"
                  }
                `}
              >

                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0
                    
                    ${selectedMethod === method.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700"
                    }
                  `}
                >
                  {method.icon}
                </div>

                <div>
                  <h4 className="font-semibold text-[#0A2A6B]">
                    {method.title}
                  </h4>

                  <p className="text-xs text-slate-500 mt-1">
                    {method.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <div className="p-4">

          <div className="flex items-center justify-between mb-8">

            <div>
              <h3 className="text-xl font-bold text-[#0A2A6B]">
                Pay using Card
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Enter your card details securely
              </p>
            </div>

            {/* Dummy Card Logos */}
            <div className="flex items-center gap-3">

              <div className="px-3 py-2 rounded-xl bg-slate-100 text-sm font-bold text-blue-700">
                VISA
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-100 text-sm font-bold text-red-500">
                MC
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-100 text-sm font-bold text-green-700">
                RuPay
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">

            {/* Card Number */}
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-2">
                Card Number
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full h-14 rounded-2xl border border-slate-200 px-4 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                />

                <FiCreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              </div>
            </div>

            {/* Name + Expiry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">
                  Cardholder Name
                </label>

                <input
                  type="text"
                  placeholder="Enter cardholder name"
                  className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              {/* Expiry */}
              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">
                  Expiry Date
                </label>

                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* CVV */}
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-2">
                CVV
              </label>

              <div className="relative">
                <input
                  type="password"
                  placeholder="123"
                  className="w-full h-14 rounded-2xl border border-slate-200 px-4 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                />

                <FiShield className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              </div>
            </div>

            {/* Save Card */}
            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-600"
                defaultChecked
              />

              <span className="text-slate-600">
                Save card for faster payments
              </span>
            </label>

            {/* Pay Button */}
            <div className="flex  justify-center">

              <button
                onClick={nextStep}
                type="submit"
                className="p-3 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all duration-300 text-white text-lg font-semibold shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
              >
                <FiLock className="text-xl" />

                Pay Securely ₹ 6,499
              </button>
            </div>
          </form>

          {/* Accepted Cards */}
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-2xl p-2">

            <div className="flex flex-wrap items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <FiCheckSquare className="text-blue-700 text-2xl" />
              </div>

              <span className="font-medium text-slate-700">
                We Accept
              </span>

              <div className="px-4 py-2 rounded-xl bg-white shadow-sm font-bold text-blue-700">
                VISA
              </div>

              <div className="px-4 py-2 rounded-xl bg-white shadow-sm font-bold text-red-500">
                Mastercard
              </div>

              <div className="px-4 py-2 rounded-xl bg-white shadow-sm font-bold text-green-700">
                RuPay
              </div>

              <div className="text-slate-500 text-sm">
                and more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;