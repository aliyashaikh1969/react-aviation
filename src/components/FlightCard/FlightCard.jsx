import { IoBagHandleOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import { PiSeatBold } from "react-icons/pi";
import { IoIosAirplane } from "react-icons/io";
import { useFlight } from '../../context/FlightContext';
import { FiClock } from "react-icons/fi";


export const FlightCard = ({ flight, nextStep }) => {

    const { setSelectedFlight } = useFlight()


    const selectedFunction = () => {
        setSelectedFlight(flight)
        nextStep()
    }

    const firstFlight = flight?.flights?.[0]

    const flightDuration = firstFlight?.duration

    const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
    const minutes = String(flightDuration % 60).padStart(2, "0");


    return (
        <div className="bg-white text-black p-2 rounded-xl shadow-md flex justify-between lg:items-center lg:flex-row flex-col">

            <div className='px-3 flex-1'>
                <div className='flex px-2 py-5 lg:items-center border-b lg:flex-row flex-col overflow-hidden'>

                    <div className='flex items-center gap-3 w-[220px] shrink-0'>
                        <div className='w-16 h-16 '>
                            <img src={firstFlight?.airline_logo} className='w-[100%] h-[100%] object-contain' alt="" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">{firstFlight?.airline}</p>
                            <span className='text-gray-600 text-xs'>{firstFlight?.flight_number}</span>
                        </div>
                    </div>
                    <div className='flex flex-1 md:flex-auto items-center justify-between'>
                        <div>
                            <p className='font-bold text-xl'>{firstFlight?.departure_airport?.time.split(" ")[1]}</p>
                            <span className='text-sm'>{firstFlight?.departure_airport?.id}</span>
                        </div>
                        <div className='flex items-center gap-3'>

                            <span className='text-gray-400'>
                                < IoIosAirplane />
                            </span>
                            <div className='flex flex-col items-center'>
                                <div className="flex items-center gap-2  text-xs pb-3 px-5 border-b-2 border-gray-400">
                                    <FiClock className="text-gray-500" />
                                    <span className=' text-gray-500 font-semibold '>{hours}h:{minutes}m</span>
                                </div>
                                <span className='text-xs text-gray-500 font-semibold pt-3 px-5'>{flight?.type == "One way" ? "Non-stop" : flight?.type}</span>
                            </div>
                            <span className='text-gray-400'>
                                <IoIosAirplane />
                            </span>
                        </div>
                        <div className='text-center'>
                            <p className='font-bold text-xl'>{firstFlight?.arrival_airport?.time.split(" ")[1]}</p>
                            <span className='text-sm'>{firstFlight?.arrival_airport?.id}</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-10 p-3 text-gray-600'>
                    <div className='flex items-center gap-3 '>
                        <span className='text-lg'><IoBagHandleOutline /></span>
                        <p className='text-xs font-semibold'>15 kg Baggage</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='text-lg'><GiMeal /></span>
                        <p className='text-xs font-semibold'>Meal Available</p>
                    </div>
                    <div className='flex items-center '>
                        <span className='text-lg'><PiSeatBold /></span>
                        <p className='text-xs font-semibold'>Standard Seat</p>
                    </div>
                </div>
            </div>

            <div className="px-10   text-center flex justify-between lg:flex-col">
                <div>
                    <h2 className="text-xl font-bold text-black">₹{flight.price}</h2>
                    <p className='text-xs font-semibold'>per person</p>
                </div>
                <div>
                    <button onClick={selectedFunction} className="m-2 bg-blue-500 text-white px-10 py-1 rounded">
                        Select

                    </button>
                    <p className='text-xs font-semibold text-green-600'>{flight.seatsAvailable
                        ? `${flight.seatsAvailable} seats left`
                        : "Seats available"}</p>
                </div>
            </div>

        </div>
    );
};

