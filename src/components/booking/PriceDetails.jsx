import { useState } from "react"
import { FiCreditCard, FiLock, FiTag, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useFare } from '../../hooks/useFare'
import { useFlight } from '../../hooks/useFlight'
import { inr } from '../../utils/format'
import { PROMO_CODES, TAX_BREAKDOWN } from '../../constants/fare'

export const PriceDetails = () => {
  const { travellers, isRoundTrip, legCount, baseFare, outboundSeatTotal, returnSeatTotal, discount, promo, grandTotal } = useFare()
  const { promoCode, setPromoCode } = useFlight()
  const [promoInput, setPromoInput] = useState("")

  // legCount doubles each tax line for a round trip (two flights) -- without it these rows
  // would under-count and no longer add up to the total actually charged (see useFare).
  const rows = [
    { label: `Base fare × ${travellers}`, value: baseFare },
    { label: `Airport charges × ${travellers}${isRoundTrip ? " × 2 legs" : ""}`, value: TAX_BREAKDOWN.airport * travellers * legCount },
    { label: `Passenger service fee × ${travellers}${isRoundTrip ? " × 2 legs" : ""}`, value: TAX_BREAKDOWN.service * travellers * legCount },
    { label: `GST × ${travellers}${isRoundTrip ? " × 2 legs" : ""}`, value: TAX_BREAKDOWN.gst * travellers * legCount },
    ...(isRoundTrip
      ? [
        { label: "Outbound seat charges", value: outboundSeatTotal },
        { label: "Return seat charges", value: returnSeatTotal },
      ]
      : [{ label: "Seat charges", value: outboundSeatTotal }]),
  ]

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (!code) return toast.error("Enter a promo code")
    // Object.hasOwn (not just `PROMO_CODES[code]`) so a code like "__proto__" or
    // "constructor" can't accidentally look up an inherited Object.prototype property
    // and be treated as valid.
    if (!Object.hasOwn(PROMO_CODES, code)) return toast.error("Invalid or expired promo code")
    setPromoCode(code)
    setPromoInput("")
    toast.success(`Promo applied: ${PROMO_CODES[code].label}`)
  }

  const removePromo = () => {
    setPromoCode(null)
    toast("Promo code removed", { icon: "🗑️" })
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 lg:p-6 shadow-sm w-full">

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <FiCreditCard className="text-blue-700 text-lg sm:text-xl" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-navy">Price Details</h2>
          <p className="text-xs sm:text-sm text-slate-500">Review your fare breakdown</p>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map(row => (
          <div key={row.label} className="flex justify-between items-center gap-3 text-sm">
            <span className="text-slate-600">{row.label}</span>
            <span className="font-semibold whitespace-nowrap">{inr(row.value)}</span>
          </div>
        ))}
        {discount > 0 && (
          <div className="flex justify-between items-center gap-3 text-sm">
            <span className="text-green-600 flex items-center gap-1.5">
              <FiTag className="shrink-0" /> Discount ({promoCode})
            </span>
            <span className="font-semibold whitespace-nowrap text-green-600">-{inr(discount)}</span>
          </div>
        )}
      </div>

      {/* Promo code */}
      <div className="mt-4">
        {promoCode ? (
          <div className="flex items-center justify-between gap-3 bg-green-50 border border-green-200 rounded-xl px-3.5 py-2.5">
            <p className="text-xs text-green-700 font-medium truncate">
              <FiTag className="inline mr-1.5 -mt-0.5" />
              {promo?.label ?? promoCode} applied
            </p>
            <button
              type="button"
              onClick={removePromo}
              className="text-green-700 hover:text-red-600 shrink-0 cursor-pointer"
              aria-label="Remove promo code"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyPromo())}
              placeholder="Have a promo code?"
              className="flex-1 min-w-0 h-11 px-3.5 rounded-xl border border-slate-200 text-sm uppercase placeholder:normal-case outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
            />
            <button
              type="button"
              onClick={applyPromo}
              className="h-11 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy text-sm font-semibold transition-colors cursor-pointer shrink-0"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-dashed border-slate-200 my-5" />

      <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Total amount</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0A58FF] mt-1">{inr(grandTotal)}</h3>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <FiLock className="shrink-0" />
        Inclusive of all taxes and fees. You'll pay on the next step.
      </p>
    </div>
  )
}
