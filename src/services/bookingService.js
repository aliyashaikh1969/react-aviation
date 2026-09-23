import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, updateDoc } from "firebase/firestore"
import { db } from "./firestore"
import { todayIso } from "../utils/format"

const BOOKINGS = "bookings"

// Saves a booking and returns its id. A PNR that was already saved is not duplicated.
export const saveBooking = async (userId, bookingData) => {
  const existing = await getDocs(
    query(
      collection(db, BOOKINGS),
      where("userId", "==", userId),
      where("pnr", "==", bookingData.pnr)
    )
  )
  if (!existing.empty) return existing.docs[0].id

  const docRef = await addDoc(collection(db, BOOKINGS), {
    userId,
    ...bookingData,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

// Returns the user's bookings, newest first. Upcoming/completed is worked out from the
// departure date; cancelled bookings keep their stored status.
export const getUserBookings = async (userId) => {
  const snapshot = await getDocs(query(collection(db, BOOKINGS), where("userId", "==", userId)))
  const bookings = snapshot.docs.map(document => ({ id: document.id, ...document.data() }))

  const today = todayIso()

  return bookings
    .map(booking => {
      if (booking.status === 'cancelled') return booking

      const departureDate = booking.flight?.departureTime?.split(" ")[0]
      if (!departureDate) return booking

      // comparing the date strings directly avoids timezone issues with new Date()
      return { ...booking, status: departureDate >= today ? 'upcoming' : 'completed' }
    })
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
}

export const cancelBooking = async (bookingId) => {
  await updateDoc(doc(db, BOOKINGS, bookingId), { status: "cancelled" })
}
