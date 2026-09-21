import { Link, useNavigate } from 'react-router-dom'
import {
  FiArrowLeft, FiArrowRight, FiClock, FiBriefcase, FiCheckCircle, FiAlertTriangle,
  FiWifi, FiZap, FiMonitor, FiCoffee, FiWind,
} from 'react-icons/fi'
import { PiSeatBold } from 'react-icons/pi'
import { useFlight } from '../hooks/useFlight'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { formatDate, formatDuration, inr, splitDateTime } from '../utils/format'
import { summarizeFlight } from '../utils/flight'
import { TAXES_PER_PASSENGER } from '../constants/fare'
import { ROUTES } from '../constants/routes'
import { PageHero } from '../components/ui/PageHero'
import { EmptyState } from '../components/ui/EmptyState'
import { AirportPoint } from '../components/flights/AirportPoint'
import { FlightPath } from '../components/flights/FlightPath'

// extension text from the API -> icon; carbon lines are shown in their own card
const extensionIcon = (text) => {
  if (/wi-?fi/i.test(text)) return FiWifi
  if (/power|usb/i.test(text)) return FiZap
  if (/stream|video|entertain|screen/i.test(text)) return FiMonitor
  if (/legroom/i.test(text)) return PiSeatBold
  return FiCheckCircle
}

const INCLUSIONS = [
  { icon: FiBriefcase, title: 'Check-in', text: '15 kg per passenger' },
  { icon: FiBriefcase, title: 'Cabin', text: '7 kg per passenger' },
  { icon: FiCoffee, title: 'Meal', text: 'Available on board' },
]

