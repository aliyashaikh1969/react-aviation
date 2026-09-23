import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiMapPin, FiGlobe, FiCalendar, FiTag, FiPercent, FiClock, FiCopy } from "react-icons/fi";
import toast from 'react-hot-toast'
import { useFlight } from '../hooks/useFlight'
import { getIataCode } from '../utils/airports'
import { useEmailSubscribe } from '../hooks/useEmailSubscribe'
import { PageHero } from '../components/ui/PageHero'
import { ROUTES } from '../constants/routes'
import { inr, formatDate } from '../utils/format'

// static sample fares; live prices are shown in the search results
const topDeals = [
  {
    id: 1, from: "Delhi", to: "Mumbai", price: 3299, oldPrice: 4199, duration: "2h 15m",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
    couponCode: "FIRST100", validTill: "2026-12-31",
  },
  {
    id: 2, from: "Bangalore", to: "Goa", price: 2799, oldPrice: 3299, duration: "1h 25m",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
    couponCode: "WELCOME150", validTill: "2026-11-30",
  },
  {
    id: 3, from: "Hyderabad", to: "Chennai", price: 3799, oldPrice: 3899, duration: "1h 30m",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    couponCode: "FLY10", validTill: "2026-12-15",
  },
  {
    id: 4, from: "Kolkata", to: "Delhi", price: 3999, oldPrice: 4499, duration: "2h 20m",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
    couponCode: "SAVE500", validTill: "2026-12-31",
  },
];

const categories = [
  { title: "Domestic deals", desc: "Best offers across India", icon: FiMapPin, bg: "bg-blue-600" },
  { title: "International deals", desc: "Fly across the world", icon: FiGlobe, bg: "bg-green-600" },
  { title: "Weekend getaways", desc: "Short trips, big savings", icon: FiCalendar, bg: "bg-purple-600" },
  { title: "Seasonal offers", desc: "Limited time mega offers", icon: FiTag, bg: "bg-orange-500" },
];

// international trips shown here all depart from Delhi
const destinations = [
  { city: "Dubai", country: "United Arab Emirates", price: 12499, oldPrice: 14699,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    couponCode: "GLOBAL1000", validTill: "2026-12-31" },
  { city: "Singapore", country: "Singapore", price: 10999, oldPrice: 12999,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
    couponCode: "GLOBAL1000", validTill: "2026-12-31" },
  { city: "Bangkok", country: "Thailand", price: 8499, oldPrice: 10399,
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
    couponCode: "SAVE500", validTill: "2026-11-30" },
  { city: "Kuala Lumpur", country: "Malaysia", price: 7499, oldPrice: 8599,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop",
    couponCode: "FLY10", validTill: "2026-12-15" },
  { city: "Maldives", country: "Maldives", price: 15999, oldPrice: 19999,
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
    couponCode: "GLOBAL1000", validTill: "2026-12-31" },
];

// derived from the prices so the badge never disagrees with them
const discountOf = ({ price, oldPrice }) => Math.round((1 - price / oldPrice) * 100)

const DealImage = ({ src, className }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 ${className}`}>
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={(e) => { e.currentTarget.style.display = "none" }}
      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
    />
  </div>
)

const OfferBadge = ({ deal }) => {
  const pct = discountOf(deal)
  if (pct <= 0) return null
  return (
    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
      {pct}% OFF
    </div>
  )
}

const Price = ({ deal, size = "text-3xl" }) => (
  <div className="flex items-end gap-2 flex-wrap">
    <span className="text-slate-500 text-sm">From</span>
    <span className={`${size} font-bold text-blue-700 leading-none`}>{inr(deal.price)}</span>
    <span className="text-slate-400 line-through text-sm">{inr(deal.oldPrice)}</span>
  </div>
)

// Coupon code + validity + Book Now, shared by every deal card.
const CouponFooter = ({ deal, onBook }) => {
  const copyCoupon = async (e) => {
    e.stopPropagation()
    if (!navigator.clipboard) {
      toast.error(`Couldn't copy automatically — the code is ${deal.couponCode}`)
      return
    }
    try {
      await navigator.clipboard.writeText(deal.couponCode)
      toast.success(`Coupon "${deal.couponCode}" copied!`)
    } catch {
      toast.error(`Couldn't copy automatically — the code is ${deal.couponCode}`)
    }
  }

  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 bg-blue-50 border border-dashed border-blue-300 rounded-xl px-3 py-2">
        <span className="font-mono font-bold text-blue-700 text-sm tracking-wide truncate">{deal.couponCode}</span>
        <button
          type="button"
          onClick={copyCoupon}
          className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-white border border-blue-200 rounded-lg px-2.5 py-1.5 hover:bg-blue-100 transition-colors cursor-pointer"
        >
          <FiCopy /> Copy code
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2">Valid till {formatDate(deal.validTill)}</p>

      <button
        onClick={onBook}
        className="mt-4 w-full py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        Book Now <FiArrowRight />
      </button>
    </>
  )
}

