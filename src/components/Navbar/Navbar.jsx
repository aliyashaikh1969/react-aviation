import { useState } from "react";
import logo from "../../assets/aviation-logo.png";
import { GrLanguage } from "react-icons/gr";
import { IoMenuOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiUser, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ✅ Firebase user
  const { user, logout, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "My Trips", path: "/myTrips" },
    { name: "Deals", path: "/deals" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out!")
    setProfileOpen(false)
    setOpen(false)
    navigate("/")
  }

  return (
    <nav className="bg-[#031e3d] text-white w-full sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between px-5 md:px-14 h-20">

        {/* LOGO */}
        <div className="z-50">
          <img src={logo} alt="logo" className="w-36 md:w-40" />
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide transition-all duration-300
                  ${isActive ? "opacity-100 after:w-full" : "opacity-60 hover:opacity-100"}
                  after:content-[''] after:absolute after:left-0 after:bottom-[-6px]
                  after:h-[2px] after:w-0 after:bg-white after:transition-all
                  after:duration-300 hover:after:w-full`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center text-sm">
            <GrLanguage />
            <span className="ml-2">EN</span>
          </div>

          <div className="relative">
            {isLoggedIn ? (
              <div>
                {/* PROFILE BUTTON */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 border border-white/20 px-4 py-2 rounded-2xl hover:bg-white hover:text-[#031e3d] transition-all duration-300"
                >
                  {/* ✅ Google photo ya initials */}
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="w-9 h-9 rounded-full object-cover"
                      alt={user.displayName}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white text-[#031e3d] flex items-center justify-center font-semibold">
                      {user?.displayName?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium">
                    {/* ✅ Sirf first name */}
                    {user?.displayName?.split(" ")[0] ?? "User"}
                  </span>
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white text-[#031e3d] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 z-50">

                    {/* TOP */}
                    <div className="px-5 py-4 border-b border-slate-100">
                      <h3 className="font-semibold">
                        {user?.displayName ?? "User"}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {user?.email}
                      </p>
                    </div>

                    {/* MENU */}
                    <div className="p-2">
                      <NavLink
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-all text-sm"
                      >
                        <FiUser />
                        My Profile
                      </NavLink>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition-all text-sm"
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/AuthPage"
                className={({ isActive }) =>
                  `border border-white/30 px-4 py-2 rounded-xl text-sm transition-all duration-300
                  ${isActive ? "bg-white text-[#031e3d]" : "hover:bg-white hover:text-[#031e3d]"}`
                }
              >
                Login / Sign Up
              </NavLink>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div
          className="md:hidden text-3xl z-50 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <IoIosClose /> : <IoMenuOutline />}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-[#031e3d] transition-all duration-500 overflow-hidden
          ${open ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"}`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-10 text-lg">
          {navItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? "opacity-100" : "opacity-70"}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          <div className="flex items-center gap-2">
            <GrLanguage />
            <span>EN</span>
          </div>

          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-3">
              {/* ✅ Mobile pe bhi user info */}
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white text-[#031e3d] flex items-center justify-center font-semibold">
                    {user?.displayName?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}
                <span className="text-sm">{user?.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="border border-red-400 px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                <FiLogOut className="inline mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/AuthPage"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border border-white/30 px-4 py-2 rounded-xl text-sm transition-all duration-300
                ${isActive ? "bg-white text-[#031e3d]" : "hover:bg-white hover:text-[#031e3d]"}`
              }
            >
              Login / Sign Up
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};