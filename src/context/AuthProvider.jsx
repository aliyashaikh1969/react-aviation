import { useEffect, useState } from "react"
import {
  onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, updateProfile, sendPasswordResetEmail,
  setPersistence, browserLocalPersistence, browserSessionPersistence,
} from "firebase/auth"
import { auth, googleProvider } from "../services/firebase"
import { AuthContext } from "./AuthContext"

// "Remember me" (default on, to match how the app behaved before this was wired up):
// checked -> session survives closing the browser; unchecked -> logged out when the tab closes.
const applyPersistence = (remember) =>
  setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
        setLoading(false)
      },
      (error) => {
        // Don't leave every protected page spinning forever if the persisted session can't be read.
        console.error("Auth state error:", error)
        setUser(null)
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [])

  const signUp = async (name, email, password, remember = true) => {
    await applyPersistence(remember)
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    // updateProfile mutates the signed-in user in place; re-read it instead of
    // hand-building a plain object, which would drop its prototype methods.
    setUser(auth.currentUser)
    return result.user
  }

  const login = async (email, password, remember = true) => {
    await applyPersistence(remember)
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }

  const googleLogin = async (remember = true) => {
    await applyPersistence(remember)
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  }

  const forgotPassword = (email) => sendPasswordResetEmail(auth, email)

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, login, googleLogin, forgotPassword, logout, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
