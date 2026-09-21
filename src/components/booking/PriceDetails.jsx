import { FiCreditCard, FiLock } from "react-icons/fi";
import { useFare } from '../../hooks/useFare'
import { inr } from '../../utils/format'
import { TAX_BREAKDOWN } from '../../constants/fare'

export const PriceDetails = () => {
  const { travellers, baseFare, seatTotal, grandTotal } = useFare()

  const rows = [
    { label: `Base fare × ${travellers}`, value: baseFare },
    { label: `Airport charges × ${travellers}`, value: TAX_BREAKDOWN.airport * travellers },
    { label: `Passenger service fee × ${travellers}`, value: TAX_BREAKDOWN.service * travellers },
    { label: `GST × ${travellers}`, value: TAX_BREAKDOWN.gst * travellers },
    { label: "Seat charges", value: seatTotal },
  ]

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 lg:p-6 shadow-sm w-full">

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <FiCreditCard className="text-blue-700 text-lg sm:text-xl" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#0A2A6B]">Price Details</h2>
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
