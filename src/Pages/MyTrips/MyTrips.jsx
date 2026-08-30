import { useEffect, useState } from 'react'
import { FaPlaneDeparture, FaDownload, FaTicketAlt, FaClock, FaUserFriends, FaCalendarAlt } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { getUserBookings } from '../../firebase/bookingFunctions'
import { useNavigate } from 'react-router-dom'
import { useScrollToTop } from '../../hooks/useScrollToTop'

export const MyTrips = () => {
  useScrollToTop()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  // ✅ Firestore se data fetch karo
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return
      const data = await getUserBookings(user.uid)
      setBookings(data)
      setLoading(false)
    }
    fetchBookings()
  }, [user])

  // ✅ Filter logic
  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true
    return b.status === activeTab
  })

  // ✅ Stats
  const totalSpent = bookings.reduce((t, b) => t + (b.fare?.grandTotal ?? 0), 0)

  const tabs = [
    { key: 'all', label: 'All Trips', count: bookings.length },
    { key: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'upcoming').length },
    { key: 'confirmed', label: 'Completed', count: bookings.filter(b => b.status === 'confirmed').length },
    { key: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length },
  ]

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div className="animate-spin w-10 h-10 border-4 border-[#0A2647] border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1E293B]">

      {/* Header */}
      <div className="bg-[#0A2647] text-white py-14 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">My Trips ✈️</h1>
          <p className="text-gray-200 text-lg">Manage all your bookings in one place.</p>

          {/* ✅ Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {[
              { label: "Total bookings", value: bookings.length },
              { label: "Upcoming", value: bookings.filter(b => b.status === 'upcoming').length },
              { label: "Completed", value: bookings.filter(b => b.status === 'confirmed').length },
              { label: "Total spent", value: `₹${totalSpent.toLocaleString('en-IN')}` },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-4">
                <p className="text-blue-200 text-xs">{s.label}</p>
                <p className="text-2xl font-bold mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        {/* Tabs — ✅ count ke saath */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                ${activeTab === tab.key
                  ? 'bg-[#0A2647] text-white shadow-lg'
                  : 'bg-white text-[#0A2647] border border-gray-200 hover:bg-gray-100'
                }`}
            >
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full
                ${activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Trips */}
        {filteredBookings.length > 0 ? (
          <div className="grid gap-6">
            {filteredBookings.map(booking => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

                  {/* Left Side */}
                  <div className="flex-1">

                    {/* Airline + Status */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        {booking.flight?.airlineLogo ? (
                          <img
                            src={booking.flight.airlineLogo}
                            className="w-10 h-10 rounded-lg object-contain"
                            alt={booking.flight.airline}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <FaPlaneDeparture className="text-[#0A2647]" />
                          </div>
                        )}
                        <div>
                          <h2 className="text-xl font-bold text-[#0A2647]">
                            {booking.flight?.airline}
                          </h2>
                          <p className="text-gray-400 text-xs">
                            {booking.flight?.flightNumber} · PNR: {booking.pnr}
                          </p>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold
                        ${booking.status === 'upcoming'
                          ? 'bg-amber-100 text-amber-700'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                        }`}>
                        {booking.status === 'confirmed' ? '✓ Confirmed' :
                         booking.status === 'upcoming' ? 'Upcoming' : 'Cancelled'}
                      </span>
                    </div>

                    {/* Route */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                      <div>
                        <p className="text-3xl font-bold text-[#0A2647]">
                          {booking.flight?.from}
                        </p>
                        <p className="text-gray-500 text-sm">{booking.flight?.fromName}</p>
                        <p className="font-medium mt-1">
                          {booking.flight?.departureTime?.split(" ")[1]}
                        </p>
                        <p className="text-xs text-gray-400">
                          {booking.flight?.departureTime?.split(" ")[0]}
                        </p>
                      </div>

                      <div className="flex items-center justify-center flex-1 relative">
                        <div className="h-[2px] bg-gray-300 w-full"></div>
                        <div className="absolute bg-white p-3 rounded-full shadow-md text-[#0A2647]">
                          <FaPlaneDeparture size={18} />
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#0A2647]">
                          {booking.flight?.to}
                        </p>
                        <p className="text-gray-500 text-sm">{booking.flight?.toName}</p>
                        <p className="font-medium mt-1">
                          {booking.flight?.arrivalTime?.split(" ")[1]}
                        </p>
                        <p className="text-xs text-gray-400">
                          {booking.flight?.arrivalTime?.split(" ")[0]}
                        </p>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      {[
                        {
                          icon: <FaCalendarAlt className="text-[#0A2647]" />,
                          label: "Date",
                          value: booking.flight?.departureTime?.split(" ")[0] ?? "---"
                        },
                        {
                          icon: <FaClock className="text-[#0A2647]" />,
                          label: "Duration",
                          value: `${booking.flight?.duration}m`
                        },
                        {
                          icon: <FaTicketAlt className="text-[#0A2647]" />,
                          label: "Seats",
                          value: booking.seats?.join(", ") ?? "--"
                        },
                        {
                          icon: <FaUserFriends className="text-[#0A2647]" />,
                          label: "Passengers",
                          value: `${booking.travellers} Adult${booking.travellers > 1 ? "s" : ""}`
                        },
                      ].map((item, i) => (
                        <div key={i} className="bg-[#F5F7FA] p-4 rounded-2xl flex items-center gap-3">
                          {item.icon}
                          <div>
                            <p className="text-gray-500 text-xs">{item.label}</p>
                            <p className="font-semibold">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="xl:w-[240px] border-t xl:border-t-0 xl:border-l border-gray-200 pt-6 xl:pt-0 xl:pl-6 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total paid</p>
                      <h3 className="text-3xl font-bold text-[#0A2647]">
                        ₹{booking.fare?.grandTotal?.toLocaleString('en-IN')}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Booked {booking.createdAt?.toDate?.()?.toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        }) ?? "---"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button className="bg-[#0A2647] hover:bg-[#144272] text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-sm font-medium">
                        <FaTicketAlt />
                        View Ticket
                      </button>
                      <button className="border border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-sm font-medium">
                        <FaDownload />
                        Download Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-3xl font-bold text-[#0A2647] mb-3">No trips found</h2>
            <p className="text-gray-500 mb-6">
              {activeTab === 'all'
                ? "Koi booking nahi mili — pehli flight book karo!"
                : `Koi ${activeTab} trips nahi hain`}
            </p>
            {activeTab === 'all' && (
              <button
                onClick={() => navigate("/")}
                className="bg-[#0A2647] hover:bg-[#144272] text-white px-6 py-3 rounded-2xl transition-all duration-300"
              >
                Search Flights
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}