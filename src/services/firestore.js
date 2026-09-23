import { getFirestore } from "firebase/firestore"
import { app } from "./firebase"

// Split out from firebase.js on purpose: firebase.js is imported eagerly (by AuthProvider,
// which wraps the whole app), but Firestore is only used by bookingService.js, which only
// the already lazy-loaded Confirmation and My Trips pages import. Keeping it in its own
// module means the Firestore SDK's weight is only downloaded when one of those pages is,
// instead of being pulled into every visitor's initial bundle.
export const db = getFirestore(app)
