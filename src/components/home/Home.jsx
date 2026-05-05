import React from 'react'
import HeroImg from '../../assets/heroimg.png'
import logo from '../../assets/aviation-logo.png'
import { SearchFlights } from '../SearchFlights/SearchFlights';


export const Home = () => {
	return (
		<>
			<div className="w-full md:min-h-screen bg-cover bg-center px-16 md:py-8 py-4"
				style={{ backgroundImage: `url(${HeroImg})` }}>
				<div className='md:py-10'>
					<p className='text-[#56B6C6]'>Your Journey, Our Priority</p>
					<h2 className='md:text-7xl text-5xl text-white font-semibold'>Book Flights to</h2>
					<h2 className='md:text-7xl text-5xl text-white font-semibold '> Any Destination</h2>
					<p className='text-white py-4 md:text-lg text-sm'>Search, compare and book the best flights <br /> at amazing prices.</p>
				</div>
				{/* <div className='relative bg-gray-200 md:w-fit rounded-xl'>
					<div className=' flex gap-2 md:w-fit w-full justify-between md:justify-start md:p-2 md:pb-5 p-1 pb-3 rounded-t-2xl '>
						<button className='py-3 px-5 flex items-center text-white bg-[#031e3d] rounded-xl'> <GiCommercialAirplane />One way</button>
						<button className='py-3 px-5 flex items-center text-gray-700 hover:bg-[#031e3d] hover:text-white rounded-xl transition-all duration-300'> <GiCommercialAirplane />round Trip</button>
						<button className='py-3 px-5 flex items-center text-gray-700 hover:bg-[#031e3d] hover:text-white rounded-xl transition-all duration-300'> <PiIslandThin />Multi City</button>
					</div>
					<div className='bg-white md:absolute rounded-2xl top-16 flex justify-between p-6 md:w-[90vw] w-full md:flex-row flex-col'>
						<div className='flex-1 border  p-2 pr-8'>
							<p className="text-xs text-gray-600 font-semibold ">FROM</p>
							<div className='flex items-center justify-between pt-2'>
								<div className='flex items-center'>
									<span className='text-[#06448a] p-2 text-xl'><FiMapPin /></span>
									<p className='font-bold'>New Delhi</p>
								</div>
								<p className='text-gray-700'>DEL</p>
							</div>
						</div>
						<span className='absolute md:left-[20rem] md:top-14 left-[50%] top-[9.3rem] border p-2 rounded-full bg-white shadow-lg text-[#06448a]'>
							<LiaExchangeAltSolid />
						</span>
						<div className='flex-1 border py-2 pl-7 pr-2'>
							<p className="text-xs text-gray-600 font-semibold">TO</p>
							<div className='flex items-center justify-between pt-2'>
								<div className='flex items-center '>
									<span className='text-[#06448a] p-2 text-xl'><BsAirplane /></span>
									<p className='font-bold'>Mumbai</p>
								</div>
								<p className='text-gray-700'>BOM</p>
							</div>
						</div>
						<div className='flex-1 border-r-2 p-2'>
							<p className="text-xs text-gray-600 font-semibold">DEPARTURE</p>
							<div className='flex items-center pt-2'>
								<span className='text-[#06448a] p-4 text-xl'><SlCalender /></span>
								<div>
									<p className='font-medium text-sm'>24 May,2024</p>
									<span className='text-sm text-gray-600'>Friday</span>
								</div>
							</div>
						</div>
						<div className='flex-1 border-r-2 p-2 '>
							<p className="text-xs text-gray-600 font-semibold">PASSANGER & CLASS</p>
							<div className='flex items-center pt-2'>
								<span className='text-[#06448a] p-4 text-xl'><IoPersonOutline /></span>
								<div>
									<p className='font-semibold flex items-center'>1 Passanger  <span className='p-2'>
										<IoIosArrowDown />
									</span></p>
									<span className='text-sm text-gray-600'>Economy</span>
								</div>

							</div>
						</div>
						<div className='flex-1 flex items-center justify-center'>
							<button className='flex items-center bg-[#031e3d] px-5 py-3 rounded-lg text-white'>Search Flights <span className='pl-5'><IoIosArrowForward /></span> </button>
						</div>
					</div>
				</div> */}
				<SearchFlights />
			</div>


		</>
	)
}
