import { useEffect, useRef, useState } from "react";
import logo from "../../assets/aviation-logo.webp";
import { GrLanguage } from "react-icons/gr";
import { IoMenuOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut, FiBriefcase, FiChevronDown } from "react-icons/fi";
import toast from "react-hot-toast";
import { ROUTES } from '../../constants/routes'

const navItems = [
  { name: "Home", path: ROUTES.home },
  { name: "My Trips", path: ROUTES.myTrips },
  { name: "Deals", path: ROUTES.deals },
  { name: "Contact", path: ROUTES.contact },
];

const Avatar = ({ user, size = "w-9 h-9" }) =>
  user?.photoURL ? (
    <img
      src={user.photoURL}
      referrerPolicy="no-referrer"
      className={`${size} rounded-full object-cover`}
      alt=""
    />
  ) : (
    <div className={`${size} rounded-full bg-white text-[#031e3d] flex items-center justify-center font-semibold`}>
      {user?.displayName?.charAt(0).toUpperCase() ?? "U"}
    </div>
  );

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // close the profile dropdown on outside click / Escape
  useEffect(() => {
    if (!profileOpen) return;
    const onClick = (e) => {
      if (!profileRef.current?.contains(e.target)) setProfileOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  // stop the page scrolling behind the full-screen mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      setProfileOpen(false);
      setOpen(false);
      navigate(ROUTES.home);
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Couldn't log out. Please try again.");
    }
  };

  const loginLinkClass = ({ isActive }) =>
    `border border-white/30 px-5 py-2 rounded-xl text-sm font-medium transition-colors
    ${isActive ? "bg-white text-[#031e3d]" : "hover:bg-white hover:text-[#031e3d]"}`;

  return (
    <nav className="bg-[#031e3d]/95 text-white w-full sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-5 md:px-14 h-20">

        {/* LOGO */}
        <Link to={ROUTES.home} className="z-50 shrink-0" aria-label="SkyAero home">
          <img src={logo} alt="SkyAero" className="w-36 md:w-40" />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide transition-opacity duration-300 py-1
                  ${isActive ? "opacity-100 after:w-full" : "opacity-60 hover:opacity-100"}
                  after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                  after:h-[2px] after:w-0 after:bg-[#56B6C6] after:transition-all
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
          <div className="flex items-center text-sm opacity-80">
            <GrLanguage />
            <span className="ml-2">EN</span>
          </div>

          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-3 border border-white/20 pl-2 pr-4 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Avatar user={user} />
                <span className="text-sm font-medium">
                  {user?.displayName?.split(" ")[0] ?? "User"}
                </span>
                <FiChevronDown className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 bg-white text-[#031e3d] rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
                >
                  <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
                    <h3 className="font-semibold truncate">{user?.displayName ?? "User"}</h3>
                    <p className="text-sm text-slate-500 mt-0.5 truncate">{user?.email}</p>
                  </div>

                  <div className="p-2">
                    <NavLink
                      to={ROUTES.myTrips}
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm"
                    >
                      <FiBriefcase />
                      My Trips
                    </NavLink>

                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition-colors text-sm cursor-pointer"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink to={ROUTES.login} className={loginLinkClass}>
              Login / Sign Up
            </NavLink>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl z-50 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <IoIosClose /> : <IoMenuOutline />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed inset-0 bg-[#031e3d] transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8 text-xl">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `transition-opacity ${isActive ? "opacity-100 border-b-2 border-[#56B6C6] pb-1" : "opacity-70"}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          <li className="flex items-center gap-2 text-sm opacity-70">
            <GrLanguage />
            <span>EN</span>
          </li>

          <li>
            {isLoggedIn ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <Avatar user={user} size="w-10 h-10" />
                  <span className="text-sm">{user?.displayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="border border-red-400 px-5 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to={ROUTES.login} onClick={() => setOpen(false)} className={`${loginLinkClass} text-base`}>
                Login / Sign Up
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
