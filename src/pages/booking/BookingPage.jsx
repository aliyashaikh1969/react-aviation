import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFlight } from '../../hooks/useFlight'
import { SeatsStep } from './SeatsStep'
import { SummaryStep } from './SummaryStep'
import { PaymentStep } from './PaymentStep'
import { ConfirmationStep } from './ConfirmationStep'
import { ResultsStep } from './ResultsStep'
import { Stepper } from '../../components/booking/Stepper'


export const BookingPage = () => {
    const location = useLocation();
    const { selectedFlight } = useFlight();
    // arriving from the flight details page with a flight already chosen skips straight to seats
    const [step, setStep] = useState(() =>
        location.state?.step === 2 && selectedFlight ? 2 : 1
    );
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
            { step === 1 && ( <ResultsStep nextStep={nextStep} />) }

            { step === 2 && (<SeatsStep nextStep={nextStep} prevStep={prevStep}/>) }

            { step === 3 && ( <SummaryStep nextStep={nextStep} prevStep={prevStep}/>)}

            { step === 4 && ( <PaymentStep nextStep={nextStep} prevStep={prevStep} /> )}

            { step === 5 && ( <ConfirmationStep/>)}
        </div>
    )
}
