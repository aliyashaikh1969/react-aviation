import { useState } from "react";
import { FiMail, FiLock, FiUser, FiShield, FiCalendar, FiTag, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ROUTES } from '../constants/routes'
import { PageLoader } from '../components/ui/PageLoader'

const perks = [
  { icon: FiTag, title: "Best flight deals", text: "Get access to exclusive offers and discounts." },
  { icon: FiCalendar, title: "Easy booking", text: "Book your flights in just a few simple steps." },
  { icon: FiShield, title: "Safe & secure", text: "Your data is protected with us." },
];

// user-not-found and wrong-password share one message so we don't give away
// which part was wrong
const authErrors = {
  "auth/user-not-found": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/user-disabled": "This account has been disabled. Please contact support.",
  "auth/email-already-in-use": "This email is already registered. Please log in.",
  "auth/weak-password": "Please choose a stronger password.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/popup-closed-by-user": "The sign-in window was closed.",
  "auth/cancelled-popup-request": "Only one sign-in window can be open at a time.",
  "auth/popup-blocked": "Your browser blocked the sign-in window. Please allow pop-ups and try again.",
}

const RESET_EMAIL_SENT_MESSAGE = "If an account exists for that email, we've sent a reset link."

const inputClass =
  "w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-[#0A58FF] focus:ring-4 focus:ring-blue-100 transition"

const Field = ({ label, icon: Icon, action, children }) => (
  <div>
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      {action}
    </div>
    <div className="mt-2 relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
      {children}
    </div>
  </div>
)

