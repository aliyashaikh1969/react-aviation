import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useFlight } from "../../hooks/useFlight";
import { useFare } from "../../hooks/useFare"
import { inr } from "../../utils/format"

export const SeatDetails = ({ prevStep }) => {
  const { selectedSeats } = useFlight()
  const { travellers, seatTotal } = useFare()
  const seatTypes = [...new Set(selectedSeats.map(seat => seat.type))].join(", ")

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 lg:p-6 shadow-sm w-full">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center">
            <MdAirlineSeatReclineNormal className="text-blue-700 text-xl sm:text-2xl" />
          </div>
          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-navy">Selected Seats</p>
            <p className="text-xs sm:text-sm text-slate-500">Your selected seats for this flight</p>
          </div>
        </div>

        <button
          onClick={prevStep}
          className="w-full sm:w-auto flex items-center justify-center gap-2 border border-navy text-navy font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer"
        >
          <TbEdit /> Change seats
        </button>
      </div>

      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">

        {selectedSeats.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {selectedSeats.map(seat => (
              <div key={seat.seatNo} className="min-w-[84px] px-4 py-3 rounded-xl bg-blue-600 text-white flex flex-col items-center shadow-sm">
                <span className="font-bold text-lg leading-none">{seat.seatNo}</span>
                <span className="text-xs capitalize opacity-90 mt-1">{seat.type}</span>
                <span className="text-xs opacity-90">{inr(seat.price)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MdAirlineSeatReclineNormal className="mx-auto text-5xl text-slate-300 mb-3" />
            <p className="text-slate-500">No seats selected yet</p>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-200 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Passengers</span>
            <span className="font-semibold">{travellers} Adult{travellers > 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Seat type</span>
            <span className="font-semibold capitalize">{seatTypes || "—"}</span>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 rounded-xl p-4 flex justify-between items-center">
          <span className="font-medium text-navy">Total seat charges</span>
          <span className="text-navy font-bold text-lg">{inr(seatTotal)}</span>
        </div>
      </div>
    </div>
  )
}
