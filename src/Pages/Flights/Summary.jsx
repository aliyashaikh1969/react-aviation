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


  const { selectedFlight, selectedSeats } = useFlight()
  const { passengerData, validatePassengers, setList, errors, } = usePassenger()


  // console.log(validatePassengers())

  const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const grandTotal = (selectedFlight?.price ?? 0) + seatTotal + TAXES



  const handleNextStep = () => {
    const newErrors = validatePassengers()
    const hasErrors = newErrors.some(err => Object.keys(err).length > 0)
    // if (hasErrors) {
    //   toast.error("Please fill all passenger details")
    //   const errorIndexes = newErrors
    //     .map((err, i) => Object.keys(err).length)
    //     .filter(i => i !== null)
    //   setList(errorIndexes)
    //   return
    // }

    nextStep();
  }
  return (
    <div className='px-16 pt-2 '>
      <h2 className='md:text-xl text-lg text-[#031e3d] font-semibold'>Booking Summary</h2>
      <p className='text-[#031e3d]   text-sm'>Review your booking details before confirming your flight.</p>

      <div className='flex gap-5 md:flex-row flex-col pt-5'>

        <div className='flex-[40%] flex gap-5 flex-col h-screen overflow-y-auto'>
          <PassengerDetails />
          <PriceDetails />
        </div>
        <div className='flex-[60%] flex gap-5  flex-col h-screen overflow-y-auto'>
          <FlightDetails />
          <SeatDetails prevStep={prevStep} />
        </div>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <button className='flex items-center gap-4 p-3 text-blue-600' onClick={prevStep}><span><FaArrowLeft />
        </span> Back to Seats
        </button>
        <button onClick={handleNextStep} className="  rounded-md bg-[#0A2A6B] hover:bg-[#081f52] transition-all duration-300 text-white font-semibold text-sm  shadow-lg py-2 px-4">
          Confirm & Pay ₹{grandTotal.toLocaleString('en-IN')}
        </button>
      </div>
      <WhyChooseUs />
    </div>
  )
}