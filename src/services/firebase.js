import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { env } from "../config/env"

// Auth is needed on every page (AuthProvider wraps the whole app), so it's initialized
// here eagerly. Firestore is only needed by booking save/read, which only happens on
// already lazy-loaded pages (Confirmation, My Trips) -- see firestore.js -- so it's kept
// out of this module to keep it out of the main bundle too.
const app = initializeApp(env.firebase)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export { app }
