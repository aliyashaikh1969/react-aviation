import React, { useState } from 'react'
import { Seats } from './Flights/Seats'
import { Summary } from './Flights/Summary'
import { Payment } from './Flights/Payment'
import { Confirmation } from './Flights/Confirmation'
import { Results } from './Flights/Results'
import { Stepper } from './Stepper'


export const BookingFlow = () => {
    const [step, setStep] = useState(1);
    const TOTAL_STEPS = 5;




    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1  ,TOTAL_STEPS));
    }

    const prevStep = () => {
        setStep((prev) => Math.max(prev-1,1));
    }
    return (
        <div>
            <Stepper step={step} />
            { step === 1 && ( <Results nextStep={nextStep} />) }

            { step === 2 && (<Seats nextStep={nextStep} prevStep={prevStep}/>) }

            { step === 3 && ( <Summary nextStep={nextStep} prevStep={prevStep}/>)}

            { step === 4 && ( <Payment nextStep={nextStep} prevStep={prevStep} /> )}

            { step === 5 && ( <Confirmation/>)}
        </div>
    )
}
