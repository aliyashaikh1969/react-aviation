import { BsAirplaneFill } from 'react-icons/bs'

// Centered "nothing here" card with an optional action button.
export const EmptyState = ({ title, text, action, className = '' }) => (
  <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-3 py-14 px-6 ${className}`}>
    <div className="w-16 h-16 rounded-full bg-[#031e3d]/5 flex items-center justify-center">
      <BsAirplaneFill className="text-[#031e3d] -rotate-45 text-2xl" />
    </div>
    <h2 className="text-xl md:text-2xl font-semibold text-[#031e3d]">{title}</h2>
    {text && <p className="text-slate-500 text-sm md:text-base max-w-sm">{text}</p>}
    {action}
  </div>
)