export const DealsPage = () => {
  const navigate = useNavigate()
  const { setSearchData, initialSearchData } = useFlight()
  const { email, setEmail, submit: subscribe } = useEmailSubscribe("You're on the list! Deals are on their way.")

  // search a route for a date a week from today; it can be changed on the results page
  const bookRoute = (from, to) => {
    const date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    setSearchData({
      ...initialSearchData,
      from: getIataCode(from),
      to: getIataCode(to),
      date,
    })
    navigate(ROUTES.booking)
  }

  return (
    <div className="bg-[#F7F9FC]">

      <PageHero title="Deals & offers" subtitle="Hand-picked fares on popular routes and destinations." />

      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-12">

        {/* Top flight deals */}
        <section>
          <h2 className="text-3xl font-bold text-navy mb-7">Top flight deals</h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {topDeals.map((deal) => (
              <article
                key={deal.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition duration-300 group flex flex-col"
              >
                <div className="relative">
                  <DealImage src={deal.image} className="h-48" />
                  <OfferBadge deal={deal} />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-navy">{deal.from}</h3>
                    <FiArrowRight className="text-blue-700 shrink-0" />
                    <h3 className="text-xl font-bold text-navy">{deal.to}</h3>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                    <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Non-stop</span>
                    <span className="flex items-center gap-1"><FiClock /> {deal.duration}</span>
                  </div>

                  <div className="mt-5"><Price deal={deal} /></div>

                  <div className="mt-auto">
                    <CouponFooter deal={deal} onBook={() => bookRoute(deal.from, deal.to)} />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Fares shown are indicative. Live prices for your dates appear in the search results.
          </p>
        </section>

        {/* Categories */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-navy mb-7">Deals by category</h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {categories.map(({ title, desc, icon: Icon, bg }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition duration-300 flex items-start gap-4"
              >
                <div className={`w-14 h-14 rounded-2xl ${bg} text-white flex items-center justify-center text-2xl shrink-0`}>
                  <Icon />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{title}</h3>
                  <p className="text-slate-500 mt-1 leading-6 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending destinations */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-navy mb-7">Trending destinations</h2>
          <p className="text-slate-500 -mt-5 mb-7 text-sm">All fares shown are round trips departing from Delhi.</p>

          <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-5">
            {destinations.map((item) => (
              <article
                key={item.city}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition duration-300 group flex flex-col"
              >
                <div className="relative">
                  <DealImage src={item.image} className="h-48" />
                  <OfferBadge deal={item} />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-navy">{item.city}</h3>
                  <p className="text-slate-500 mt-1 text-sm">{item.country}</p>
                  <div className="mt-4"><Price deal={item} size="text-2xl" /></div>

                  <div className="mt-auto">
                    <CouponFooter deal={item} onBook={() => bookRoute("Delhi", item.city)} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Special offer */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-white border border-slate-200 rounded-3xl p-6 sm:p-8">
          <div className="grid lg:grid-cols-[1fr_450px] gap-8 items-center">

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                <FiPercent />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy">Special offers for you!</h2>
                <p className="text-slate-600 mt-2 leading-7">
                  Sign up and get exclusive flight deals, discounts and travel updates in your inbox.
                </p>
              </div>
            </div>

            <form onSubmit={subscribe} noValidate className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="flex-1 h-14 rounded-2xl border border-slate-300 px-5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
              />
              <button
                type="submit"
                className="h-14 px-8 rounded-2xl bg-navy hover:bg-navy-dark transition-colors text-white font-semibold cursor-pointer"
              >
                Get deals
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
