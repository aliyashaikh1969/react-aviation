import { db } from "./config"
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"

// ✅ Booking save karo
export const saveBooking = async (userId, bookingData) => {
  const docRef = await addDoc(collection(db, "bookings"), {
    userId,
    ...bookingData,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

// ✅ User ki bookings fetch karo
export const getUserBookings = async (userId) => {
  try {
    // ✅ orderBy hatao — index nahi chahiye
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId)
      // orderBy hata diya
    )

    const snapshot = await getDocs(q)
    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // ✅ JavaScript mein sort karo
    return bookings.sort((a, b) =>
      (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)
    )

  } catch (error) {
    console.error("Fetch error:", error)
    return []
  }
}