import { useEffect } from 'react'
import { FiUser, FiCalendar, FiChevronDown, FiCheckCircle } from "react-icons/fi";
import { LiaIdCardSolid } from "react-icons/lia";
import { usePassenger } from '../../hooks/usePassenger';
import { useFlight } from '../../hooks/useFlight';
import { Field } from '../ui/Field';

const inputBase =
  "text-sm w-full h-12 px-4 rounded-xl border outline-none bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"

const TextField = ({ label, error, icon, ...props }) => (
  <Field label={label} error={error}>
    <div className="relative">
      <input
        {...props}
        className={`${inputBase} ${icon ? "pr-12" : ""} ${error ? "border-red-500" : "border-slate-200"}`}
      />
      {icon && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">{icon}</span>}
    </div>
  </Field>
)

const SelectField = ({ label, error, options, placeholder, ...props }) => (
  <Field label={label} error={error}>
    <div className="relative">
      <select
        {...props}
        className={`${inputBase} appearance-none ${error ? "border-red-500" : "border-slate-200"}`}
      >
        <option value="">{placeholder}</option>
        {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
    </div>
  </Field>
)

const isComplete = (p) => p.name.trim() && p.number.length === 10 && p.dob && p.gender

export const PassengerDetails = () => {
  const { passengers, setPassengers, passengerErrors, openPassengers, setOpenPassengers } = usePassenger();
  const { searchData } = useFlight()
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (passengers.length === 0) {
      setPassengers(
        Array.from({ length: searchData.travellers }, (_, index) => ({
          id: index + 1,
          name: "",
          email: "",
          number: "",
          dob: "",
          gender: "",
          nationality: "",
          IDProof: "",
          IDNumber: "",
        }))
      )
      setOpenPassengers([0]) // open the first passenger by default
    }
  }, [passengers.length, searchData.travellers, setPassengers, setOpenPassengers])

  const handleChange = (index, name, value) => {
    const updated = passengers.map((p, i) => (i === index ? { ...p, [name]: value } : p))
    setPassengers(updated)
  }

  const toggleForm = (id) =>
    setOpenPassengers(openPassengers.includes(id) ? openPassengers.filter(item => item !== id) : [...openPassengers, id])

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 lg:p-6 shadow-sm w-full">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <FiUser className="text-blue-700 text-xl" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A2A6B]">Passenger Details</h2>
          <p className="text-xs text-slate-500">Enter names exactly as they appear on the ID</p>
        </div>
      </div>

      <div className="gap-3 flex flex-col">
        {passengers.map((passenger, index) => {
          const open = openPassengers.includes(index)
          const hasError = passengerErrors[index] && Object.keys(passengerErrors[index]).length > 0
          const done = isComplete(passenger)

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-colors ${hasError ? "border-red-300" : "border-slate-200"}`}
            >
              <button
                type="button"
                onClick={() => toggleForm(index)}
                aria-expanded={open}
                className={`w-full flex items-center justify-between gap-3 p-4 text-left cursor-pointer hover:bg-slate-50 transition rounded-2xl ${open ? "bg-slate-50 rounded-b-none" : ""}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                    ${done ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                    {done ? <FiCheckCircle /> : index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#0A2A6B]">Passenger {index + 1}</h3>
                    <p className="text-xs text-slate-500 truncate">
                      {hasError && !open ? <span className="text-red-500">Some details are missing</span> : passenger.name || "Adult"}
                    </p>
                  </div>
                </div>
                <FiChevronDown className={`text-slate-500 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="p-4 space-y-4 border-t border-slate-100">
                  <TextField
                    label="Full name (as per ID)"
                    name="name"
                    type="text"
                    value={passenger.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    placeholder="Rahul Sharma"
                    error={passengerErrors[index]?.name}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      label="Email address"
                      name="email"
                      type="email"
                      value={passenger.email}
                      onChange={(e) => handleChange(index, "email", e.target.value)}
                      placeholder="rahul@email.com"
                      error={passengerErrors[index]?.email}
                    />
                    <TextField
                      label="Phone number"
                      name="number"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={passenger.number}
                      onChange={(e) => handleChange(index, "number", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="9876543210"
                      error={passengerErrors[index]?.number}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      label="Date of birth"
                      name="dob"
                      type="date"
                      max={today}
                      value={passenger.dob}
                      onChange={(e) => handleChange(index, "dob", e.target.value)}
                      icon={<FiCalendar />}
                      error={passengerErrors[index]?.dob}
                    />
                    <SelectField
                      label="Gender"
                      name="gender"
                      value={passenger.gender}
                      onChange={(e) => handleChange(index, "gender", e.target.value)}
                      placeholder="Select gender"
                      options={[["Male", "Male"], ["Female", "Female"], ["Other", "Other"]]}
                      error={passengerErrors[index]?.gender}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Nationality"
                      name="nationality"
                      value={passenger.nationality}
                      onChange={(e) => handleChange(index, "nationality", e.target.value)}
                      placeholder="Select nationality"
                      options={[["indian", "Indian"], ["american", "American"], ["canadian", "Canadian"]]}
                    />
                    <SelectField
                      label="ID proof"
                      name="IDProof"
                      value={passenger.IDProof}
                      onChange={(e) => handleChange(index, "IDProof", e.target.value)}
                      placeholder="Select ID proof"
                      options={[["Aadhaarcard", "Aadhaar Card"], ["PANCard", "PAN Card"], ["Passport", "Passport"]]}
                    />
                  </div>

                  <TextField
                    label="ID number"
                    name="IDNumber"
                    type="text"
                    value={passenger.IDNumber}
                    onChange={(e) => handleChange(index, "IDNumber", e.target.value)}
                    placeholder="1234 5678 9012"
                    icon={<LiaIdCardSolid />}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};
