import { FiClock } from 'react-icons/fi'
import { BsAirplaneFill } from 'react-icons/bs'
import { formatDuration } from '../../utils/format'

const TONES = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-600',
  indigo: 'bg-indigo-50 text-indigo-600',
}

// The dashed "line with a plane" between two airports, with the duration above it and
// an optional badge (stops, trip type, ...) below. `children` render under the badge.
export const FlightPath = ({ duration, label, tone = 'blue', children }) => (
  <div className="flex flex-col items-center flex-1 gap-2 min-w-[80px] sm:min-w-[110px] px-1 sm:px-2">
    <p className="text-xs text-slate-500 flex items-center gap-1.5">
      <FiClock size={11} /> {formatDuration(duration)}
    </p>

    <div className="flex items-center w-full gap-2">
      <span className="w-2 h-2 rounded-full border-2 border-navy shrink-0" />
      <div className="flex-1 border-t-2 border-dashed border-slate-300" />
      <BsAirplaneFill className="text-navy rotate-90 shrink-0" />
      <div className="flex-1 border-t-2 border-dashed border-slate-300" />
      <span className="w-2 h-2 rounded-full bg-navy shrink-0" />
    </div>

    {label && (
      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${TONES[tone]}`}>{label}</span>
    )}
    {children}
  </div>
)
