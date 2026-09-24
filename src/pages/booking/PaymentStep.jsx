import { useState } from 'react'
import PaymentMethod from '../../components/booking/PaymentMethod'
import { FiShield, FiRefreshCcw, FiHeadphones } from "react-icons/fi";
import { FaArrowLeft } from 'react-icons/fa';
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { FlightOverview } from '../../components/flights/FlightOverview';
import { useFare } from '../../hooks/useFare'
import { useFlight } from '../../hooks/useFlight'
import { inr } from '../../utils/format'

const trust = [
  { icon: FiShield, title: "Secure", text: "100% protected" },
  { icon: FiRefreshCcw, title: "Refunds", text: "Hassle-free" },
  { icon: FiHeadphones, title: "Support", text: "24/7 help" },
]

export const PaymentStep = ({ nextStep, prevStep }) => {
  useScrollToTop();

  const [processing, setProcessing] = useState(false)
  const { baseFare, outboundSeatTotal, returnSeatTotal, taxes, discount, grandTotal } = useFare()
  const { selectedFlight, selectedReturnFlight, searchData } = useFlight()
  const isRoundTrip = searchData.tripType === "round"

  const fareRows = isRoundTrip
    ? [
      { label: "Base fare", value: baseFare },
      { label: "Outbound seat charges", value: outboundSeatTotal },
      { label: "Return seat charges", value: returnSeatTotal },
      { label: "Taxes & fees", value: taxes },
    ]
    : [
      { label: "Base fare", value: baseFare },
      { label: "Seat charges", value: outboundSeatTotal },
      { label: "Taxes & fees", value: taxes },
    ]

  return (
    <div className="bg-[#F5F7FA]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 pt-6 pb-10">
        <h2 className="text-xl md:text-2xl font-bold text-navy mb-5">Payment</h2>

        <div className="flex flex-col xl:flex-row gap-6">

          <div className="flex-1 min-w-0">
            <PaymentMethod nextStep={nextStep} onProcessingChange={setProcessing} />
          </div>

          <aside className="w-full xl:w-[400px] xl:sticky xl:top-24 self-start bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-navy">Your booking summary</h2>
              <p className="text-slate-500 mt-1 text-xs">Review your trip details before payment</p>
            </div>

            <FlightOverview flight={selectedFlight} title={isRoundTrip ? "Outbound Flight" : "Flight Details"} compact />
            {isRoundTrip && (
              <div className="mt-5">
                <FlightOverview flight={selectedReturnFlight} title="Return Flight" variant="return" compact />
              </div>
            )}

            <div className="border border-slate-200 rounded-2xl p-5 mt-5">
              <h3 className="font-bold text-navy text-lg mb-4">Fare breakdown</h3>

              <div className="space-y-3">
                {fareRows.map(row => (
                  <div key={row.label} className="text-sm flex items-center justify-between text-slate-600">
                    <span>{row.label}</span>
                    <span className="font-medium">{inr(row.value)}</span>
                  </div>
                ))}
                {discount > 0 && (
                  <div className="text-sm flex items-center justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-{inr(discount)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 mt-4 pt-4 flex items-center justify-between">
                <h3 className="font-bold text-navy">Total amount</h3>
                <h2 className="text-2xl font-bold text-[#0A58FF]">{inr(grandTotal)}</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-200">
              {trust.map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
                    <Icon className="text-blue-700 text-xl" />
                  </div>
                  <h4 className="font-semibold text-sm text-navy mt-2">{title}</h4>
                  <p className="text-xs text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <button
          onClick={prevStep}
          disabled={processing}
          className="mt-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <FaArrowLeft />
          Back to summary
        </button>
      </div>
    </div>
  )
}
