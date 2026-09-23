import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import {
  onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, updateProfile, sendPasswordResetEmail,
  setPersistence, browserLocalPersistence, browserSessionPersistence,
} from "firebase/auth"
import { auth, googleProvider } from "../services/firebase"

// eslint-disable-next-line react-refresh/only-export-components -- context and provider live together on purpose
export const AuthContext = createContext(null)

// remember me checked -> stay logged in after closing the browser, unchecked -> logged out
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
        console.error("Auth state error:", error)
        setUser(null)
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [])

  // None of these close over any render-scoped value (just stable setters + module-level
  // Firebase singletons), so they can stay stable across every render.
  const signUp = useCallback(async (name, email, password, remember = true) => {
    await applyPersistence(remember)
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    setUser(auth.currentUser)
    return result.user
  }, [])

  const login = useCallback(async (email, password, remember = true) => {
    await applyPersistence(remember)
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }, [])

  const googleLogin = useCallback(async (remember = true) => {
    await applyPersistence(remember)
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  }, [])

  const forgotPassword = useCallback((email) => sendPasswordResetEmail(auth, email), [])

  const logout = useCallback(async () => {
    await signOut(auth)
    setUser(null)
  }, [])

  // Memoized so consumers only re-render when the auth state itself actually changes.
  const value = useMemo(
    () => ({ user, loading, signUp, login, googleLogin, forgotPassword, logout, isLoggedIn: !!user }),
    [user, loading, signUp, login, googleLogin, forgotPassword, logout]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
