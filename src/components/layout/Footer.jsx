import { Link } from 'react-router-dom'
import apple from '../../assets/apple.webp'
import logo from '../../assets/aviation-logo.webp'
import google from '../../assets/google.webp'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";
import { ROUTES } from '../../constants/routes'

const socials = [
  { label: "Facebook", icon: FiFacebook },
  { label: "Twitter", icon: FiTwitter },
  { label: "Instagram", icon: FiInstagram },
  { label: "YouTube", icon: FiYoutube },
];

const columns = [
  {
    title: "Company",
    links: [
      { name: "About Us", to: "#" },
      { name: "Careers", to: "#" },
      { name: "Press", to: "#" },
      { name: "Blog", to: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", to: "#" },
      { name: "FAQs", to: "#" },
      { name: "Baggage Info", to: "#" },
      { name: "Contact Us", to: ROUTES.contact },
    ],
  },
  {
    title: "Policies",
    links: [
      { name: "Privacy Policy", to: "#" },
      { name: "Terms & Conditions", to: "#" },
      { name: "Cancellation Policy", to: "#" },
      { name: "Refund Policy", to: "#" },
    ],
  },
];

const linkClass = "block text-blue-100/80 hover:text-white hover:translate-x-0.5 transition";

export const Footer = () => {
  return (
    <footer className="bg-[#031e3d] text-white pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-x-6 gap-y-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to={ROUTES.home} aria-label="SkyAero home">
              <img src={logo} alt="SkyAero" className="w-32 h-auto" />
            </Link>

            <p className="text-blue-100/80 text-sm leading-7 mt-5 max-w-[260px]">
              Your trusted travel partner. Book flights, explore destinations and enjoy the best deals.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 hover:bg-white hover:text-[#031e3d] transition-colors flex items-center justify-center"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-base font-semibold mb-5 tracking-wide">{col.title}</h3>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.name}>
                    {l.to.startsWith("/") ? (
                      <Link to={l.to} className={linkClass}>{l.name}</Link>
                    ) : (
                      <a href={l.to} className={linkClass}>{l.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Apps */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-base font-semibold mb-5 tracking-wide">Download our app</h3>
            <div className="flex flex-row lg:flex-col gap-3">
              <img className="w-[140px]" src={google} alt="Get it on Google Play" />
              <img className="w-[140px]" src={apple} alt="Download on the App Store" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 px-4 text-center text-blue-200/70 text-sm">
        © {new Date().getFullYear()} SkyAero Booking. All rights reserved by Aliya.
      </div>
    </footer>
  )
}
