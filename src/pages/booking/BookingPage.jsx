import { lazy, Suspense, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFlight } from '../../hooks/useFlight'
import { Stepper } from '../../components/booking/Stepper'

// Split per step: a session that never gets past searching results never has to load the
// seat map, passenger form, payment form or e-ticket/PDF code.
const ResultsStep = lazy(() => import('./ResultsStep').then(m => ({ default: m.ResultsStep })))
const SeatsStep = lazy(() => import('./SeatsStep').then(m => ({ default: m.SeatsStep })))
const SummaryStep = lazy(() => import('./SummaryStep').then(m => ({ default: m.SummaryStep })))
const PaymentStep = lazy(() => import('./PaymentStep').then(m => ({ default: m.PaymentStep })))
const ConfirmationStep = lazy(() => import('./ConfirmationStep').then(m => ({ default: m.ConfirmationStep })))

const StepLoader = () => (
    <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#0A2A6B] border-t-transparent rounded-full" />
    </div>
)

export const BookingPage = () => {
    const location = useLocation();
    const { selectedFlight } = useFlight();
    // arriving from the flight details page with a flight already chosen skips straight to seats
    const [step, setStep] = useState(() =>
        location.state?.step === 2 && selectedFlight ? 2 : 1
    );
    const TOTAL_STEPS = 5;

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    }

    return (
        <div>
            <Stepper step={step} />
            <Suspense fallback={<StepLoader />}>
                {step === 1 && (<ResultsStep nextStep={nextStep} />)}
                {step === 2 && (<SeatsStep nextStep={nextStep} prevStep={prevStep} />)}
                {step === 3 && (<SummaryStep nextStep={nextStep} prevStep={prevStep} />)}
                {step === 4 && (<PaymentStep nextStep={nextStep} prevStep={prevStep} />)}
                {step === 5 && (<ConfirmationStep />)}
            </Suspense>
        </div>
    )
}
