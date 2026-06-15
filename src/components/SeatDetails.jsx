import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useFlight } from "../context/FlightContext";
import { TbEdit } from "react-icons/tb";

export const SeatDetails = ({ prevStep }) => {
  const { selectedSeats, flightData } = useFlight()
  const seatTotal = selectedSeats.reduce((t, s) => t + s.price, 0)

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md w-full">

      {/* Heading */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
            <MdAirlineSeatReclineNormal className="text-blue-700 text-2xl" />
          </div>

          <div>
            <p className="text-2xl font-bold text-[#0A2A6B]">
              Selected Seats
            </p>

            <p className="text-sm text-slate-500">
              Your selected seats for this flight
            </p>
          </div>
        </div>

        <button onClick={prevStep} className="text-blue-700 border border-[#0A2A6B] font-semibold  text-sm mt-4 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#e8eef7]">
          <TbEdit /> Change Seats
        </button>
      </div>

      <div className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-5">

        <h3 className="text-lg font-bold text-[#0A2A6B] mb-5">
          Your Seats
        </h3>

        {selectedSeats.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {selectedSeats.map(seat => (

              <div key={seat.seatNo} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold flex flex-col items-center">
                <span>
                  {seat.seatNo}
                </span>
                <span>{seat.type}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No setat is selected</p>
        )}

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
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Seat type</span>
            <span className="font-semibold">
              {selectedSeats?.[0]?.type}           
               </span>
          </div>
        </div>
        <hr className="border-slate-200 my-3" />
        <div className="flex justify-between">
          <span className="font-medium text-[#0A2A6B]">Total seat charges</span>
          <span className="text-[#0A2A6B] font-medium text-lg">₹{seatTotal}</span>
        </div>
      </div>

    </div>

  )
}