const passwordStrength = (pw) => {
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++
  return score
}
const strengthMeta = [
  { label: "Too short", color: "bg-red-400" },
  { label: "Weak", color: "bg-red-400" },
  { label: "Fair", color: "bg-amber-400" },
  { label: "Good", color: "bg-green-400" },
  { label: "Strong", color: "bg-green-500" },
]

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { user, loading: authLoading, login, signUp, googleLogin, forgotPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: true,
  })

  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname ?? ROUTES.home

  // already signed in -- nothing to do on a login/signup page
  if (authLoading) return <PageLoader />
  if (user) return <Navigate to={redirectTo} replace />
  const isLogin = activeTab === "login"

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    if (isLogin) {
      if (!formData.email || !formData.password) return toast.error("Please fill all fields")
    } else {
      if (!formData.name.trim() || !formData.email || !formData.password || !formData.confirmPassword) {
        return toast.error("Please fill all fields")
      }
      if (formData.password !== formData.confirmPassword) return toast.error("Passwords do not match")
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")
    }

    setLoading(true)
    try {
      if (isLogin) {
        await login(formData.email, formData.password, formData.remember)
        toast.success("Welcome back! ✈️")
      } else {
        await signUp(formData.name.trim(), formData.email, formData.password, formData.remember)
        toast.success("Account created! Welcome to SkyAero ✈️")
      }
      navigate(redirectTo, { replace: true })
    } catch (err) {
      toast.error(authErrors[err.code] ?? "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    if (loading) return
    setLoading(true)
    try {
      await googleLogin(formData.remember)
      toast.success("Welcome back! ✈️")
      navigate(redirectTo, { replace: true })
    } catch (err) {
      toast.error(authErrors[err.code] ?? "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (resetting) return
    if (!formData.email) return toast.error("Enter your email first")

    setResetting(true)
    try {
      await forgotPassword(formData.email)
      toast.success(RESET_EMAIL_SENT_MESSAGE)
    } catch (err) {
      // show the same message either way, whether or not the email has an account
      if (err.code === "auth/user-not-found") {
        toast.success(RESET_EMAIL_SENT_MESSAGE)
      } else {
        toast.error(authErrors[err.code] ?? "Couldn't send the reset email. Please try again.")
      }
    } finally {
      setResetting(false)
    }
  }

  const strength = passwordStrength(formData.password)

  const eyeToggle = (
    <button
      type="button"
      onClick={() => setShowPassword(v => !v)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
    >
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </button>
  )

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">

        <div className="bg-white rounded-[28px] overflow-hidden border border-slate-200 shadow-sm grid lg:grid-cols-[400px_1fr]">

          {/* Left */}
          <div className="relative bg-gradient-to-br from-[#001B5E] via-[#002B8A] to-[#0A58FF] text-white p-6 sm:p-8 lg:p-10 flex flex-col">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {isLogin ? "Welcome back!" : "Join SkyAero"}
              </h1>
              <p className="mt-3 lg:mt-5 text-blue-100 leading-7 max-w-sm">
                {isLogin
                  ? "Log in to manage your bookings, explore exclusive deals and enjoy a seamless travel experience."
                  : "Create an account to book flights faster and keep all your trips in one place."}
              </p>

              <div className="hidden lg:block mt-10 space-y-6">
                {perks.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-blue-100 text-sm mt-1 leading-6">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="p-6 sm:p-8 lg:p-12">

            <div className="grid grid-cols-2 border-b border-slate-200" role="tablist">
              {[["login", "Login"], ["signup", "Sign up"]].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => setActiveTab(key)}
                  className={`h-14 text-lg font-semibold transition-all border-b-2 flex items-center justify-center gap-2 cursor-pointer
                    ${activeTab === key ? "border-[#0A58FF] text-[#0A58FF]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                  <FiUser />
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-8" noValidate>

              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy">
                  {isLogin ? "Login to your account" : "Create your account"}
                </h2>
                <p className="text-slate-500 mt-2">
                  {isLogin ? "Enter your details to continue" : "Sign up and start booking flights easily"}
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {!isLogin && (
                  <Field label="Full name" icon={FiUser}>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </Field>
                )}

                <Field label="Email address" icon={FiMail}>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </Field>

                <div>
                  <Field
                    label="Password"
                    icon={FiLock}
                    action={isLogin && (
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={resetting}
                        className="text-sm text-[#0A58FF] font-medium hover:underline disabled:opacity-60 disabled:no-underline disabled:cursor-not-allowed cursor-pointer"
                      >
                        {resetting ? "Sending…" : "Forgot password?"}
                      </button>
                    )}
                  >
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      placeholder="Enter your password"
                      className={`${inputClass} pr-12`}
                    />
                    {eyeToggle}
                  </Field>

                  {!isLogin && formData.password && (
                    <div className="mt-2 flex items-center gap-3" aria-live="polite">
                      <div className="flex-1 grid grid-cols-4 gap-1.5">
                        {[1, 2, 3, 4].map(i => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full ${strength >= i ? strengthMeta[strength].color : "bg-slate-200"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 w-14 text-right">{strengthMeta[strength].label}</span>
                    </div>
                  )}
                </div>

                {!isLogin && (
                  <Field label="Confirm password" icon={FiLock}>
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      className={`${inputClass} pr-12 ${formData.confirmPassword && formData.confirmPassword !== formData.password ? "border-red-400" : ""}`}
                    />
                    {eyeToggle}
                  </Field>
                )}
              </div>

              <div className="flex items-center justify-between mt-5 gap-3 flex-wrap">
                <label className="flex items-center gap-2.5 text-slate-600 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#001B5E]"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  Remember me
                </label>

                {!isLogin && (
                  <p className="text-xs text-slate-500">By signing up you agree to our terms.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#001B5E] hover:bg-[#001447] disabled:opacity-70 disabled:cursor-not-allowed transition-all text-white font-semibold text-lg mt-7 shadow-lg shadow-blue-100 flex items-center justify-center gap-3 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    Please wait…
                  </>
                ) : isLogin ? "Login" : "Create account"}
              </button>

              <div className="flex items-center gap-4 my-7">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-slate-400 text-sm">or continue with</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                  className="h-14 rounded-2xl border border-slate-200 hover:bg-slate-50 disabled:opacity-60 transition-all flex items-center justify-center gap-3 font-medium cursor-pointer"
                >
                  <FcGoogle className="text-2xl" />
                  Continue with Google
                </button>

                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  className="h-14 rounded-2xl border border-slate-200 opacity-50 cursor-not-allowed flex items-center justify-center gap-3 font-medium"
                >
                  <FaApple className="text-xl" />
                  Apple · soon
                </button>
              </div>

              <p className="text-center text-slate-500 mt-7">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setActiveTab(isLogin ? "signup" : "login")}
                  className="ml-2 text-[#0A58FF] font-semibold hover:underline cursor-pointer"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
