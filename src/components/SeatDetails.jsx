import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useFlight } from "../context/FlightContext";
import { TbEdit } from "react-icons/tb";

export const SeatDetails = ({ prevStep }) => {
  const { selectedSeats, flightData } = useFlight()
  const seatTotal = selectedSeats.reduce((t, s) => t + s.price, 0)

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-5 lg:p-6 shadow-md w-full">

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center">
            <MdAirlineSeatReclineNormal className="text-blue-700 text-xl sm:text-2xl" />
          </div>

          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A2A6B]">
              Selected Seats
            </p>

            <p className="text-xs sm:text-sm text-slate-500">
              Your selected seats for this flight
            </p>
          </div>
        </div>

        <button onClick={prevStep} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#0A2A6B] text-[#0A2A6B] font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition">
          <TbEdit /> Change Seats
        </button>
      </div>

      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">

        <h3 className="text-lg font-bold text-[#0A2A6B] mb-5">
          Your Seats
        </h3>

        {selectedSeats.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-3">            {selectedSeats.map(seat => (

            <div key={seat.seatNo} className="min-w-[70px] px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold flex flex-col items-center shadow-sm">
              <span>
                {seat.seatNo}
              </span>
              <span>{seat.type}</span>
            </div>
          ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MdAirlineSeatReclineNormal className="mx-auto text-5xl text-slate-300 mb-3" />
            <p className="text-slate-500"> No seats selected yet</p>
          </div>)}

        {/* Info */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-slate-500">Passengers</span>
            <span className="font-semibold">{flightData.travellers} Adult{flightData.travellers > 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-slate-500">Seat Charges</span>
            <span className="font-semibold">
              ₹{selectedSeats.reduce((total, seat) => total + seat.price, 0)}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4 text-sm">
            <span className="text-sm text-slate-500">Seat type</span>
            <span className="font-semibold">
              {[...new Set(selectedSeats.map(seat => seat.type))].join(", ")}            </span>
          </div>
        </div>
        <hr className="border-slate-200 my-3" />
        <div className="mt-4 bg-blue-50 rounded-xl p-4 flex justify-between items-center">
          <span className="font-medium text-[#0A2A6B]">Total seat charges</span>
          <span className="text-[#0A2A6B] font-medium text-lg">₹{seatTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>

    </div>

  )
}