const LegCard = ({ leg, index, total }) => {
  const departure = splitDateTime(leg.departure_airport?.time)
  const arrival = splitDateTime(leg.arrival_airport?.time)
  const extras = (leg.extensions ?? []).filter(text => !/carbon/i.test(text))
  const arrivesNextDay = leg.overnight || departure.date !== arrival.date

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 p-1.5 shrink-0">
            <img src={leg.airline_logo} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#0A2A6B] truncate">{leg.airline}</p>
            <p className="text-xs text-slate-500">
              {leg.flight_number}{leg.airplane ? ` · ${leg.airplane}` : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {total > 1 && (
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              Flight {index + 1} of {total}
            </span>
          )}
          {leg.travel_class && (
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {leg.travel_class}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <AirportPoint code={leg.departure_airport?.id} name={leg.departure_airport?.name} dateTime={leg.departure_airport?.time} />
          <FlightPath
            duration={leg.duration}
            label={arrivesNextDay ? 'Arrives next day' : undefined}
            tone="indigo"
          />
          <AirportPoint code={leg.arrival_airport?.id} name={leg.arrival_airport?.name} dateTime={leg.arrival_airport?.time} align="right" />
        </div>

        {(extras.length > 0 || leg.often_delayed_by_over_30_min) && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">On board</p>
            <div className="flex flex-wrap gap-2">
              {extras.map(text => {
                const Icon = extensionIcon(text)
                return (
                  <span key={text} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                    <Icon className="text-[#0A2A6B] shrink-0" /> {text}
                  </span>
                )
              })}
            </div>

            {leg.often_delayed_by_over_30_min && (
              <p className="mt-4 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                <FiAlertTriangle className="mt-0.5 shrink-0" />
                This flight is often delayed by more than 30 minutes.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Layover = ({ layover }) => (
  <div className="flex items-center gap-3 my-3 ml-5">
    <div className="w-px h-10 border-l-2 border-dashed border-orange-300" />
    <div className="flex items-center gap-2 text-sm bg-orange-50 text-orange-700 border border-orange-200 rounded-xl px-4 py-2">
      <FiClock className="shrink-0" />
      <span>
        <strong>{formatDuration(layover.duration)}</strong> layover in {layover.name}
        {layover.id ? ` (${layover.id})` : ''}
        {layover.overnight ? ' · overnight' : ''}
      </span>
    </div>
  </div>
)

export const FlightDetailsPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const { detailFlight: flight, setSelectedFlight, searchData } = useFlight()

  if (!flight) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 bg-[#F5F7FA]">
        <EmptyState
          title="No flight selected"
          text='Search for flights and choose "Flight details" on a result to see it here.'
          action={
            <Link to={ROUTES.home} className="mt-3 bg-[#0A2A6B] hover:bg-[#081f52] text-white px-7 py-3 rounded-2xl font-medium transition-colors">
              Search flights
            </Link>
          }
        />
      </div>
    )
  }

  const { legs, first, last, stops, layovers } = summarizeFlight(flight)
  const departureDate = splitDateTime(first?.departure_airport?.time).date
  const travellers = searchData.travellers ?? 1
  const baseFare = (flight.price ?? 0) * travellers
  const taxes = TAXES_PER_PASSENGER * travellers
  const carbon = flight.carbon_emissions

  const selectFlight = () => {
    setSelectedFlight(flight)
    navigate(ROUTES.booking, { state: { step: 2 } })
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen">

      <PageHero
        overlap
        maxWidth="max-w-[1400px]"
        eyebrow="Flight details"
        topSlot={
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-100 hover:text-white text-sm mb-6 cursor-pointer"
          >
            <FiArrowLeft /> Back to results
          </button>
        }
        title={
          <span className="text-3xl md:text-4xl flex items-center gap-4 flex-wrap">
            {first?.departure_airport?.id}
            <FiArrowRight className="text-blue-200" />
            {last?.arrival_airport?.id}
          </span>
        }
        subtitle={
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm md:text-base">
            <span>{formatDate(departureDate, { weekday: true })}</span>
            <span className="opacity-50">•</span>
            <span>{formatDuration(flight.total_duration)}</span>
            <span className="opacity-50">•</span>
            <span>{stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`}</span>
            <span className="opacity-50">•</span>
            <span>{flight.type}</span>
          </span>
        }
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 -mt-14 pb-16 grid lg:grid-cols-[1fr_340px] gap-6 items-start relative">

        {/* Main */}
        <div className="min-w-0 space-y-6">

          <section>
            {legs.map((leg, i) => (
              <div key={`${leg.flight_number}-${i}`}>
                <LegCard leg={leg} index={i} total={legs.length} />
                {layovers[i] && i < legs.length - 1 && <Layover layover={layovers[i]} />}
              </div>
            ))}
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-[#0A2A6B] mb-4">Baggage & inclusions</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {INCLUSIONS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#0A2A6B] shadow-sm shrink-0">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{title}</p>
                    <p className="font-semibold text-sm text-slate-800">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {carbon?.this_flight && (
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-[#0A2A6B] mb-4 flex items-center gap-2">
                <FiWind className="text-green-600" /> Carbon emissions
              </h2>
              <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
                <div>
                  <p className="text-xs text-slate-500">This flight</p>
                  <p className="text-2xl font-bold text-slate-800">{Math.round(carbon.this_flight / 1000)} kg CO₂</p>
                </div>
                {carbon.typical_for_this_route ? (
                  <div>
                    <p className="text-xs text-slate-500">Typical for this route</p>
                    <p className="text-2xl font-bold text-slate-500">{Math.round(carbon.typical_for_this_route / 1000)} kg</p>
                  </div>
                ) : null}
                {typeof carbon.difference_percent === 'number' && carbon.difference_percent !== 0 && (
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full
                    ${carbon.difference_percent < 0 ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                    {Math.abs(carbon.difference_percent)}% {carbon.difference_percent < 0 ? 'lower' : 'higher'} than typical
                  </span>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Price sidebar */}
        <aside className="lg:sticky lg:top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-3 pb-5 border-b border-dashed border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-slate-50 p-1.5 shrink-0">
              <img src={flight.airline_logo ?? first?.airline_logo} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[#0A2A6B] truncate">{first?.airline}</p>
              <p className="text-xs text-slate-500 truncate">{legs.map(leg => leg.flight_number).join(' · ')}</p>
            </div>
          </div>

          <div className="py-5">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Fare per person</p>
            <p className="text-4xl font-bold text-[#0A2A6B] mt-1">{inr(flight.price)}</p>
          </div>

          <div className="space-y-2.5 text-sm pb-5 border-b border-slate-100">
            <div className="flex justify-between text-slate-600">
              <span>Base fare × {travellers}</span>
              <span className="font-medium">{inr(baseFare)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Taxes & fees × {travellers}</span>
              <span className="font-medium">{inr(taxes)}</span>
            </div>
            <div className="flex justify-between pt-2 font-bold text-[#0A2A6B]">
              <span>Estimated total</span>
              <span>{inr(baseFare + taxes)}</span>
            </div>
            <p className="text-xs text-slate-400">Seat charges are added when you choose seats.</p>
          </div>

          <button
            onClick={selectFlight}
            className="mt-5 w-full bg-[#0A2A6B] hover:bg-[#081f52] text-white font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Select this flight <FiArrowRight />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-2xl transition-colors cursor-pointer"
          >
            Back to results
          </button>
        </aside>
      </div>
    </div>
  )
}
