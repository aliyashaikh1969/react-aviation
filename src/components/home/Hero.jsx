import { useEffect } from 'react'
import HeroImg from '../../assets/heroimg.webp'
import { SearchFlights } from '../search/SearchFlights';
import { useFlight } from '../../hooks/useFlight';

export const Hero = () => {
	const { resetBooking } = useFlight();

	useEffect(() => {
		resetBooking();
		// eslint-disable-next-line react-hooks/exhaustive-deps -- only run this once, on mount
	}, [])

	return (
		<section
			className="relative w-full bg-cover bg-center"
			style={{ backgroundImage: `url(${HeroImg})` }}
		>
			{/* readability overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/30 to-transparent" />

			<div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-8 md:py-12">
				<p className="text-[#56B6C6] text-sm font-medium tracking-wide uppercase">Your Journey, Our Priority</p>
				<h1 className="text-3xl md:text-5xl text-white font-bold leading-tight mt-2">
					Book Flights to<br />Any Destination
				</h1>
				<p className="text-white/90 pt-4 pb-6 md:text-lg text-sm max-w-md">
					Search, compare and book the best flights at amazing prices.
				</p>

				<SearchFlights />
			</div>
		</section>
	)
}
