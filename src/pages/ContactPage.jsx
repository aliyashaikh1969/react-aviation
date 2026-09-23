import { useState } from 'react'
import { FiChevronDown, FiHome } from "react-icons/fi";
import { ContactSection } from '../components/contact/ContactSection';
import { PageHero } from '../components/ui/PageHero'
import { FeatureHighlights } from '../components/common/FeatureHighlights';

const faqs = [
  {
    q: "How can I book a flight on SkyAero?",
    a: "Enter your route and travel date on the home page, choose a flight, pick your seats, add passenger details and pay. Your e-ticket is available right after payment.",
  },
  {
    q: "How do I get a refund?",
    a: "Cancel the booking from My Trips. Refunds follow the fare rules of the airline and are returned to the original payment method.",
  },
  {
    q: "Can I cancel or change my booking?",
    a: "You can cancel an upcoming booking from My Trips. Changes and fees depend on the airline's policy for your fare.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. Payment details are encrypted in transit and we never share them with third parties.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Credit and debit cards (Visa, Mastercard, RuPay), UPI, net banking and popular wallets.",
  },
  {
    q: "How can I contact customer support?",
    a: "Call or email us using the details above, or send a message with the form. Our team is available 24/7.",
  },
];

const offices = [
  { country: "India (Head Office)", city: "Noida, Uttar Pradesh", phone: "+91 98765 43210" },
  { country: "USA Office", city: "New York, NY 10001", phone: "+1 (212) 555-0189" },
  { country: "UK Office", city: "London, EC2A 4NE", phone: "+44 20 7946 0958" },
  { country: "UAE Office", city: "Dubai, UAE", phone: "+971 4 123 4567" },
];

export const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className='min-h-screen'>
      <PageHero title="Contact us" subtitle="Questions about a booking? We're here to help, 24/7." />

      <div className="bg-[#F7F9FC] pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-5">

          <ContactSection />
          

          {/* FAQ */}
          <div className="mt-14 bg-white rounded-3xl border border-slate-200 p-5 sm:p-8">
            <h2 className="text-3xl font-bold text-navy mb-6">Frequently asked questions</h2>

            <div className="grid md:grid-cols-2 gap-4 items-start">
              {faqs.map((faq, index) => {
                const open = openFaq === index
                return (
                  <div key={faq.q} className="rounded-2xl border border-slate-200 bg-[#FAFBFD] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : index)}
                      aria-expanded={open}
                      className="w-full min-h-16 hover:bg-slate-50 transition-colors px-5 py-3 flex items-center justify-between gap-3 text-left cursor-pointer"
                    >
                      <span className="font-medium text-navy">{faq.q}</span>
                      <FiChevronDown className={`text-slate-500 text-lg shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && <p className="px-5 pb-4 text-sm text-slate-600 leading-6">{faq.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Offices */}
          <div className="mt-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-navy">Our offices</h2>
              <p className="text-slate-500 mt-2 text-lg">We have a global presence to assist you better.</p>
            </div>

            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 mt-8">
              {offices.map((office) => (
                <div
                  key={office.country}
                  className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl">
                    <FiHome />
                  </div>
                  <h3 className="text-xl font-bold text-navy mt-5">{office.country}</h3>
                  <p className="text-slate-500 mt-2">{office.city}</p>
                  <a
                    href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
                    className="text-slate-700 mt-4 font-medium block hover:text-blue-700"
                  >
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FeatureHighlights />
      </div>
    </div>
  )
}
