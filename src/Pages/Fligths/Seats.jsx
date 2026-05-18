import React, { useState } from 'react'
import { SearchSummary } from '../../components/SearchSummary'
import { PiArmchairFill, PiArmchairLight } from "react-icons/pi";
import { IoIosExit } from "react-icons/io";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import airplane from '../../assets/airplaneleft.png'
import { FaArrowLeft } from "react-icons/fa6";
import { WhyChooseUs } from '../../components/WhyChoose/WhyChooseUs';
import { SearchFlights } from '../../components/SearchFlights/SearchFlights';
import { useFlight } from '../../context/FlightContext';



export const Seats = ({
	nextStep,
	prevStep,
}) => {
	const [edit, setEdit] = useState(false);


	const { selectedFlight, selectedSeats, setSelectedSeats } = useFlight()

	const seatLayout = [
		[null, "1F", "2F", "3F", "4F", "5F", "6F", "7F", "8F", "9F", "10F", "11F", "12F", null, "14F", "15F", "16F", "17F", "18F"],
		[null, "1E", "2E", "3E", "4E", "5E", "6E", "7E", "8E", "9E", "10E", "11E", "12E", null, "14E", "15E", "16E", "17E", "18E"],
		[null, "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", null, "14D", "15D", "16D", "17D", "18D"],
		[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
		[null, "1C", "2B", "3C", "1C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", null, "14C", "15C", "16C", "17C", "18C"],
		[null, "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B", "11B", "12B", null, "14B", "15B", "16B", "17B", "18B"],
		[null, "1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "9A", "10A", "11A", "12A", null, "14A", "15A", "16A", "17A", "18A"],

	];


	const occupiedSeats = [
		"8A",
		"8B",
		"9A",
		"9B",
		"9C",
		"10A",
		"10B",
		"10C",
		"11A",
		"11B",
	];

	const handleSeatSelect = (seat) => {

		if (
			occupiedSeats.includes(seat)
		) return;

		const alreadySelected =
			selectedSeats.includes(seat);

		if (alreadySelected) {

			setSelectedSeats(
				selectedSeats.filter(
					(item) => item !== seat
				)
			);

		} else {

			setSelectedSeats([
				...selectedSeats,
				seat
			]);
		}
	};
	return (
		<div >
			<div className='px-16 pt-20 '>
				<h2 className='md:text-xl text-lg text-[#031e3d] font-semibold'>Choose Your Seats</h2>
				<p className='text-[#031e3d] py-2  text-sm'>Select Your preferred seats ans enjoy your journey.</p>
				{edit ? (
					<SearchFlights
						onSearch={() => setEdit(false)}
					/>
				) : (
					<SearchSummary
						onModify={() => setEdit(true)}
					/>
				)}
			</div>
			<div className='px-16 flex gap-5 flex-col md:flex-row '>
				<div className='shadow-lg w-[70%] flex flex-col p-5' >
					<div className='flex items-center justify-between pb-5'>
						<div>
							<p className='text-sm text-[#031e3d] font-semibold'>Select Seats</p>
							<div className='flex gap-5'>

								<div className='flex items-center gap-5'>
									<span>{selectedFlight?.flights?.map((item) => item?.departure_airport?.id)}</span>
									<FaArrowRight />
									<span> {selectedFlight?.flights?.map((item) => item?.arrival_airport?.id)}</span>
								</div>
								<span>{selectedFlight?.flights.map((item) => item?.flight_number)}</span>
							</div>
						</div>
						<span className='border border-slate-300 p-1 font-semibold text-xs text-blue-700'>{selectedFlight?.flights?.map((item) => item?.airplane)}</span>
					</div>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'> <span className='border-2 text-4xl'><PiArmchairLight /></span>Available</div>
						<div className='flex items-center gap-3'>
							<span className='text-green-600 border-2 text-4xl'><PiArmchairFill /></span>
							Selected</div>
						<div className='flex items-center gap-3'><span className='text-gray-400 border-2 text-4xl'><PiArmchairFill /></span>Occupied</div>
						<div className='flex items-center gap-3'><span className='text-red-600 border-2 text-4xl'><IoIosExit /></span>Emergency Exit</div>
					</div>
					<div
						className='relative overflow-x-auto overflow-y-hidden rounded-2xl border bg-white'
					>
						<div
							className='min-w-[1300px] p-10 h-[450px] flex items-center justify-center'
							style={{
								background: `url(${airplane}) no-repeat center`,
								backgroundSize: "cover",
							}}
						>

							{/* <div className='flex items-center gap-11 pl-2 py-4'>
								<span>A</span>
								<span>B</span>
								<span>C</span>
								<span className='invisible'>C</span>
								<span>D</span>
								<span>E</span>
								<span>F</span>
							</div> */}
							<div className=' pl-24'>



							{
								seatLayout.map((row, rowIndex) => (

									<div
										key={rowIndex}
										className="grid grid-cols-19 gap-4 items-center mb-3 min-w-max"
									>

										{
											row.map((seat, index) => {

												if (seat === null) {
													if (rowIndex == 12) {
														return <div className=' text-center' key={index}></div>

													} else {
														return <div className=' text-center' key={index}>{rowIndex + 1}</div>

													}


												}

												if (seat === "EXIT") {

													return (
														<div
															key={index}
															className="text-red-500 text-xs font-bold"
														>
															EXIT
														</div>
													);
												}

												const isOccupied =
													occupiedSeats.includes(seat);

												const isSelected =
													selectedSeats.includes(seat);

												return (

													<button
														key={seat}
														onClick={() =>
															handleSeatSelect(seat)
														}
														className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${isOccupied
															? "bg-gray-200 border-gray-300 cursor-not-allowed"
															: isSelected
																? "bg-green-500 border-green-500 text-white"
																: "bg-white border-blue-500 text-blue-500 hover:bg-blue-50"
															}
                  											`}
													>

														<PiArmchairFill className="text-2xl" />

													</button>
												);
											})
										}
									</div>
								))
							}

														</div>

						</div>
						<div></div>
					</div>
					<div className='bg-blue-100 text-[#031e3d] font-semibold rounded-md flex items-center justify-between p-3'>
						<p>Selected Seat: <span className='text-green-600'>7E</span></p>
						<button className='text-sm text-red-600'>clear Selection</button>
					</div>
					<div className='flex items-center justify-between py-5'>
						<button onClick={prevStep} className='text-[#031e3d] gap-3 flex items-center border-2 rounded-md p-3'><span><FaArrowLeft /></span>Back</button>
						<button onClick={nextStep} className='flex items-center gap-5 border-2 bg-[#031e3d] p-3 rounded-md text-white text-sm'>Continue to Summary <span><FaAngleRight /></span></button>
					</div>
				</div>
				<div className=' flex-col'>
					<div className='shadow-lg p-5 '>
						<div className=' border-b flex flex-col gap-6'>
							<p className='text-xl font-semibold'>Booking Summary</p>
							<div className='flex items-center justify-between'>
								<p>Flight Details</p>
								<span>{selectedFlight.flights?.map((item => item?.airline))}</span>
							</div>

							<div className='flex items-center justify-between'>
								<div className='flex flex-col'>
									<p className='text-2xl font-semibold'>{selectedFlight?.flights?.map((item) => item?.departure_airport?.id)}</p>
									<span className='text-xs text-gray-500'>{selectedFlight?.flights.map((item) => item?.departure_airport?.time.split(" ")[1])}</span>
									<span className='text-xs text-gray-500'>{selectedFlight?.flights.map((item) => item?.departure_airport?.time.split(" ")[0])}</span>
								</div>
								<div className='flex flex-col'>
									<span><FaArrowRight /></span>
									<span className='text-xs text-gray-500'>{selectedFlight?.total_duration}</span>
									<span className='text-xs text-gray-500'>{selectedFlight?.type == "One way" ? "Nonstop" : selectedFlight?.type}</span>
								</div>
								<div className='flex flex-col'>
									<p className='text-2xl font-semibold'>{selectedFlight?.flights?.map((item) => item?.arrival_airport?.id)}</p>
									<span className='text-xs text-gray-500'>{selectedFlight?.flights.map((item) => item?.arrival_airport?.time.split(" ")[1])}</span>
									<span className='text-xs text-gray-500'>{selectedFlight?.flights.map((item) => item?.arrival_airport?.time.split(" ")[0])}</span>
								</div>
							</div>
							<p className='text-sm font-semibold text-gray-500 pb-3'>{selectedFlight?.flights.map((item) => item?.flight_number)} {selectedFlight?.flights?.map((item) => item?.airplane)}</p>
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
								<span>₹{selectedFlight?.price}</span>
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
