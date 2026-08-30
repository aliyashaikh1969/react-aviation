import { createContext, useContext, useEffect, useState } from "react"
import { auth, googleProvider } from "../firebase/config"
import {onAuthStateChanged,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,updateProfile,sendPasswordResetEmail,} from "firebase/auth"

const AuthContext = createContext()

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

  // ✅ Signup
  const signUp = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    setUser({ ...result.user, displayName: name })
    return result.user
  }

  // ✅ Login
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }

  // ✅ Google Login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  }

  // ✅ Forgot Password
  const forgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
  }

  // ✅ Logout
  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      login,
      googleLogin,
      forgotPassword,
      logout,
      isLoggedIn: !!user,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)