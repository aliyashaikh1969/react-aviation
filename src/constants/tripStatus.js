// Look of each booking status on the My Trips page. Only consumed through getTripStatus below.
const TRIP_STATUS = {
  upcoming: { label: 'Upcoming', badge: 'bg-amber-50 text-amber-700 ring-amber-200', bar: 'bg-amber-400' },
  completed: { label: 'Completed', badge: 'bg-green-50 text-green-700 ring-green-200', bar: 'bg-green-500' },
  cancelled: { label: 'Cancelled', badge: 'bg-red-50 text-red-700 ring-red-200', bar: 'bg-red-400' },
}

// bookings saved before the status was computed are stored as "confirmed"; show them as
// completed. `status` comes from a Firestore document, so Object.hasOwn guards against a
// value like "__proto__" resolving to an inherited Object.prototype value instead.
export const getTripStatus = (status) =>
  status && Object.hasOwn(TRIP_STATUS, status) ? TRIP_STATUS[status] : TRIP_STATUS.completed
