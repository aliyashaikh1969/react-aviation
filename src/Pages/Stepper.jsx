import React from "react";

export const Stepper = ({ step }) => {

  const steps = [
    "Search",
    "Flight",
    "Seats",
    "Summary",
    "Payment",
    "Confirm",
  ];

  return (

    <div className="w-full  py-6 px-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4">

        {steps.map((item, index) => {

          const stepNumber = index + 1;

          return (

            <div
              key={index}
              className="flex items-center flex-1 min-w-fit"
            >

              {/* CIRCLE */}

              <div className="flex items-center gap-3">

                <div
                  className={`
                    w-8 h-8 md:w-10 md:h-10 rounded-full
                    flex items-center justify-center
                    text-sm font-semibold
                    transition-all duration-300

                    ${
                      step >= stepNumber
                        ? "bg-blue-700 text-white"
                        : "border border-[#032B6B] text-[#032B6B]"
                    }
                  `}
                >
                  {step > stepNumber ? "✓" : stepNumber}
                </div>

                <p className="text-[#032B6B] text-xs md:text-sm whitespace-nowrap">
                  {item}
                </p>

              </div>

              {/* LINE */}

              {index !== steps.length - 1 && (

                <div
                  className={`
                    flex-1 h-[2px] mx-4

                    ${
                      step > stepNumber
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