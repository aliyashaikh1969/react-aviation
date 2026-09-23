// Label + optional hint above a form control, with an inline error below it.
// The control is nested inside the <label> (not just placed near it) so a screen reader
// announces the label when the control gets focus, and clicking the label text focuses it.
export const Field = ({ label, hint, error, children }) => (
  <div>
    <label className="block">
      <span className="text-sm font-medium text-slate-600 block mb-1.5">
        {label}
        {hint && <span className="text-slate-400 font-normal"> {hint}</span>}
      </span>
      {children}
    </label>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)
