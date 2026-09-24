import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { BsAirplaneFill } from "react-icons/bs";
import { useFlight } from "../../hooks/useFlight";
import { useFare } from "../../hooks/useFare"
import { inr } from "../../utils/format"

const seatTypesOf = (seats) => [...new Set(seats.map(seat => seat.type))].join(", ")

const SeatChips = ({ seats }) => (
  seats.length > 0 ? (
    <div className="flex flex-wrap gap-3">
      {seats.map(seat => (
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
  )
)

export const SeatDetails = ({ prevStep }) => {
  const { selectedSeats, selectedReturnSeats, searchData } = useFlight()
  const { travellers, outboundSeatTotal, returnSeatTotal, seatTotal } = useFare()
  const isRoundTrip = searchData.tripType === "round"

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 lg:p-6 shadow-sm w-full">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center">
            <MdAirlineSeatReclineNormal className="text-blue-700 text-xl sm:text-2xl" />
          </div>
          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-navy">Selected Seats</p>
            <p className="text-xs sm:text-sm text-slate-500">
              {isRoundTrip ? "Your selected seats for both flights" : "Your selected seats for this flight"}
            </p>
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

        {isRoundTrip ? (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <BsAirplaneFill className="text-blue-600 text-[10px]" />
                </span>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Outbound</p>
              </div>
              <SeatChips seats={selectedSeats} />
            </div>
            <div className="pt-4 border-t border-dashed border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <BsAirplaneFill className="text-amber-600 text-[10px] -rotate-[135deg]" />
                </span>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Return</p>
              </div>
              <SeatChips seats={selectedReturnSeats} />
            </div>
          </div>
        ) : (
          <SeatChips seats={selectedSeats} />
        )}

        <div className="mt-5 pt-4 border-t border-slate-200 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Passengers</span>
            <span className="font-semibold">{travellers} Adult{travellers > 1 ? "s" : ""}</span>
          </div>
          {isRoundTrip ? (
            <>
              <div className="flex justify-between">
                <span className="text-slate-500">Outbound seat type</span>
                <span className="font-semibold capitalize">{seatTypesOf(selectedSeats) || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Return seat type</span>
                <span className="font-semibold capitalize">{seatTypesOf(selectedReturnSeats) || "—"}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between">
              <span className="text-slate-500">Seat type</span>
              <span className="font-semibold capitalize">{seatTypesOf(selectedSeats) || "—"}</span>
            </div>
          )}
        </div>

        {isRoundTrip && (
          <div className="mt-4 flex flex-col sm:flex-row gap-3 text-sm">
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center">
              <span className="text-slate-500">Outbound charges</span>
              <span className="font-semibold text-navy">{inr(outboundSeatTotal)}</span>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center">
              <span className="text-slate-500">Return charges</span>
              <span className="font-semibold text-navy">{inr(returnSeatTotal)}</span>
            </div>
          </div>
        )}

        <div className="mt-4 bg-blue-50 rounded-xl p-4 flex justify-between items-center">
          <span className="font-medium text-navy">Total seat charges</span>
          <span className="text-navy font-bold text-lg">{inr(seatTotal)}</span>
        </div>
      </div>
    </div>
  )
}
