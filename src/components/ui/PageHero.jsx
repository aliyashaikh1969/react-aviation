import { BsAirplaneFill } from 'react-icons/bs'

// Dark gradient banner at the top of a page.
// `overlap` leaves room for a card row that overlaps the banner (see MyTripsPage).
export const PageHero = ({ title, subtitle, eyebrow, topSlot, children, overlap = false, maxWidth = 'max-w-7xl' }) => (
  <div
    className={`relative overflow-hidden bg-gradient-to-br from-[#0A2647] via-[#0d305a] to-[#144272] text-white px-4 sm:px-8 lg:px-16
      ${overlap ? 'pt-14 pb-24' : 'py-14'}`}
  >
    <BsAirplaneFill className="absolute -right-10 -top-6 text-white/5 rotate-45" size={260} aria-hidden="true" />

    <div className={`relative mx-auto ${maxWidth}`}>
      {topSlot}
      {eyebrow && <p className="text-[#56B6C6] text-sm font-medium uppercase tracking-wide">{eyebrow}</p>}
      <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
      {subtitle && <p className="text-blue-100 text-lg">{subtitle}</p>}
      {children}
    </div>
  </div>
)
