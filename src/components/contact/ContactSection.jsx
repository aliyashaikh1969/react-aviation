import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiMail, FiMapPin, FiMessageCircle, FiPhoneCall, FiSend } from 'react-icons/fi'

const contactInfo = [
  { icon: FiPhoneCall, title: "Call us", info: "+91 98765 43210", subInfo: "Mon – Sun | 24/7", href: "tel:+919876543210" },
  { icon: FiMail, title: "Email us", info: "support@skybook.com", subInfo: "We reply within 30 minutes", href: "mailto:support@skybook.com" },
  { icon: FiMessageCircle, title: "Live chat", info: "Chat with our support team", subInfo: "Available 24/7" },
  { icon: FiMapPin, title: "Visit us", info: "SkyAero Corporate Office", subInfo: "Noida, Uttar Pradesh – 201309" },
];

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" }

const inputClass =
  "w-full h-14 rounded-2xl border border-slate-300 px-5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"

export const ContactSection = () => {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === "phone" ? value.replace(/[^\d+\s-]/g, "") : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = "Please enter your name"
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email"
    if (!form.message.trim()) next.message = "Please write a message"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending || !validate()) return

    setSending(true)
    // no backend yet: acknowledge the message
    await new Promise(resolve => setTimeout(resolve, 800))
    setSending(false)
    setForm(emptyForm)
    toast.success("Thanks! We'll get back to you shortly.")
  }

  const field = (name, placeholder, props = {}) => (
    <div>
      <input
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`${inputClass} ${errors[name] ? "border-red-400" : ""}`}
        {...props}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid lg:grid-cols-[360px_1fr]">

        {/* Info */}
        <div className="p-6 sm:p-8 lg:border-r border-b lg:border-b-0 border-slate-200 bg-slate-50/50">
          <h2 className="text-3xl font-bold text-[#0A2A6B]">Get in touch</h2>
          <p className="text-slate-500 mt-2 leading-7">Our team is here to help you anytime.</p>

          <div className="space-y-6 mt-8">
            {contactInfo.map(({ icon: Icon, title, info, subInfo, href }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shrink-0">
                  <Icon />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-[#0A2A6B]">{title}</h3>
                  {href ? (
                    <a href={href} className="text-slate-700 hover:text-blue-700 break-words">{info}</a>
                  ) : (
                    <p className="text-slate-700">{info}</p>
                  )}
                  <p className="text-slate-500 mt-0.5 text-sm">{subInfo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-[#0A2A6B]">Send us a message</h2>
          <p className="text-slate-500 mt-2 leading-7">Fill out the form below and we’ll get back to you shortly.</p>

          <form className="mt-8" onSubmit={handleSubmit} noValidate>
            <div className="grid md:grid-cols-2 gap-5">
              {field("name", "Full name", { type: "text", autoComplete: "name" })}
              {field("email", "Email address", { type: "email", autoComplete: "email" })}
              {field("phone", "Phone number (optional)", { type: "tel", autoComplete: "tel" })}
              {field("subject", "Subject", { type: "text" })}
            </div>

            <div className="mt-5">
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                aria-label="Your message"
                className={`w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition resize-none ${errors.message ? "border-red-400" : ""}`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 h-14 px-8 rounded-2xl bg-[#0A2A6B] hover:bg-[#081f52] disabled:opacity-70 transition-all text-white font-semibold flex items-center gap-3 cursor-pointer"
            >
              <FiSend />
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
