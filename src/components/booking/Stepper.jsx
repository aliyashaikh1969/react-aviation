import { FiCheck } from "react-icons/fi";

const steps = ["Flight", "Seats", "Summary", "Payment", "Confirm"];

export const Stepper = ({ step }) => {
  return (
    <nav aria-label="Booking progress" className="w-full py-4 md:py-6 px-4 bg-white shadow-sm">
      <ol className="max-w-4xl mx-auto flex items-center">
        {steps.map((label, index) => {
          const number = index + 1;
          const done = step > number;
          const current = step === number;

          return (
            <li
              key={label}
              className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}
              aria-current={current ? "step" : undefined}
            >
              <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300
                    ${done
                      ? "bg-blue-700 text-white"
                      : current
                        ? "bg-blue-700 text-white ring-4 ring-blue-100"
                        : "border-2 border-slate-300 text-slate-400"}`}
                >
                  {done ? <FiCheck /> : number}
                </div>

                <p className={`text-[11px] md:text-sm whitespace-nowrap font-medium
                  ${done || current ? "text-blue-700" : "text-slate-400"}`}>
                  {label}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 md:mx-5 -mt-4 md:mt-0 rounded transition-colors duration-300
                    ${done ? "bg-blue-700" : "bg-slate-200"}`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
