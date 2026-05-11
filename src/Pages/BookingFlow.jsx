import React, { useState } from 'react'
import { Seats } from './Fligths/Seats'
import { Summary } from './Fligths/Summary'
import { Payment } from './Fligths/Payment'
import { Confirmation } from './Fligths/Confirmation'
import { Results } from '../Pages/Fligths/Results'
import { Stepper } from './Stepper'



export const BookingFlow = () => {
    const [step, setStep] = useState(2);

    const [bookingData, setBookingData] = useState({
        selectedSeats: [],
        totalPrice: 0,
    });

    const nextStep = () => {
        setStep((prev) => prev + 1);
    }

    const prevStep = () => {
        setStep((prev) => prev - 1);
    }
    return (
        <div>
             <Stepper step={step} />
            {
                step == 2 && (
                    <Results 
                    nextStep={nextStep}/>
                )
            }
            {
                step === 3 && (
                    <Seats
                        nextStep={nextStep}
                        bookingData={bookingData}
                        prevStep = {prevStep}
                        setBookingData={setBookingData}
                    />
                )
            }
            {
                step === 4 && (
                    <Summary
                        nextStep={nextStep}
                        prevStep={prevStep}
                        bookingData={bookingData}
                    />
                )
            }
            {
                step === 5 && (
                    <Payment
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )
            }
            {
                step === 6 && (
                    <Confirmation
                        bookingData={bookingData}
                    
                    />
                )
            }
        </div>
    )
}
