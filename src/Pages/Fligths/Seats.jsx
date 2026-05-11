import React from 'react'
import { SearchSummary } from '../../components/SearchSummary'
import { PiArmchairFill, PiArmchairLight } from "react-icons/pi";
import { IoIosExit } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import airplane from '../../assets/airplane.png'
import { FaArrowLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { WhyChooseUs } from '../../components/WhyChoose/WhyChooseUs';



export const Seats = ({
  nextStep,
  bookingData,
  prevStep,
  setBookingData,
}) => {
   
  const handleSeatSelect = (seat) => {

  setBookingData((prev) => ({
    ...prev,
    selectedSeats: [seat],
  }));
};
  return (
    <div >
      <div className='px-16 md:py-8 py-4'>
        <h2 className='md:text-7xl text-5xl text-[#031e3d] font-semibold'>Choose Your Seats</h2>
        <p className='text-[#031e3d] py-4 md:text-lg text-sm'>Select Your preferred seats ans enjoy your journey.</p>
        <SearchSummary />
      </div>
      <div className='p-6 flex gap-5 flex-col md:flex-row '>
        <div className='shadow-lg md:flex-[50%] flex flex-col p-5' >
          <div className='flex items-center justify-between'>
            <div>
              <p>Select Seats</p>
              <span>DEL BOM</span>
              <span>6E 2345</span>
            </div>
            <span>Airbus A320</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'> <span className='border-2 text-4xl'><PiArmchairLight /></span>Available</div>
            <div className='flex items-center gap-3'>
              <span className='text-green-600 border-2 text-4xl'><PiArmchairFill /></span>
              Selected</div>
            <div className='flex items-center gap-3'><span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>Occupied</div>
            <div className='flex items-center gap-3'><span className='text-red-600 border-2 text-4xl'><IoIosExit /></span>Emergency Exit</div>
          </div>
          <div className='h-[1350px] relative' style={{ background: `url(${airplane}) no-repeat center`, backgroundSize: "cover" }}>
            <div className='w-[350px] absolute top-[15.3rem] md:left-[30%] left-[24%]'>
              <div className='flex items-center gap-11 pl-2'>
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span className='invisible'>C</span>
                <span>D</span>
                <span>E</span>
                <span>F</span>
              </div>
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>1</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>2</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
             <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>3</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>4</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>
               <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>5</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>6</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>
                <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>7</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>8</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900'>9</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>10</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div> 
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>11</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>12</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl invisible'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl invisible'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl invisible'><PiArmchairFill /></span>
                <span className='text-gray-900 '>13</span>
                <span className='text-gray-400 border-2 text-4xl invisible'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl invisible'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl invisible'><PiArmchairFill /></span>
              </div> 
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>14</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl '><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>15</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>16</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div> 
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>17</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>  
              <div className='my-3 flex items-center justify-between'>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-900 '>18</span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
                <span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>
              </div>
            </div>
            <div></div>
          </div>
          <div className='bg-blue-100 text-[#031e3d] font-semibold rounded-md flex items-center justify-between p-3'>
            <p>Selected Seat: <span className='text-green-600'>7E</span></p>
            <button className='text-sm text-red-600'>clear Selection</button>
          </div>
          <div className='flex items-center justify-between py-5'>
            <button  onClick={prevStep} className='text-[#031e3d] gap-3 flex items-center border-2 rounded-md p-3'><span><FaArrowLeft /></span>Back</button>
            <button onClick={nextStep} className='flex items-center gap-5 border-2 bg-[#031e3d] p-3 rounded-md text-white text-lg'>Continue to Summary <span><FaAngleRight /></span></button>
          </div>
        </div>
        <div className=' md:flex-[25%] flex-1 flex-col'>
          <div className='shadow-lg p-5 '>
            <div className=' border-b flex flex-col gap-6'>
              <p className='text-xl font-semibold'>Booking Summary</p>
              <div className='flex items-center justify-between'>
                <p>Flight Details</p>
                <span>indigo</span>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <p className='text-2xl font-semibold'>DEL</p>
                  <span className='text-xs text-gray-500'>10:30</span>
                  <span className='text-xs text-gray-500'>24 May, 2024</span>
                </div>
                <div className='flex flex-col'>
                  <span><FaArrowRight /></span>
                  <span className='text-xs text-gray-500'>2h 15m</span>
                  <span className='text-xs text-gray-500'>Non-stop</span>
                </div>
                <div className='flex flex-col'>
                  <p className='text-2xl font-semibold'>BOM</p>
                  <span className='text-xs text-gray-500'>12:45</span>
                  <span className='text-xs text-gray-500'>24 May, 2024</span>
                </div>
              </div>
              <p className='text-sm font-semibold text-gray-500 pb-3'>6E 2345 Airbus A320</p>
            </div>
            <div className='flex items-center justify-between py-5 border-b text-sm font-semibold'>
              <p>Passengers</p>
              <p>1 Adult</p>
            </div>
            <div className='flex items-center justify-between py-5 border-b text-sm font-semibold'>
              <p>Seat</p>
              <p>7E</p>
            </div>
            <div className='py-5 border-b'>
              <p className='text-lg font-semibold'>Fare Details</p>
              <div className='flex items-center justify-between text-sm font-semibold text-gray-500'>
                <span>Base Fare</span>
                <span>8,999rs</span>
              </div>
              <div className='flex items-center justify-between text-sm font-semibold text-gray-500'>
                <span>Seat Charge</span>
                <span>299rs</span>
              </div>
              <div className='flex items-center justify-between text-sm font-semibold text-gray-500'>
                <span>Taxes & Charges</span>
                <span>1201rs</span>
              </div>
            </div>
            <div className='flex items-center justify-between pt-5'>
              <p className='text-xl font-semibold'>Total Amount</p>
              <p>10,499rs</p>
            </div>
          </div>
          <div className='shadow-lg p-5 flex flex-col gap-5'>
            <p className='text-xl font-semibold'>Seat Legend</p>
            <div className='flex items-center justify-between text-sm font-semibold '>
              <div className='flex items-center gap-3'>
                <span className='border-2 text-2xl '><PiArmchairLight /></span>
                <p>Availabe Seat</p>
              </div>
              <span className='text-gray-500'>299rs</span>
            </div>
            <div className='flex items-center justify-between text-sm font-semibold '>
              <div className='flex items-center gap-3'>
                <span className='text-green-600 border-2 text-2xl'><PiArmchairFill /></span>
                <p>Selected Seat</p>
              </div>
              <span className='text-gray-500'>Your Selection</span>
            </div>
            <div className='flex items-center justify-between text-sm font-semibold '>
              <div className='flex items-center gap-3'>
                <span className='text-gray-400 border-2 text-2xl'><PiArmchairFill /></span>
                <p>Occupied Seat</p>
              </div>
              <span className='text-gray-500'>Not Available</span>
            </div>
            <div className='flex items-center justify-between text-sm font-semibold '>
              <div className='flex items-center gap-3'>
                <span className='text-red-600 border-2 text-2xl'><IoIosExit /></span>
                <p>Emergency Exit</p>
              </div>
              <span className='text-gray-500'>Extra legroom</span>
            </div>
          </div>
          <div className='shadow-lg p-5'>
            <p className='text-xl font-semibold'>Need Help?</p>
            <p>Our customer support is available 24/7 to assist you.</p>
            <button>
              <span></span>
              Contact Support
            </button>
          </div>
        </div>
      </div>
      <WhyChooseUs />
    </div>
  )
}
