// Label + optional hint above a form control, with an inline error below it.
export const Field = ({ label, hint, error, children }) => (
  <div>
    <label className="text-sm font-medium text-slate-600 block mb-1.5">
      {label}
      {hint && <span className="text-slate-400 font-normal"> {hint}</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)
