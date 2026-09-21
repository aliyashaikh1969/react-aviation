import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, sendPasswordResetEmail } from "firebase/auth"
import { auth, googleProvider } from "../services/firebase"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signUp = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    setUser({ ...result.user, displayName: name })
    return result.user
  }

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }

  const googleLogin = async () => {
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
      {!loading && children}
    </AuthContext.Provider>
  )
}
