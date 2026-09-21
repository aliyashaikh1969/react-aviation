import { useState } from "react";
import {
  FiCreditCard,
  FiLock,
  FiSmartphone,
  FiHome,
  FiBriefcase,
  FiCheck,
} from "react-icons/fi";
import { useFlight } from "../../hooks/useFlight";
import { UpiQrCode } from "./UpiQrCode";
import toast from "react-hot-toast";
import { useFare } from "../../hooks/useFare"
import { Field } from "../ui/Field"
import { inr } from "../../utils/format"

const paymentMethods = [
  { id: "card", title: "Credit / Debit Card", subtitle: "Visa, Mastercard, RuPay", icon: <FiCreditCard /> },
  { id: "upi", title: "UPI", subtitle: "Pay using any UPI app", icon: <FiSmartphone /> },
  { id: "bank", title: "Net Banking", subtitle: "All major banks supported", icon: <FiHome /> },
  { id: "wallet", title: "Wallets", subtitle: "Pay using mobile wallets", icon: <FiBriefcase /> },
];

const methodLabel = { card: "Card", upi: "UPI", bank: "Net Banking", wallet: "Wallet" };
const banks = ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"];
const wallets = ["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"];

const inputClass =
  "w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition";

const ChoiceGrid = ({ label, options, value, onChange }) => (
  <Field label={label}>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={`relative p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer
            ${value === option
              ? "bg-blue-50 border-blue-600 text-blue-700"
              : "border-slate-200 text-slate-600 hover:border-blue-300"}`}
        >
          {option}
          {value === option && <FiCheck className="absolute top-2 right-2 text-blue-600" />}
        </button>
      ))}
    </div>
  </Field>
);

const PaymentMethod = ({ nextStep }) => {
  const { setSearchData } = useFlight();
  const { grandTotal } = useFare();

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    if (selectedMethod === "card") {
      if (cardData.number.replace(/\s/g, "").length !== 16) return "Enter a valid 16-digit card number";
      if (!cardData.name.trim()) return "Enter the cardholder name";
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) return "Enter the expiry date as MM/YY";
      const month = Number(cardData.expiry.slice(0, 2));
      if (month < 1 || month > 12) return "Expiry month must be between 01 and 12";
      if (cardData.cvv.length !== 3) return "Enter the 3-digit CVV";
    }
    if (selectedMethod === "upi" && upiId && !upiId.includes("@")) return "Enter a valid UPI ID, e.g. name@upi";
    if (selectedMethod === "bank" && !selectedBank) return "Please select a bank";
    if (selectedMethod === "wallet" && !selectedWallet) return "Please select a wallet";
    return null;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    const error = validate();
    if (error) return toast.error(error);

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    setSearchData(prev => ({ ...prev, paymentMethod: selectedMethod }));
    setIsProcessing(false);
    toast.success("Payment successful! 🎉");
    nextStep();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="p-4 sm:p-5 border-b border-slate-200 bg-blue-50/50 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
          <FiLock className="text-blue-700 text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0A2A6B]">Secure payment</h2>
          <p className="text-xs text-slate-500 mt-0.5">Your payment details are encrypted and safe with us.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* Methods */}
        <div className="lg:border-r border-b lg:border-b-0 border-slate-200 bg-slate-50 p-3">
          <h3 className="text-sm font-bold text-[#0A2A6B] px-1 pb-3 hidden lg:block">Choose payment method</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2" role="tablist">
            {paymentMethods.map((method) => {
              const active = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left cursor-pointer
                    ${active ? "bg-blue-50 border-blue-600" : "bg-white border-transparent hover:border-slate-200"}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0
                    ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                    {method.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-[#0A2A6B] truncate">{method.title}</h4>
                    <p className="text-xs text-slate-500 hidden sm:block truncate">{method.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <div>
              <h3 className="font-semibold text-lg text-[#0A2A6B]">Pay using {methodLabel[selectedMethod]}</h3>
              {selectedMethod === "card" && (
                <p className="text-xs text-slate-500 mt-0.5">Enter your card details securely</p>
              )}
            </div>

            {selectedMethod === "card" && (
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-blue-700">VISA</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-red-500">MC</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-green-700">RuPay</span>
              </div>
            )}
          </div>

          <form className="space-y-5" onSubmit={handlePayment}>

            {selectedMethod === "card" && (
              <div className="space-y-4">
                <Field label="Card number">
<input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardData.number}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
                      setCardData(prev => ({ ...prev, number: val }))
                    }}
                    className={inputClass}
                  />
</Field>
                <Field label="Cardholder name">
<input
                    type="text"
                    autoComplete="cc-name"
                    placeholder="Name on card"
                    value={cardData.name}
                    onChange={e => setCardData(prev => ({ ...prev, name: e.target.value }))}
                    className={inputClass}
                  />
</Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry date">
<input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={e => {
                        let val = e.target.value.replace(/\D/g, "").slice(0, 4)
                        if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2)
                        setCardData(prev => ({ ...prev, expiry: val }))
                      }}
                      className={inputClass}
                    />
</Field>
                  <Field label="CVV">
<input
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={e => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))}
                      className={inputClass}
                    />
</Field>
                </div>
              </div>
            )}

            {selectedMethod === "upi" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-full">
                  <Field label="UPI ID" hint="(optional, or scan the QR)">
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400">or scan QR</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <UpiQrCode amount={grandTotal} />
              </div>
            )}

            {selectedMethod === "bank" && (
              <ChoiceGrid label="Select bank" options={banks} value={selectedBank} onChange={setSelectedBank} />
            )}

            {selectedMethod === "wallet" && (
              <ChoiceGrid label="Select wallet" options={wallets} value={selectedWallet} onChange={setSelectedWallet} />
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full h-14 rounded-2xl text-white text-base font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer
                ${isProcessing ? "bg-slate-400 cursor-not-allowed" : "bg-[#0A2A6B] hover:bg-[#081f52] shadow-lg shadow-blue-100"}`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing…
                </>
              ) : (
                <>
                  <FiLock />
                  Pay securely {inr(grandTotal)}
                </>
              )}
            </button>

            <p className="text-xs text-slate-400 text-center -mt-2">
              {isProcessing ? "Please don't close or refresh this page." : "You'll get your e-ticket right after payment."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
