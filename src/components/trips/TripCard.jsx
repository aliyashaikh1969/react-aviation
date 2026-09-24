import { useState } from 'react'
import { FaDownload, FaPrint, FaTicketAlt, FaClock, FaUserFriends, FaCalendarAlt, FaTimes, FaChevronDown } from 'react-icons/fa'
import { BsAirplaneFill } from 'react-icons/bs'
import { FiX, FiCheck } from 'react-icons/fi'
import { formatDate, formatDuration, fullName, inr, splitDateTime, summarizePassengerTypes } from '../../utils/format'
import { getTripStatus } from '../../constants/tripStatus'
import { LegRoute } from './LegRoute'
import { TripTicket } from './TripTicket'

// One booking on the My Trips page: route, passengers, fare stub and ticket actions.
export const TripCard = ({
  booking,
  ticketOpen,
  onToggleTicket,
  onDownload,
  downloadDisabled,
  onPrint,
  confirmingCancel,
  cancelling,
  onAskCancel,
  onDismissCancel,
  onConfirmCancel,
}) => {
  const { flight, fare } = booking
  const returnFlight = booking.returnFlight
  const isRoundTrip = booking.tripType === 'round' && !!returnFlight
  const status = getTripStatus(booking.status)
  const [logoFailed, setLogoFailed] = useState(false)
  const isCancelled = booking.status === 'cancelled'

  const detailTiles = [
    { icon: <FaCalendarAlt />, label: 'Date', value: formatDate(splitDateTime(flight?.departureTime).date) },
    { icon: <FaClock />, label: 'Duration', value: formatDuration(flight?.duration) },
    ...(isRoundTrip
      ? [
        { icon: <FaTicketAlt />, label: 'Outbound Seats', value: booking.seats?.join(', ') || '--' },
        { icon: <FaTicketAlt />, label: 'Return Seats', value: booking.returnSeats?.join(', ') || '--' },
      ]
      : [{ icon: <FaTicketAlt />, label: 'Seats', value: booking.seats?.join(', ') || '--' }]),
    {
      icon: <FaUserFriends />,
      label: 'Travellers',
      // fall back to the plain count for older bookings with no passenger type saved
      value: summarizePassengerTypes(booking.passengers) || `${booking.travellers} Adult${booking.travellers > 1 ? 's' : ''}`,
    },
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
                {flight?.airlineLogo && !logoFailed ? (
                  <img
                    src={flight.airlineLogo}
                    onError={() => setLogoFailed(true)}
                    loading="lazy"
                    className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1"
                    alt=""
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BsAirplaneFill className="text-navy" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-navy leading-tight">{flight?.airline}</h2>
                  <p className="text-gray-400 text-xs mt-0.5">{flight?.flightNumber} · {flight?.airplane}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  PNR <span className="font-bold text-navy tracking-wider">{booking.pnr}</span>
                </span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${status.badge}`}>
                  {status.label}
                </span>
              </div>
            </div>

            {/* Route */}
            <LegRoute
              flight={flight}
              variant={isRoundTrip ? "outbound" : undefined}
              size="sm"
              badgeClassName="mb-2.5"
              rowClassName="mb-6"
            />
            {isRoundTrip && (
              <LegRoute flight={returnFlight} variant="return" size="sm" badgeClassName="mb-2.5" rowClassName="mb-6" />
            )}

            {/* Detail tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {detailTiles.map(tile => (
                <div key={tile.label} className="bg-[#F5F7FA] px-3.5 py-3 rounded-2xl flex items-center gap-3">
                  <span className="text-navy/70 text-sm">{tile.icon}</span>
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
                  <div key={passenger.id ?? i} className="flex items-center gap-2 bg-[#F5F7FA] rounded-full pl-1.5 pr-3 py-1.5 text-sm">
                    <span className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-xs font-semibold">
                      {/* older bookings only have passenger.name, not firstName/lastName */}
                      {(passenger.firstName || passenger.name)?.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-medium">{fullName(passenger) || passenger.name}</span>
                    <span className="text-xs text-gray-400">
                      · {passenger.seat ?? '--'}{isRoundTrip && ` / ${passenger.returnSeat ?? '--'}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right stub */}
          <div className="xl:w-[250px] border-t-2 xl:border-t-0 xl:border-l-2 border-dashed border-gray-200 pt-6 xl:pt-0 xl:pl-8 flex flex-col gap-5">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total paid</p>
              <h3 className={`text-3xl font-bold text-navy ${isCancelled ? 'line-through decoration-2 decoration-red-300' : ''}`}>
                {inr(fare?.grandTotal)}
              </h3>
              <div className="text-xs text-gray-400 mt-3 space-y-1">
                <div className="flex justify-between"><span>Base fare</span><span>{inr(fare?.baseFare)}</span></div>
                <div className="flex justify-between"><span>Seats</span><span>{inr(fare?.seatTotal)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>{inr(fare?.taxes)}</span></div>
                {fare?.discount > 0 && (
                  <div className="flex justify-between text-green-600"><span>Discount</span><span>-{inr(fare.discount)}</span></div>
                )}
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
                className="bg-navy hover:bg-navy-dark text-white py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer"
              >
                <FaTicketAlt />
                {ticketOpen ? 'Hide ticket' : 'View ticket'}
                <FaChevronDown size={10} className={`transition-transform ${ticketOpen ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={onDownload}
                disabled={downloadDisabled}
                className="border border-navy text-navy hover:bg-navy hover:text-white disabled:opacity-50 disabled:pointer-events-none py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer"
              >
                <FaDownload />
                Download ticket
              </button>

              <button
                onClick={onPrint}
                className="border border-navy text-navy hover:bg-navy hover:text-white py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer"
              >
                <FaPrint />
                Print ticket
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
