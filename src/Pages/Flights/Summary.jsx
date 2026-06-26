import { PassengerDetails } from '../../components/PassengerDetails'
import { PriceDetails } from '../../components/PriceDetails'
import { FlightDetails } from '../../components/FlightDetails'
import { SeatDetails } from '../../components/SeatDetails'
import { WhyChooseUs } from '../../components/WhyChoose/WhyChooseUs'
import { FaArrowLeft } from "react-icons/fa6";
import { usePassenger } from '../../context/PassengerContext'
import { useFlight } from '../../context/FlightContext'
import toast from 'react-hot-toast'
import { useScrollToTop } from "../../hooks/useScrollToTop"


const TAXES = 1125;

export const Summary = ({ nextStep, prevStep }) => {
  useScrollToTop();


  const { selectedFlight, selectedSeats, flightData } = useFlight()
  const { validatePassengers, setList, } = usePassenger()

  const totalTaxes = TAXES * flightData.travellers;

  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const grandTotal = ((selectedFlight?.price ?? 0) * flightData.travellers) + seatTotal + totalTaxes;


  const handleNextStep = () => {
    const newErrors = validatePassengers()
    const hasErrors = newErrors.some(err => Object.keys(err).length > 0)
    if (hasErrors) {
      toast.error("Please fill all passenger details")
      const errorIndexes = newErrors
        .map((err, i) => Object.keys(err).length > 0 ? i : null)
        .filter(i => i !== null)
      setList(errorIndexes)
      return
    }
    nextStep();
  }
  return (
    <div className='px-4 sm:px-6 lg:px-16 pt-2'>
      <h2 className="text-xl md:text-2xl font-semibold text-[#031e3d]">Booking Summary</h2>
      <p className="text-sm md:text-base text-gray-600 mt-1">
        Review your booking details before confirming your flight.
      </p>
      <div className='flex gap-5 xl:flex-row flex-col pt-5'>

        <div className='xl:w-[40%] flex gap-5 flex-col'>
          <PassengerDetails />
          <PriceDetails />
        </div>
        <div className='xl:w-[60%] flex gap-5 flex-col'>
          <FlightDetails />
          <SeatDetails prevStep={prevStep} />
        </div>
      </div>
      <div className="sticky bottom-0 bg-white border-t py-4 px-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <button className='flex items-center gap-4 p-3 text-blue-600' onClick={prevStep}><span><FaArrowLeft />
        </span> Back to Seats
        </button>
        <button onClick={handleNextStep} className="w-full sm:w-auto rounded-md bg-[#0A2A6B] hover:bg-[#081f52] transition-all duration-300 text-white font-semibold text-sm shadow-lg py-3 px-6">
          Confirm & Pay ₹{grandTotal.toLocaleString('en-IN')}
        </button>
      </div>
      <WhyChooseUs />
    </div>
  )
}