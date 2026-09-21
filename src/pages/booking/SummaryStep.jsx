import { PassengerDetails } from '../../components/booking/PassengerDetails'
import { PriceDetails } from '../../components/booking/PriceDetails'
import { FlightOverview } from '../../components/flights/FlightOverview'
import { SeatDetails } from '../../components/booking/SeatDetails'
import { WhyChooseUs } from '../../components/common/WhyChooseUs'
import { FaArrowLeft } from "react-icons/fa6";
import { usePassenger } from '../../hooks/usePassenger'
import toast from 'react-hot-toast'
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { useFare } from '../../hooks/useFare'
import { inr } from '../../utils/format'

export const SummaryStep = ({ nextStep, prevStep }) => {
  useScrollToTop();

  const { validatePassengers, setOpenPassengers } = usePassenger()
  const { grandTotal } = useFare()

  const handleNextStep = () => {
    const newErrors = validatePassengers()
    const errorIndexes = newErrors
      .map((err, i) => (Object.keys(err).length > 0 ? i : null))
      .filter(i => i !== null)

    if (errorIndexes.length > 0) {
      toast.error("Please fill all passenger details")
      setOpenPassengers(errorIndexes) // open the passengers that need attention
      return
    }
    nextStep();
  }

  return (
    <div className="bg-[#F5F7FA]">
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 pt-6'>
        <h2 className="text-xl md:text-2xl font-bold text-[#031e3d]">Booking Summary</h2>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Review your booking details before confirming your flight.
        </p>

        <div className='flex gap-5 xl:flex-row flex-col pt-5 pb-8'>
          <div className='xl:w-[40%] flex gap-5 flex-col'>
            <PassengerDetails />
            <PriceDetails />
          </div>
          <div className='xl:w-[60%] flex gap-5 flex-col'>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 lg:p-6">
              <FlightOverview />
            </div>
            <SeatDetails prevStep={prevStep} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur border-t shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1600px] mx-auto py-3 px-4 sm:px-6 lg:px-16 flex flex-col-reverse sm:flex-row gap-3 justify-between items-center">
          <button
            className='flex items-center gap-3 px-3 py-2 text-blue-600 hover:text-blue-800 cursor-pointer'
            onClick={prevStep}
          >
            <FaArrowLeft /> Back to seats
          </button>
          <button
            onClick={handleNextStep}
            className="w-full sm:w-auto rounded-xl bg-[#0A2A6B] hover:bg-[#081f52] transition-colors text-white font-semibold text-sm shadow-lg py-3.5 px-8 cursor-pointer"
          >
            Confirm & pay {inr(grandTotal)}
          </button>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  )
}
