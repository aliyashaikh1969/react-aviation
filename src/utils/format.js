// Shared formatting helpers. Flight times from the API look like "2026-12-01 11:50".

// Today's date as YYYY-MM-DD, in the user's local timezone (not UTC).
export const todayIso = () => {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().split('T')[0]
}

export const inr = (amount) => `₹${(amount ?? 0).toLocaleString('en-IN')}`

// { firstName: "Rahul", lastName: "Sharma" } -> "Rahul Sharma"
export const fullName = (person) => [person?.firstName, person?.lastName].filter(Boolean).join(' ').trim()

// e.g. "2 Adults, 1 Child". Old bookings without a passengerType default to "Adult".
export const summarizePassengerTypes = (passengers) => {
  const counts = new Map()
  for (const p of passengers ?? []) {
    const type = p?.passengerType || 'Adult'
    counts.set(type, (counts.get(type) ?? 0) + 1)
  }
  return [...counts.entries()].map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`).join(', ')
}

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
