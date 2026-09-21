// Shared formatting helpers. Flight times from the API look like "2026-12-01 11:50".

export const inr = (amount) => `₹${(amount ?? 0).toLocaleString('en-IN')}`

// 75 -> "1h 15m"
export const formatDuration = (minutes = 0) =>
  `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`

// "2026-12-01 11:50" -> { date: "2026-12-01", time: "11:50" }
export const splitDateTime = (value) => {
  const [date, time] = (value ?? '').split(' ')
  return { date: date ?? '', time: time ?? '--:--' }
}

// "2026-12-01" -> "1 Dec 2026" (or "Tue, 1 Dec 2026" with { weekday: true })
export const formatDate = (isoDate, { weekday = false } = {}) => {
  if (!isoDate) return '---'
  const parsed = new Date(`${isoDate}T00:00`)
  if (isNaN(parsed)) return isoDate
  return parsed.toLocaleDateString('en-IN', {
    ...(weekday && { weekday: 'short' }),
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
