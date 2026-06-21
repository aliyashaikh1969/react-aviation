import React from "react";

export const Stepper = ({ step }) => {

  const steps = ["Flight", "Seats", "Summary", "Payment", "Confirm"];

  return (

    <div className="w-full py-6 px-4 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4">

        {steps.map((item, index) => {

          const stepNumber = index + 1;

          return (

            <div
              key={item}
              className="flex items-center flex-1 min-w-fit"
            >

              {/* CIRCLE */}

              <div className="flex items-center gap-2">

                <div
                  className={`
                    w-6 h-6 md:w-10 md:h-10 rounded-full
                    flex items-center justify-center
                    text-xs font-semibold
                    transition-all duration-300

                    ${step >= stepNumber
                      ? "bg-blue-700 text-white"
                      : "border border-[#032B6B] text-[#032B6B]"
                    }
                  `}
                >
                  {step > stepNumber ? "✓" : stepNumber}
                </div>

                <p className={`text-xs md:text-sm whitespace-nowrap font-medium ${step >= stepNumber ? "text-blue-700" : "text-gray-400"}`}>
                  {item}
                </p>

              </div>

              {/* LINE */}

              {index !== steps.length - 1 && (

                <div
                  className={`
                    flex-1 h-[2px] mx-5

                    ${step > stepNumber
                      ? "bg-blue-700"
                      : "bg-gray-400"
                    }
                  `}
                />

              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};