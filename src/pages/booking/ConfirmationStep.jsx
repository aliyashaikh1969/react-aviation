import { useEffect, useRef, useState } from 'react'
import { FiCheck, FiCalendar, FiDownload, FiArrowRight, FiHeadphones, FiShield, FiClock, FiAlertTriangle } from "react-icons/fi";
import { BsAirplaneFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from "../../hooks/useAuth"
import { useFlight } from '../../hooks/useFlight';
import { usePassenger } from '../../hooks/usePassenger';
import { useFare } from '../../hooks/useFare'
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { saveBooking } from "../../services/bookingService"
import { downloadElementAsPdf } from '../../utils/pdf'
import { generatePnr } from '../../utils/booking'
import { summarizeFlight } from '../../utils/flight'
import { ROUTES } from '../../constants/routes'
import { FlightOverview } from '../../components/flights/FlightOverview';
import { ETicket } from '../../components/booking/ETicket'

export const ConfirmationStep = () => {
  useScrollToTop();
  const { user } = useAuth()
  const navigate = useNavigate();
  const { selectedFlight, selectedSeats, searchData, resetBooking } = useFlight();
  const { passengers } = usePassenger();
  const { seatTotal, taxes, grandTotal } = useFare()
  const { first } = summarizeFlight(selectedFlight)

  const [pnr] = useState(generatePnr)
  const [bookingDate] = useState(() =>
    new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  )
  const [bookingTime] = useState(() =>
    new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
  )

  const ticketRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  // Save the booking once. A ref (not state) guards it, so StrictMode's double effect run cannot save twice.
  const saveStarted = useRef(false)
  useEffect(() => {
    if (!user || !selectedFlight || saveStarted.current) return
    saveStarted.current = true

    saveBooking(user.uid, {
      pnr,
      flight: {
        airline: first?.airline,
        flightNumber: first?.flight_number,
        airplane: first?.airplane,
        airlineLogo: selectedFlight.airline_logo,
        from: first?.departure_airport?.id,
        fromName: first?.departure_airport?.name,
        to: first?.arrival_airport?.id,
        toName: first?.arrival_airport?.name,
        departureTime: first?.departure_airport?.time,
        arrivalTime: first?.arrival_airport?.time,
        duration: selectedFlight.total_duration,
        type: selectedFlight.type,
      },
      passengers: passengers?.map((passenger, i) => ({
        ...passenger,
        seat: selectedSeats[i]?.seatNo ?? "--",
        seatPrice: selectedSeats[i]?.price ?? 0,
      })),
      seats: selectedSeats.map(seat => seat.seatNo),
      fare: { baseFare: selectedFlight.price, seatTotal, taxes, grandTotal },
      tripType: searchData.tripType,
      travellers: searchData.travellers,
      status: "confirmed",
    }).catch((err) => {
      console.error("Save error:", err)
      saveStarted.current = false
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on arrival; saveStarted guards repeats
  }, [])

  const handleDownload = async () => {
    if (downloading || !ticketRef.current) return
    setDownloading(true)
    try {
      await downloadElementAsPdf(ticketRef.current, `ticket-${pnr}.pdf`, { multiPage: true, scale: 3 })
      toast.success("Ticket downloaded!")
    } catch (err) {
      console.error("PDF download error:", err)
      toast.error("Download failed. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  // Guests can complete checkout, but nothing is saved without an account — send them
  // to log in instead of My Trips, where they'd otherwise find nothing.
  const finishBooking = () => {
    resetBooking()
    navigate(user ? ROUTES.myTrips : ROUTES.login)
  }

  return (
    <div className="bg-[#F5F7FA] px-4 sm:px-8 lg:px-16 py-6">

      <div className="max-w-7xl mx-auto">

        {/* Success banner */}
        <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-[1fr_260px] items-center">

            <div className="p-5 sm:p-6 flex gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center shrink-0 shadow-lg shadow-green-200">
                <FiCheck className="text-white text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-green-700">Booking confirmed!</h1>
                <p className="text-slate-600 mt-2 leading-7">
                  Thank you for booking with SkyAero. Your e-ticket is ready to download below
                  {user ? ", and you can find it any time in My Trips." : "."}
                </p>

                {!user && (
                  <div className="mt-4 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-sm text-amber-800">
                    <FiAlertTriangle className="shrink-0 mt-0.5" />
                    <span>
                      You're not logged in, so this booking won't be saved to an account.{" "}
                      <Link to={ROUTES.login} className="font-semibold underline">Log in or sign up</Link>{" "}
                      to keep a copy in My Trips next time.
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-x-10 gap-y-4 mt-5">
                  <div>
                    <p className="text-sm text-slate-500">Booking reference (PNR)</p>
                    <h3 className="text-xl font-bold text-[#0A2A6B] mt-1 tracking-widest">{pnr}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <FiCalendar className="text-blue-700 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Booking date</p>
                      <h4 className="font-bold text-[#0A2A6B] mt-0.5">{bookingDate} · {bookingTime}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center p-6">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full blur-2xl"></div>
                <div className="relative w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
                  <BsAirplaneFill className="text-blue-700 text-5xl rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6">

          <div className="min-w-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6">
            <FlightOverview status="Confirmed" />
          </div>

          <div className="min-w-0 space-y-6">

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0A2A6B] mb-5">What's next?</h3>

              <div className="space-y-5">
                {[
                  { icon: FiDownload, text: "Download your e-ticket and keep a copy on your phone." },
                  { icon: FiClock, text: "Arrive at the airport at least 2 hours before departure." },
                  { icon: FiShield, text: "Carry a valid photo ID for verification." },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex gap-4 items-center">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="text-blue-700 text-xl" />
                    </div>
                    <p className="text-slate-600 leading-6 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0A2A6B]">Need help?</h3>
                  <p className="text-slate-600 mt-2 leading-7 text-sm">Our customer support is available 24/7.</p>

                  <Link
                    to={ROUTES.contact}
                    className="mt-4 h-11 px-5 rounded-2xl border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2 text-sm"
                  >
                    <FiHeadphones />
                    Contact support
                  </Link>
                </div>

                <div className="hidden md:flex w-24 h-24 rounded-full bg-blue-100 items-center justify-center shrink-0">
                  <FiHeadphones className="text-blue-700 text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 h-14 rounded-2xl border-2 border-blue-600 text-blue-700 font-semibold text-base hover:bg-blue-50 disabled:opacity-60 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <FiDownload className="text-xl" />
            {downloading ? "Preparing ticket…" : "Download ticket"}
          </button>

          <button
            onClick={finishBooking}
            className="flex-1 h-14 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] transition-all text-white font-semibold text-base shadow-lg shadow-blue-100 flex items-center justify-center gap-3 cursor-pointer"
          >
            {user ? "Go to My Trips" : "Log in to save this trip"}
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      <ETicket
        innerRef={ticketRef}
        pnr={pnr}
        bookingDate={bookingDate}
        selectedFlight={selectedFlight}
        passengers={passengers}
        selectedSeats={selectedSeats}
        searchData={searchData}
        seatTotal={seatTotal}
        grandTotal={grandTotal}
        userEmail={user?.email}
      />
    </div>
  )
}
