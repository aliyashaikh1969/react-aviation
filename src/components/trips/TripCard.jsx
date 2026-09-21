import { FaDownload, FaTicketAlt, FaClock, FaUserFriends, FaCalendarAlt, FaTimes, FaChevronDown } from 'react-icons/fa'
import { BsAirplaneFill } from 'react-icons/bs'
import { FiX, FiCheck } from 'react-icons/fi'
import { formatDate, formatDuration, inr, splitDateTime } from '../../utils/format'
import { getTripStatus } from '../../constants/tripStatus'
import { AirportPoint } from '../flights/AirportPoint'
import { FlightPath } from '../flights/FlightPath'
import { TripTicket } from './TripTicket'

// One booking on the My Trips page: route, passengers, fare stub and ticket actions.
export const TripCard = ({
  booking,
  ticketOpen,
  onToggleTicket,
  onDownload,
  downloadDisabled,
  confirmingCancel,
  cancelling,
  onAskCancel,
  onDismissCancel,
  onConfirmCancel,
}) => {
  const { flight, fare } = booking
  const status = getTripStatus(booking.status)
  const isCancelled = booking.status === 'cancelled'

  const detailTiles = [
    { icon: <FaCalendarAlt />, label: 'Date', value: formatDate(splitDateTime(flight?.departureTime).date) },
    { icon: <FaClock />, label: 'Duration', value: formatDuration(flight?.duration) },
    { icon: <FaTicketAlt />, label: 'Seats', value: booking.seats?.join(', ') || '--' },
    { icon: <FaUserFriends />, label: 'Travellers', value: `${booking.travellers} Adult${booking.travellers > 1 ? 's' : ''}` },
  ]

  return (
    <article
      className={`bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden ${isCancelled ? 'opacity-75' : ''}`}
    >
      <div className={`h-1.5 ${status.bar}`} />

      <div className="p-5 md:p-6">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">

          {/* Left */}
          <div className="flex-1 min-w-0">

            {/* Airline + status */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {flight?.airlineLogo ? (
                  <img src={flight.airlineLogo} className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1" alt="" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BsAirplaneFill className="text-[#0A2647]" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-[#0A2647] leading-tight">{flight?.airline}</h2>
                  <p className="text-gray-400 text-xs mt-0.5">{flight?.flightNumber} · {flight?.airplane}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  PNR <span className="font-bold text-[#0A2647] tracking-wider">{booking.pnr}</span>
                </span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${status.badge}`}>
                  {status.label}
                </span>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <AirportPoint emphasis="code" truncateName code={flight?.from} name={flight?.fromName} dateTime={flight?.departureTime} />
              <FlightPath duration={flight?.duration} label={flight?.type} />
              <AirportPoint emphasis="code" truncateName align="right" code={flight?.to} name={flight?.toName} dateTime={flight?.arrivalTime} />
            </div>

            {/* Detail tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {detailTiles.map(tile => (
                <div key={tile.label} className="bg-[#F5F7FA] px-3.5 py-3 rounded-2xl flex items-center gap-3">
                  <span className="text-[#0A2647]/70 text-sm">{tile.icon}</span>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-[11px]">{tile.label}</p>
                    <p className="font-semibold text-sm break-words">{tile.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Passengers */}
            {booking.passengers?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {booking.passengers.map((passenger, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#F5F7FA] rounded-full pl-1.5 pr-3 py-1.5 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[#0A2647] text-white flex items-center justify-center text-xs font-semibold">
                      {passenger.name?.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-medium">{passenger.name}</span>
                    <span className="text-xs text-gray-400">· {passenger.seat ?? '--'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right stub */}
          <div className="xl:w-[250px] border-t-2 xl:border-t-0 xl:border-l-2 border-dashed border-gray-200 pt-6 xl:pt-0 xl:pl-8 flex flex-col gap-5">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total paid</p>
              <h3 className={`text-3xl font-bold text-[#0A2647] ${isCancelled ? 'line-through decoration-2 decoration-red-300' : ''}`}>
                {inr(fare?.grandTotal)}
              </h3>
              <div className="text-xs text-gray-400 mt-3 space-y-1">
                <div className="flex justify-between"><span>Base fare</span><span>{inr(fare?.baseFare)}</span></div>
                <div className="flex justify-between"><span>Seats</span><span>{inr(fare?.seatTotal)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>{inr(fare?.taxes)}</span></div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Booked {booking.createdAt?.toDate?.()?.toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric',
                }) ?? '---'}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={onToggleTicket}
                className="bg-[#0A2647] hover:bg-[#144272] text-white py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer"
              >
                <FaTicketAlt />
                {ticketOpen ? 'Hide ticket' : 'View ticket'}
                <FaChevronDown size={10} className={`transition-transform ${ticketOpen ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={onDownload}
                disabled={downloadDisabled}
                className="border border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white disabled:opacity-50 disabled:pointer-events-none py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer"
              >
                <FaDownload />
                Download ticket
              </button>

              {!isCancelled && (
                confirmingCancel ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                    <p className="text-xs text-red-600 text-center mb-2 font-medium">Cancel this booking?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={onConfirmCancel}
                        disabled={cancelling}
                        className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {cancelling ? (
                          <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <><FiCheck /> Yes, cancel</>
                        )}
                      </button>
                      <button
                        onClick={onDismissCancel}
                        disabled={cancelling}
                        className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FiX /> Keep
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={onAskCancel}
                    className="text-red-500 hover:bg-red-50 py-2 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer"
                  >
                    <FaTimes size={12} />
                    Cancel booking
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Expanded ticket */}
        {ticketOpen && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <TripTicket booking={booking} />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
