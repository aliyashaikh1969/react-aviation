import { useEffect, useRef, useState } from 'react'
import { FaTicketAlt, FaCheckCircle, FaWallet, FaPlaneDeparture } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { getUserBookings, cancelBooking } from '../services/bookingService'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { downloadElementAsPdf } from '../utils/pdf'
import { inr } from '../utils/format'
import { ROUTES } from '../constants/routes'
import { PageHero } from '../components/ui/PageHero'
import { EmptyState } from '../components/ui/EmptyState'
import { TripCard } from '../components/trips/TripCard'
import { TripTicket } from '../components/trips/TripTicket'
import { TripSkeleton } from '../components/trips/TripSkeleton'

export const MyTripsPage = () => {
  useScrollToTop()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [cancellingId, setCancellingId] = useState(null)
  const [confirmCancelId, setConfirmCancelId] = useState(null)
  const [openTicketId, setOpenTicketId] = useState(null)
  const [printBooking, setPrintBooking] = useState(null)
  const printRef = useRef(null)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return
      try {
        setBookings(await getUserBookings(user.uid))
      } catch (err) {
        console.error('Fetch error:', err)
        toast.error("Couldn't load your trips. Please refresh.")
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [user])

  // Download renders an off-screen copy of the ticket, so it works even when the ticket is collapsed
  useEffect(() => {
    if (!printBooking) return
    const run = async () => {
      const toastId = toast.loading('Generating ticket...')
      try {
        await new Promise(resolve => requestAnimationFrame(resolve))
        await downloadElementAsPdf(printRef.current, `ticket-${printBooking.pnr}.pdf`)
        toast.success('Ticket downloaded!', { id: toastId })
      } catch (err) {
        console.error('Download error:', err)
        toast.error('Download failed. Please try again.', { id: toastId })
      } finally {
        setPrintBooking(null)
      }
    }
    run()
  }, [printBooking])

  const handleCancel = async (bookingId) => {
    setCancellingId(bookingId)
    try {
      await cancelBooking(bookingId)
      setBookings(prev => prev.map(booking => (booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking)))
      toast.success('Booking cancelled')
    } catch (err) {
      console.error('Cancel error:', err)
      toast.error("Couldn't cancel the booking. Please try again.")
    } finally {
      setCancellingId(null)
      setConfirmCancelId(null)
    }
  }

  const countBy = (status) => bookings.filter(booking => booking.status === status).length
  const visibleBookings = activeTab === 'all' ? bookings : bookings.filter(booking => booking.status === activeTab)
  const totalSpent = bookings
    .filter(booking => booking.status !== 'cancelled')
    .reduce((total, booking) => total + (booking.fare?.grandTotal ?? 0), 0)

  const tabs = [
    { key: 'all', label: 'All trips', count: bookings.length },
    { key: 'upcoming', label: 'Upcoming', count: countBy('upcoming') },
    { key: 'completed', label: 'Completed', count: countBy('completed') },
    { key: 'cancelled', label: 'Cancelled', count: countBy('cancelled') },
  ]

  const stats = [
    { label: 'Total bookings', value: bookings.length, icon: <FaTicketAlt /> },
    { label: 'Upcoming', value: countBy('upcoming'), icon: <FaPlaneDeparture /> },
    { label: 'Completed', value: countBy('completed'), icon: <FaCheckCircle /> },
    { label: 'Total spent', value: inr(totalSpent), icon: <FaWallet /> },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1E293B]">

      <PageHero overlap title="My Trips" subtitle="Manage all your bookings in one place." />

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-14 pb-16 relative">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#0A2647]/5 text-[#0A2647] flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-gray-500 text-xs">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-[#0A2647] truncate">
                  {loading ? '–' : stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer
                ${activeTab === tab.key
                  ? 'bg-[#0A2647] text-white shadow-lg shadow-[#0A2647]/20'
                  : 'bg-white text-[#0A2647] border border-gray-200 hover:bg-gray-50'}`}
            >
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Trips */}
        {loading ? (
          <div className="grid gap-6">
            <TripSkeleton /><TripSkeleton />
          </div>
        ) : visibleBookings.length > 0 ? (
          <div className="grid gap-6">
            {visibleBookings.map(booking => (
              <TripCard
                key={booking.id}
                booking={booking}
                ticketOpen={openTicketId === booking.id}
                onToggleTicket={() => setOpenTicketId(openTicketId === booking.id ? null : booking.id)}
                onDownload={() => setPrintBooking(booking)}
                downloadDisabled={!!printBooking}
                confirmingCancel={confirmCancelId === booking.id}
                cancelling={cancellingId === booking.id}
                onAskCancel={() => setConfirmCancelId(booking.id)}
                onDismissCancel={() => setConfirmCancelId(null)}
                onConfirmCancel={() => handleCancel(booking.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            className="py-16 md:py-20"
            title="No trips found"
            text={activeTab === 'all'
              ? "You haven't booked any flights yet. Your next adventure starts here."
              : `You have no ${activeTab} trips.`}
            action={activeTab === 'all' && (
              <button
                onClick={() => navigate(ROUTES.home)}
                className="mt-3 bg-[#0A2647] hover:bg-[#144272] text-white px-7 py-3 rounded-2xl transition-colors font-medium cursor-pointer"
              >
                Search flights
              </button>
            )}
          />
        )}
      </div>

      {/* Off-screen ticket used for PDF capture */}
      {printBooking && (
        <div style={{ position: 'fixed', left: -10000, top: 0 }} aria-hidden="true">
          <TripTicket booking={printBooking} innerRef={printRef} width={760} />
        </div>
      )}
    </div>
  )
}
