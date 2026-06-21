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
import { useFlight } from "../context/FlightContext";
import { UpiQRCode } from "../Pages/Flights/UpiQrCode";
import toast from "react-hot-toast";

const PaymentMethod = ({ nextStep }) => {
  const { selectedFlight, selectedSeats } = useFlight();
  const TAXES = 1201;
  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const grandTotal = (selectedFlight?.price ?? 0) + seatTotal + TAXES;


  const [cardData, setCardData] = useState({
    number: "", name: "", expiry: "", cvv: ""
  });

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16)
      .replace(/(.{4})/g, "$1 ").trim();

  const [errors, setErrors] = useState({});


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


  const validate = () => {

    if (selectedMethod === "card") {
      if (cardData.number.replace(/\s/g, "").length !== 16)
        return "Valid 16 digit card number enter karo"
      if (!cardData.name.trim())
        return "Cardholder name enter karo"
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry))
        return "Expiry MM/YY format mein enter karo"
      if (cardData.cvv.length !== 3)
        return "3 digit CVV enter karo"
    }

    if (selectedMethod === "upi") {
      if (!upiId.includes("@"))
        return "Valid UPI ID enter karo — example@upi"
    }

    if (selectedMethod === "bank") {
      if (!selectedBank)
        return "Bank select karo"
    }

    if (selectedMethod === "wallet") {
      if (!selectedWallet)
        return "Wallet select karo"
    }

    return null  // koi error nahi
  }

  const handlePayment = async (e) => {

    e.preventDefault();

    // Validate
    const error = validate()
    if (error) return toast.error(error)

    // Processing start
    setIsProcessing(true)

    await new Promise(resolve => setTimeout(resolve, 2500))

    // Success
    setIsProcessing(false)
    toast.success("Payment successful! 🎉")
    nextStep()
  }




  const [isProcessing, setIsProcessing] = useState(false)

  const [upiId, setUpiId] = useState("")

  const [selectedBank, setSelectedBank] = useState("")

  const [selectedWallet, setSelectedWallet] = useState("")


  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

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
              <h3>
                Pay using {
                  selectedMethod === "card" ? "Card" :
                    selectedMethod === "upi" ? "UPI" :
                      selectedMethod === "bank" ? "Net Banking" : "Wallet"
                }
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
          <form className="space-y-5" onSubmit={handlePayment}>

            {/* Card Form */}
            {selectedMethod === "card" && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-600 block mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardData.number}
                    onChange={e => {
                      // Auto format — har 4 digits pe space
                      const val = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16)
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                      setCardData(prev => ({ ...prev, number: val }))
                    }}
                    className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 block mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter cardholder name"
                    value={cardData.name}
                    onChange={e => setCardData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-blue-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-slate-600 block mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={e => {
                        // Auto format — 2 digits ke baad / add karo
                        let val = e.target.value.replace(/\D/g, "").slice(0, 4)
                        if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2)
                        setCardData(prev => ({ ...prev, expiry: val }))
                      }}
                      className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 block mb-2">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={e => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))}
                      className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === "upi" && (
              <div className="flex flex-col items-center gap-4">

                {/* UPI ID input */}
                <div className="w-full">
                  <label className="text-sm font-medium text-slate-600 block mb-2">
                    UPI ID enter karo
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-blue-600"
                  />
                </div>

                {/* OR divider */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-xs text-slate-400">or scan QR</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* QR Card — ye component banao */}
                <UpiQRCode amount={grandTotal} />
              </div>
            )}

            {/* Net Banking Form */}
            {selectedMethod === "bank" && (
              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">
                  Select Bank
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all
                  ${selectedBank === bank
                          ? "bg-blue-50 border-blue-600 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-blue-300"
                        }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wallet Form */}
            {selectedMethod === "wallet" && (
              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">
                  Select Wallet
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"].map(wallet => (
                    <button
                      key={wallet}
                      type="button"
                      onClick={() => setSelectedWallet(wallet)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all
                  ${selectedWallet === wallet
                          ? "bg-blue-50 border-blue-600 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-blue-300"
                        }`}
                    >
                      {wallet}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay Button */}
            <div className="flex  justify-center">

              <button
                type="submit"
                disabled={isProcessing}
                className={`p-3 rounded-2xl text-white text-lg font-semibold flex items-center justify-center gap-3 transition-all
    ${isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0A2A6B] hover:bg-[#081f52]"
                  }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLock />
                    Pay Securely ₹{grandTotal.toLocaleString('en-IN')}
                  </>
                )}
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