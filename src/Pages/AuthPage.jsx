import React, { useState } from "react";

import {
  FiMail,
  FiLock,
  FiUser,
  FiShield,
  FiCalendar,
  FiHeadphones,
  FiTag,
  FiEyeOff,
  FiEye,
} from "react-icons/fi";

import {
  FcGoogle,
} from "react-icons/fc";

import {
  FaApple,
  FaPlane,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { Features } from "../components/Features/Features";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthPage = () => {


  const [activeTab, setActiveTab] = useState("login");
  const { authData, setAuthData } = useAuth()

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;
    console.log(name, value, checked, type)
    setAuthData({
      ...authData, [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "signup") {

      // Empty fields check

      if (
        !authData.name ||
        !authData.email ||
        !authData.password ||
        !authData.confirmPassword
      ) {
        alert("Please fill all fields");
        return;
      }

      // Password match check

      if (authData.password !== authData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Save user

      const userData = {
        name: authData.name,
        email: authData.email,
        password: authData.password,
        remember: authData.remember,
        isLoggedIn: true,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setAuthData(userData);

toast.success("Login Successful");
      navigate("/")

    } else {

      // LOGIN

      const savedUser =
        JSON.parse(localStorage.getItem("user"));

      if (!savedUser) {
        toast.error("user not found")
      
        return;
      }

      if (
        authData.email === savedUser.email &&
        authData.password === savedUser.password
      ) {

        setAuthData({
          ...savedUser,
          isLoggedIn: true,
        });

  toast.success("Login Successful");
        navigate('/')
      } else {
toast.error("Invalid Email or Password");      }
    }
  };


  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* ================= MAIN ================= */}

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Auth Card */}

        <div className="bg-white rounded-[28px] overflow-hidden border border-slate-200 shadow-sm grid lg:grid-cols-[420px_1fr]">

          {/* LEFT SIDE */}

          <div className="relative bg-gradient-to-br from-[#001B5E] via-[#002B8A] to-[#0A58FF] text-white p-10 flex flex-col justify-between">

            {/* Glow */}

            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <h1 className="text-5xl font-bold leading-tight">
                Welcome Back!
              </h1>

              <p className="mt-6 text-blue-100 text-lg leading-8 max-w-sm">
                Login to manage your bookings,
                explore exclusive deals and
                enjoy a seamless travel experience.
              </p>

              {/* Features */}

              <div className="mt-12 space-y-7">

                {/* Item */}

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                    <FiTag className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Best Flight Deals
                    </h3>

                    <p className="text-blue-100 text-sm mt-1 leading-6">
                      Get access to exclusive offers and discounts.
                    </p>
                  </div>
                </div>

                {/* Item */}

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                    <FiCalendar className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Easy Booking
                    </h3>

                    <p className="text-blue-100 text-sm mt-1 leading-6">
                      Book your flights in just a few simple steps.
                    </p>
                  </div>
                </div>

                {/* Item */}

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                    <FiShield className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Safe & Secure
                    </h3>

                    <p className="text-blue-100 text-sm mt-1 leading-6">
                      Your data is 100% safe and protected with us.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plane */}

            {/* <div className="relative z-10 hidden lg:flex justify-end mt-10">

              <div className="w-52 h-52 rounded-full bg-white/10 flex items-center justify-center backdrop-blur">
                <FaPlane className="text-[110px] rotate-45 text-white" />
              </div>
            </div> */}
          </div>

          {/* RIGHT SIDE */}

          <div className="p-8 lg:p-12">

            {/* Tabs */}

            <div className="grid grid-cols-2 border-b border-slate-200">

              <button
                onClick={() => setActiveTab("login")}
                className={`h-14 text-lg font-semibold transition-all border-b-2 flex items-center justify-center gap-2 ${activeTab === "login"
                  ? "border-[#0A58FF] text-[#0A58FF]"
                  : "border-transparent text-slate-500"
                  }`}
              >
                <FiUser />

                Login
              </button>

              <button
                onClick={() => setActiveTab("signup")}
                className={`h-14 text-lg font-semibold transition-all border-b-2 flex items-center justify-center gap-2 ${activeTab === "signup"
                  ? "border-[#0A58FF] text-[#0A58FF]"
                  : "border-transparent text-slate-500"
                  }`}
              >
                <FiUser />

                Sign Up
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-10">

              <div className="text-center">

                <h2 className="text-3xl font-bold text-[#0A2A6B]">
                  {activeTab === "login"
                    ? "Login to Your Account"
                    : "Create Your Account"}
                </h2>

                <p className="text-slate-500 mt-3">
                  {activeTab === "login"
                    ? "Enter your details to login to your account"
                    : "Sign up and start booking flights easily"}
                </p>
              </div>

              {/* Signup Name */}

              {activeTab === "signup" && (
                <div className="mt-8">
                  <label className="text-sm font-medium text-slate-600">
                    Full Name
                  </label>

                  <div className="mt-2 relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                    <input
                      name="name"
                      type="text"
                      value={authData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-[#0A58FF]"
                    />
                  </div>
                </div>
              )}

              {/* Email */}

              <div className="mt-6">
                <label className="text-sm font-medium text-slate-600">
                  Email Address
                </label>

                <div className="mt-2 relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                  <input
                    name="email"
                    type="email"
                    value={authData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-[#0A58FF]"
                  />
                </div>
              </div>

              {/* Password */}

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-600">
                    Password
                  </label>

                  {activeTab === "login" && (
                    <button className="text-sm text-[#0A58FF] font-medium hover:underline">
                      Forgot Password?
                    </button>
                  )}
                </div>

                <div className="mt-2 relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                  <input
                    name="password"
                    value={authData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-[#0A58FF]"
                  />

                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              {activeTab === "signup" && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-slate-600">
                    Confirm Password
                  </label>

                  <div className="mt-2 relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                    <input
                      name="confirmPassword"
                      value={authData.confirmPassword}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-[#0A58FF]"
                    />

                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember */}

              <div className="flex items-center justify-between mt-6">

                <label className="flex items-center gap-3 text-slate-600 text-sm">
                  <input type="checkbox" className="w-4 h-4" name="remember" checked={authData.remember} onChange={handleChange} />

                  Remember Me
                </label>

                {activeTab === "signup" && (
                  <p className="text-sm text-slate-500">
                    By signing up you agree to our terms.
                  </p>
                )}
              </div>

              {/* Button */}

              <button className="w-full h-14 rounded-2xl bg-[#001B5E] hover:bg-[#001447] transition-all text-white font-semibold text-lg mt-8 shadow-lg shadow-blue-100">
                {activeTab === "login" ? "Login" : "Create Account"}
              </button>

              {/* Divider */}

              <div className="flex items-center gap-4 my-8">

                <div className="h-px bg-slate-200 flex-1"></div>

                <span className="text-slate-400 text-sm">
                  or continue with
                </span>

                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              {/* Social */}

              <div className="grid sm:grid-cols-2 gap-4">

                <button className="h-14 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 font-medium">
                  <FcGoogle className="text-2xl" />

                  Continue with Google
                </button>

                <button className="h-14 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 font-medium">
                  <FaApple className="text-xl" />

                  Continue with Apple
                </button>
              </div>

              {/* Bottom */}

              <p className="text-center text-slate-500 mt-8">

                {activeTab === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      activeTab === "login" ? "signup" : "login"
                    )
                  }
                  className="ml-2 text-[#0A58FF] font-semibold hover:underline"
                >
                  {activeTab === "login" ? "Sign up" : "Login"}
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