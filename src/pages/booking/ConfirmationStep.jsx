import { useEffect, useRef, useState } from 'react'
import { FiCheck, FiCalendar, FiDownload, FiPrinter, FiArrowRight, FiHeadphones, FiShield, FiClock, FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
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
import { ETicket } from '../../components/booking/ETicket'

export const ConfirmationStep = () => {
  useScrollToTop();
  const { user } = useAuth()
  const navigate = useNavigate();
  const { selectedFlight, selectedReturnFlight, selectedSeats, selectedReturnSeats, searchData, resetBooking } = useFlight();
  const { passengers } = usePassenger();
  const { baseFare, seatTotal, taxes, discount, grandTotal } = useFare()
  const { first } = summarizeFlight(selectedFlight)
  const isRoundTrip = searchData.tripType === "round" && !!selectedReturnFlight
  const { first: returnFirst } = summarizeFlight(selectedReturnFlight)

  const [pnr] = useState(generatePnr)
  const [bookingDate] = useState(() =>
    new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  )
  const [bookingTime] = useState(() =>
    new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
  )

  const ticketRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  // 'idle' (guest — nothing to save) | 'saving' | 'saved' | 'failed'
  const [saveStatus, setSaveStatus] = useState(user ? "saving" : "idle")
  const [saveErrorCode, setSaveErrorCode] = useState(null)

  // guard against saving the same booking twice
  const saveStarted = useRef(false)
  const attemptSave = () => {
    if (!user || !selectedFlight) return
    saveStarted.current = true
    setSaveStatus("saving")

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
      returnFlight: isRoundTrip ? {
        airline: returnFirst?.airline,
        flightNumber: returnFirst?.flight_number,
        airplane: returnFirst?.airplane,
        airlineLogo: selectedReturnFlight.airline_logo,
        from: returnFirst?.departure_airport?.id,
        fromName: returnFirst?.departure_airport?.name,
        to: returnFirst?.arrival_airport?.id,
        toName: returnFirst?.arrival_airport?.name,
        departureTime: returnFirst?.departure_airport?.time,
        arrivalTime: returnFirst?.arrival_airport?.time,
        duration: selectedReturnFlight.total_duration,
        type: selectedReturnFlight.type,
      } : null,
      passengers: passengers?.map((passenger, i) => ({
        ...passenger,
        seat: selectedSeats[i]?.seatNo ?? "--",
        seatPrice: selectedSeats[i]?.price ?? 0,
        // outbound and return are independent seat picks -- null (not undefined, which
        // Firestore rejects) for a one-way booking with no return leg at all.
        returnSeat: isRoundTrip ? (selectedReturnSeats[i]?.seatNo ?? "--") : null,
        returnSeatPrice: isRoundTrip ? (selectedReturnSeats[i]?.price ?? 0) : null,
      })),
      seats: selectedSeats.map(seat => seat.seatNo),
      returnSeats: isRoundTrip ? selectedReturnSeats.map(seat => seat.seatNo) : null,
      // baseFare here is already the total for all travellers (and both legs, for a round
      // trip) -- see useFare -- not a single passenger's single-flight price
      fare: { baseFare, seatTotal, taxes, discount, grandTotal },
      tripType: searchData.tripType,
      travellers: searchData.travellers,
      status: "confirmed",
    }).then(() => {
      setSaveStatus("saved")
    }).catch((err) => {
      console.error("Save error:", err)
      saveStarted.current = false
      setSaveErrorCode(err?.code ?? null)
      setSaveStatus("failed")
    })
  }

  useEffect(() => {
    if (!user || !selectedFlight || saveStarted.current) return
    attemptSave()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run this once, on mount
  }, [])

  // the ticket itself is always valid regardless of why the save failed, so the message
  // just needs to tell the user whether trying again is likely to help
  const saveFailureMessage =
    saveErrorCode === "permission-denied" || saveErrorCode === "unauthenticated"
      ? "Your session has expired. Please log in again to save this booking to My Trips."
      : !navigator.onLine
        ? "You appear to be offline. Your ticket below is still valid — retry once you're back online to save it to My Trips."
        : "We couldn't save this booking to your account. Your ticket below is still valid — you can retry saving it."

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

  const handlePrint = () => window.print()

  // Guests can complete checkout, but nothing is saved without an account — send them
  // to log in instead of My Trips, where they'd otherwise find nothing.
  const finishBooking = () => {
    resetBooking()
    navigate(user ? ROUTES.myTrips : ROUTES.login)
  }

  return (
    <div className="bg-[#F5F7FA] px-4 sm:px-8 lg:px-16 py-6 print:bg-white print:p-0">

      <div className="max-w-7xl mx-auto">

        {/* Success banner */}
        <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-3xl overflow-hidden shadow-sm print:hidden">
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

                {saveStatus === "failed" && (
                  <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-red-800">
                    <FiAlertTriangle className="shrink-0 mt-0.5" />
                    <span className="flex-1">{saveFailureMessage}</span>
                    {saveErrorCode === "permission-denied" || saveErrorCode === "unauthenticated" ? (
                      <Link to={ROUTES.login} className="shrink-0 font-semibold underline">
                        Log in again
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={attemptSave}
                        className="shrink-0 flex items-center gap-1.5 font-semibold underline cursor-pointer"
                      >
                        <FiRefreshCw size={14} /> Retry
                      </button>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-x-10 gap-y-4 mt-5">
                  <div>
                    <p className="text-sm text-slate-500">Booking reference (PNR)</p>
                    <h3 className="text-xl font-bold text-navy mt-1 tracking-widest">{pnr}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <FiCalendar className="text-blue-700 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Booking date</p>
                      <h4 className="font-bold text-navy mt-0.5">{bookingDate} · {bookingTime}</h4>
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

        {/* Main grid: the e-ticket itself (name, seats, amount, QR — everything's on it), plus help */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6 print:block">

          <div className="min-w-0 print:w-full">
            <p className="lg:hidden text-xs text-slate-400 mb-2">Scroll sideways to see the full ticket →</p>
            <div className="overflow-x-auto print:overflow-visible">
              <ETicket
                offscreen={false}
                innerRef={ticketRef}
                pnr={pnr}
                bookingDate={bookingDate}
                selectedFlight={selectedFlight}
                selectedReturnFlight={selectedReturnFlight}
                passengers={passengers}
                selectedSeats={selectedSeats}
                selectedReturnSeats={selectedReturnSeats}
                searchData={searchData}
                seatTotal={seatTotal}
                discount={discount}
                grandTotal={grandTotal}
                userEmail={user?.email}
              />
            </div>
          </div>

          <div className="min-w-0 space-y-6 print:hidden">

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-navy mb-5">What's next?</h3>

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
                  <h3 className="text-xl font-bold text-navy">Need help?</h3>
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

        <div className="flex flex-col sm:flex-row gap-4 mt-6 print:hidden">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 h-14 rounded-2xl border-2 border-blue-600 text-blue-700 font-semibold text-base hover:bg-blue-50 disabled:opacity-60 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <FiDownload className="text-xl" />
            {downloading ? "Preparing ticket…" : "Download ticket"}
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 h-14 rounded-2xl border-2 border-blue-600 text-blue-700 font-semibold text-base hover:bg-blue-50 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <FiPrinter className="text-xl" />
            Print ticket
          </button>

          <button
            onClick={finishBooking}
            className="flex-1 h-14 rounded-2xl bg-navy hover:bg-navy-dark transition-all text-white font-semibold text-base shadow-lg shadow-blue-100 flex items-center justify-center gap-3 cursor-pointer"
          >
            {user ? "Go to My Trips" : "Log in to save this trip"}
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  )
}
