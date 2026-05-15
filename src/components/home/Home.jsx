import React from 'react'
import HeroImg from '../../assets/heroimg.png'
import logo from '../../assets/aviation-logo.png'
import { SearchFlights } from '../SearchFlights/SearchFlights';


export const Home = () => {
	return (
		<>
			<div className="w-full bg-cover bg-center px-16 py-5 flex justify-between flex-col"
				style={{ backgroundImage: `url(${HeroImg})` }}>
				<div className=''>

					<div className=''>
						<p className='text-[#56B6C6] text-sm'>Your Journey, Our Priority</p>
						<h2 className='md:text-3xl text-2xl text-white font-semibold'>Book Flights to</h2>
						<h2 className='md:text-3xl text-2xl text-white font-semibold '> Any Destination</h2>
						<p className='text-white py-4 md:text-lg text-sm'>Search, compare and book the best flights <br /> at amazing prices.</p>
					</div>

					<SearchFlights />
				</div>
			</div>


		</>
	)
}
