import { formatDate, splitDateTime } from '../../utils/format'

// One end of a flight: airport code, name, time and date.
//   emphasis="time" -> big time first (flight details, overview)
//   emphasis="code" -> big airport code first (My Trips, seat summary)
export const AirportPoint = ({ code, name, dateTime, align = 'left', emphasis = 'time', truncateName = false }) => {
  const { date, time } = splitDateTime(dateTime)
  const rightAligned = align === 'right'
  const widthCap = truncateName ? 'max-w-[40%] sm:max-w-[200px]' : ''

  const nameClass = `text-xs sm:text-sm text-slate-500 leading-5 ${truncateName ? 'truncate' : 'break-words'}`

  if (emphasis === 'code') {
    return (
      <div className={`min-w-0 ${widthCap} ${rightAligned ? 'text-right' : ''}`}>
        <p className="text-3xl font-bold text-[#0A2647] leading-none">{code}</p>
        <p className={`${nameClass} mt-1.5`} title={name}>{name}</p>
        <p className="font-semibold text-lg mt-3 leading-none">{time}</p>
        <p className="text-xs text-gray-400 mt-1">{formatDate(date)}</p>
      </div>
    )
  }

  return (
    <div className={`min-w-0 ${rightAligned ? 'md:text-right' : ''}`}>
      <p className="text-2xl sm:text-3xl font-bold text-[#0A2A6B] leading-none">{time}</p>
      <p className="text-xs text-slate-500 mt-1.5">{formatDate(date, { weekday: true })}</p>
      <p className="text-base sm:text-lg font-semibold text-slate-800 mt-3">{code}</p>
      <p className={nameClass} title={name}>{name}</p>
    </div>
  )
}
