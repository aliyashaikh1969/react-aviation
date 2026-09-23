import { useEffect, useState } from "react";
import {
  FiCreditCard,
  FiLock,
  FiSmartphone,
  FiHome,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiEdit2,
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
const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-100";

// Test cards/UPI IDs that always fail — the same idea real payment gateways use so a
// sandbox can be tested end to end without a real card.
const DECLINE_CARD_NUMBER = "4000000000000002";
const DECLINE_UPI_ID = "fail@upi";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// simple checksum used by real card numbers, so obviously-fake numbers get caught too
const passesLuhnCheck = (digits) => {
  let sum = 0;
  let doubleNext = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (doubleNext) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleNext = !doubleNext;
  }
  return sum % 10 === 0;
};

const isExpiryInThePast = (expiry) => {
  const [month, year] = expiry.split("/").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  return year < currentYear || (year === currentYear && month < currentMonth);
};

// Not built on the shared <Field> — a <label> should wrap exactly one control, and this is
// a group of several buttons, so it gets its own heading + role="group" instead.
const ChoiceGrid = ({ label, options, value, onChange, error }) => (
  <div role="group" aria-label={label}>
    <p className="text-sm font-medium text-slate-600 mb-1.5">{label}</p>
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
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PaymentFailedPanel = ({ message, onRetry, onEdit }) => (
  <div className="flex flex-col items-center text-center py-8 px-4">
    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
      <FiXCircle className="text-red-500 text-3xl" />
    </div>
    <h3 className="text-lg font-bold text-navy">Payment failed</h3>
    <p className="text-sm text-slate-500 mt-2 max-w-sm">{message}</p>
    <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-xs">
      <button
        type="button"
        onClick={onRetry}
        className="flex-1 h-12 rounded-xl bg-navy hover:bg-navy-dark text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        <FiRefreshCw /> Retry payment
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="flex-1 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-center gap-2 cursor-pointer"
      >
        <FiEdit2 /> Edit details
      </button>
    </div>
  </div>
);

const PaymentSuccessPanel = () => (
  <div className="flex flex-col items-center text-center py-8 px-4">
    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
      <FiCheckCircle className="text-green-600 text-3xl" />
    </div>
    <h3 className="text-lg font-bold text-navy">Payment successful</h3>
    <p className="text-sm text-slate-500 mt-2">Taking you to your booking confirmation…</p>
  </div>
);

// Card number/name/expiry/CVV + billing address fields -- only shown for the "card" method.
const CardForm = ({ cardData, billing, errors, updateCard, updateBilling }) => (
  <div className="space-y-4">
    <Field label="Card number" error={errors.number}>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        value={cardData.number}
        onChange={e => {
          const val = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
          updateCard("number", val)
        }}
        className={`${inputClass} ${errors.number ? errorInputClass : ""}`}
      />
    </Field>
    <Field label="Cardholder name" error={errors.name}>
      <input
        type="text"
        autoComplete="cc-name"
        placeholder="Name on card"
        value={cardData.name}
        onChange={e => updateCard("name", e.target.value)}
        className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
      />
    </Field>
    <div className="grid grid-cols-2 gap-4">
      <Field label="Expiry date" error={errors.expiry}>
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
            updateCard("expiry", val)
          }}
          className={`${inputClass} ${errors.expiry ? errorInputClass : ""}`}
        />
      </Field>
      <Field label="CVV" error={errors.cvv}>
        <input
          type="password"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          maxLength={3}
          value={cardData.cvv}
          onChange={e => updateCard("cvv", e.target.value.replace(/\D/g, ""))}
          className={`${inputClass} ${errors.cvv ? errorInputClass : ""}`}
        />
      </Field>
    </div>

    <div className="pt-2 border-t border-dashed border-slate-200">
      <p className="text-sm font-semibold text-navy mb-3 mt-4">Billing information</p>
      <div className="space-y-4">
        <Field label="Billing address" error={errors.address}>
          <input
            type="text"
            autoComplete="street-address"
            placeholder="House no., street, area"
            value={billing.address}
            onChange={e => updateBilling("address", e.target.value)}
            className={`${inputClass} ${errors.address ? errorInputClass : ""}`}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="City" error={errors.city}>
            <input
              type="text"
              autoComplete="address-level2"
              placeholder="City"
              value={billing.city}
              onChange={e => updateBilling("city", e.target.value)}
              className={`${inputClass} ${errors.city ? errorInputClass : ""}`}
            />
          </Field>
          <Field label="PIN code" error={errors.pincode}>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="110001"
              maxLength={6}
              value={billing.pincode}
              onChange={e => updateBilling("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              className={`${inputClass} ${errors.pincode ? errorInputClass : ""}`}
            />
          </Field>
        </div>
      </div>
    </div>

    <p className="text-xs text-slate-400">
      Test mode — use 4000 0000 0000 0002 to see what a declined card looks like.
    </p>
  </div>
);

const PaymentMethod = ({ nextStep, onProcessingChange }) => {
  const { setSearchData } = useFlight();
  const { grandTotal } = useFare();

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [billing, setBilling] = useState({ address: "", city: "", pincode: "" });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [errors, setErrors] = useState({});

  // idle -> processing -> success (moves on) or failed (shown with a retry option)
  const [status, setStatus] = useState("idle");
  const [failureMessage, setFailureMessage] = useState("");

  // let the parent step know so it can lock navigation while a payment is running
  useEffect(() => {
    onProcessingChange?.(status === "processing");
  }, [status, onProcessingChange]);

  const updateCard = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const updateBilling = (field, value) => {
    setBilling(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};

    if (selectedMethod === "card") {
      const digits = cardData.number.replace(/\s/g, "");
      if (digits.length !== 16) next.number = "Enter a valid 16-digit card number";
      else if (!passesLuhnCheck(digits)) next.number = "This card number doesn't look valid";

      if (!cardData.name.trim()) next.name = "Enter the cardholder name";
      else if (!/^[A-Za-z][A-Za-z\s.'-]{1,}$/.test(cardData.name.trim())) next.name = "Enter a valid name";

      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
        next.expiry = "Enter the expiry date as MM/YY";
      } else {
        const month = Number(cardData.expiry.slice(0, 2));
        if (month < 1 || month > 12) next.expiry = "Expiry month must be between 01 and 12";
        else if (isExpiryInThePast(cardData.expiry)) next.expiry = "This card has expired";
      }

      if (cardData.cvv.length !== 3) next.cvv = "Enter the 3-digit CVV";

      if (!billing.address.trim()) next.address = "Enter your billing address";
      if (!billing.city.trim()) next.city = "Enter your city";
      if (!/^\d{6}$/.test(billing.pincode)) next.pincode = "Enter a valid 6-digit PIN code";
    }

    if (selectedMethod === "upi" && (!upiId || !upiId.includes("@"))) {
      next.upi = "Enter a valid UPI ID, e.g. name@upi";
    }
    if (selectedMethod === "bank" && !selectedBank) next.bank = "Please select a bank";
    if (selectedMethod === "wallet" && !selectedWallet) next.wallet = "Please select a wallet";

    return next;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (status === "processing") return; // block a second submit while one is already running

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error(Object.values(fieldErrors)[0]);
      return;
    }

    setStatus("processing");
    await sleep(2200); // pretend to talk to a payment gateway

    const isDeclined =
      (selectedMethod === "card" && cardData.number.replace(/\s/g, "") === DECLINE_CARD_NUMBER) ||
      (selectedMethod === "upi" && upiId.trim().toLowerCase() === DECLINE_UPI_ID);

    if (isDeclined) {
      setStatus("failed");
      setFailureMessage(
        selectedMethod === "card"
          ? "Your bank declined this card. Try a different card or payment method."
          : "This payment couldn't go through. Try a different UPI ID or payment method."
      );
      toast.error("Payment failed");
      return;
    }

    setSearchData(prev => ({ ...prev, paymentMethod: selectedMethod }));
    setStatus("success");
    toast.success("Payment successful! 🎉");
    await sleep(900); // let the success state show briefly before moving on
    nextStep();
  };

  const retryPayment = () => {
    setStatus("idle");
    handlePayment({ preventDefault: () => {} });
  };

  const backToEditing = () => setStatus("idle");

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="p-4 sm:p-5 border-b border-slate-200 bg-blue-50/50 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
          <FiLock className="text-blue-700 text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-navy">Secure payment</h2>
          <p className="text-xs text-slate-500 mt-0.5">Your payment details are encrypted and safe with us.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* Methods */}
        <div className="lg:border-r border-b lg:border-b-0 border-slate-200 bg-slate-50 p-3">
          <h3 className="text-sm font-bold text-navy px-1 pb-3 hidden lg:block">Choose payment method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2" role="tablist">
            {paymentMethods.map((method) => {
              const active = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  disabled={status === "processing"}
                  onClick={() => { setSelectedMethod(method.id); setStatus("idle"); setErrors({}); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                    ${active ? "bg-blue-50 border-blue-600" : "bg-white border-transparent hover:border-slate-200"}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0
                    ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                    {method.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-navy truncate">{method.title}</h4>
                    <p className="text-xs text-slate-500 hidden sm:block truncate">{method.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form / status panel */}
        <div className="p-4 sm:p-6">

          {status === "failed" ? (
            <PaymentFailedPanel message={failureMessage} onRetry={retryPayment} onEdit={backToEditing} />
          ) : status === "success" ? (
            <PaymentSuccessPanel />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
                <div>
                  <h3 className="font-semibold text-lg text-navy">Pay using {methodLabel[selectedMethod]}</h3>
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

              <form className="space-y-5" onSubmit={handlePayment} noValidate>

                {selectedMethod === "card" && (
                  <CardForm cardData={cardData} billing={billing} errors={errors} updateCard={updateCard} updateBilling={updateBilling} />
                )}

                {selectedMethod === "upi" && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full">
                      <Field label="UPI ID" hint="(optional, or scan the QR)" error={errors.upi}>
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={e => {
                            setUpiId(e.target.value)
                            if (errors.upi) setErrors(prev => ({ ...prev, upi: undefined }))
                          }}
                          className={`${inputClass} ${errors.upi ? errorInputClass : ""}`}
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
                  <ChoiceGrid label="Select bank" options={banks} value={selectedBank} onChange={(v) => { setSelectedBank(v); if (errors.bank) setErrors(prev => ({ ...prev, bank: undefined })) }} error={errors.bank} />
                )}

                {selectedMethod === "wallet" && (
                  <ChoiceGrid label="Select wallet" options={wallets} value={selectedWallet} onChange={(v) => { setSelectedWallet(v); if (errors.wallet) setErrors(prev => ({ ...prev, wallet: undefined })) }} error={errors.wallet} />
                )}

                <button
                  type="submit"
                  disabled={status === "processing"}
                  className={`w-full h-14 rounded-2xl text-white text-base font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer
                    ${status === "processing" ? "bg-slate-400 cursor-not-allowed" : "bg-navy hover:bg-navy-dark shadow-lg shadow-blue-100"}`}
                >
                  {status === "processing" ? (
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
                  {status === "processing" ? "Please don't close or refresh this page." : "You'll get your e-ticket right after payment."}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
