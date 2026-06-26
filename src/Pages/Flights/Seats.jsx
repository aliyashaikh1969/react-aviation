import React, { Fragment, useState } from 'react'
import { SearchSummary } from '../../components/SearchSummary'
import { PiArmchairFill, PiArmchairLight } from "react-icons/pi";
import { IoIosExit } from "react-icons/io";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import airplane from '../../assets/airplaneleft.png'
import { FaArrowLeft } from "react-icons/fa6";
import { WhyChooseUs } from '../../components/WhyChoose/WhyChooseUs';
import { SearchFlights } from '../../components/SearchFlights/SearchFlights';
import { useFlight } from '../../context/FlightContext';
import { seatLayoutData } from './SeatLayout';
import toast from "react-hot-toast";
import { SearchModify } from '../../components/search/SearchModify';
import { FiClock } from 'react-icons/fi';
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { BsAirplaneFill } from 'react-icons/bs';


export const Seats = ({ nextStep, prevStep }) => {

	useScrollToTop();

	const { selectedFlight, selectedSeats, setSelectedSeats, flightData } = useFlight()


	const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0)
	const TAXES = 1125;
	const totalTaxes = TAXES * flightData.travellers;

	const grandTotal = ((selectedFlight?.price ?? 0) * flightData.travellers) + seatTotal + totalTaxes;

	const seatAlpha = ["F", "E", "D", null, "C", "B", "A"]

	let TOTAL_SEATS = 108;
	const OCCUPIED_SEATS = ["8A", "8B", "9A", "9B", "9C", "10A", "10B", "10C", "11A", "11B"];
	let availableSeats = TOTAL_SEATS - selectedSeats.length - OCCUPIED_SEATS.length


	const handleSeatSelect = (seat) => {

		if (
			OCCUPIED_SEATS.includes(seat.seatNo)
		) return;

		const alreadySelected = selectedSeats.some(s => s.seatNo === seat.seatNo)

		if (alreadySelected) {

			setSelectedSeats(
				selectedSeats.filter(
					(item) => item.seatNo !== seat.seatNo
				)
			);

		} else {
			const updatedSeats = [...selectedSeats, seat]
			const latestSeats = updatedSeats.slice(-flightData.travellers);
			setSelectedSeats(latestSeats);

		}
	};

	const handleNextStep = () => {
		selectedSeats.length === flightData.travellers ? nextStep() : toast.error("Select seats")
	}

	const clearSeats = () => {
		setSelectedSeats([])
	}



	const flightDuration = selectedFlight?.total_duration

	const hours = String(Math.floor(flightDuration / 60)).padStart(2, "0");
	const minutes = String(flightDuration % 60).padStart(2, "0");

	return (
		<div >
			<div className='px-4 sm:px-8 lg:px-16 pt-2'>
				<h2 className='md:text-xl text-lg text-[#031e3d] font-semibold'>Choose Your Seats</h2>
				<p className='text-[#031e3d] py-2  text-xs'>Select Your preferred seats and enjoy your journey.</p>
				<SearchSummary />
			</div>
			<div className="px-4 lg:px-16 flex flex-col xl:flex-row gap-5">
				<div className="shadow-lg w-full xl:w-[70%] flex flex-col p-3">
					<div className='flex items-center justify-between pb-3'>
						<div>
							<p className='text-xs text-[#031e3d] font-semibold'>Select Seats</p>
							<div className='flex flex-wrap gap-3'>
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
						<div className='flex items-center gap-3'> <span className='bg-white border-blue-500 text-blue-500 hover:bg-blue-50 w-8 h-8 rounded-lg border-2 flex items-center justify-center'><PiArmchairFill className='text-2xl' /></span>Available</div>
						<div className='flex items-center gap-3'>
							<span className='bg-green-500 border-green-500 text-white w-8 h-8 rounded-lg border-2 flex items-center justify-center'><PiArmchairFill className='text-2xl' /></span>
							Selected</div>
						<div className='flex items-center gap-3'><span className='bg-gray-200 border-gray-300 cursor-not-allowed w-8 h-8 rounded-lg border-2 flex items-center justify-center'><PiArmchairFill className='text-2xl' /></span>Occupied</div>
						<div className='flex items-center gap-3'><span className='text-red-500 text-xs font-bold'>EXIT</span>Emergency Exit</div>
					</div>
					<div
						className='relative overflow-x-auto overflow-y-hidden rounded-2xl border bg-white my-4'
					>
						<div
							className='min-w-[1220px] p-10 h-[450px] flex items-center justify-center '
							style={{
								background: `url(${airplane}) no-repeat center`,
								backgroundSize: "cover",
							}}
						>
							<div className=' pl-20'>
								{
									seatLayoutData.map((row, rowIndex) => (

										<div
											key={rowIndex}
											className="grid grid-cols-19 gap-4 items-center mb-3 min-w-max"
										>
											{
												row.map((seat, index) => {

													if (seat === null) {
														if (index == 13) {
															return <div className=' text-center bg-red-800' key={index}></div>

														}
														if (index == 0) {
															return <div className=' text-center -rotate-90' key={index}>{seatAlpha[rowIndex]}</div>


														}
														return <div className=' text-center -rotate-90' key={index}>{index}</div>
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

													const isOccupied = OCCUPIED_SEATS.includes(seat.seatNo);

													const isSelected =
														selectedSeats.some(
															(s) =>
																s.seatNo === seat.seatNo
														);

													return (

														<button
															key={seat.seatNo}
															onClick={() =>
																handleSeatSelect(seat)
															}
															disabled={isOccupied} className={`z-10 relative group w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200
																${isOccupied ? "bg-gray-200 border-gray-300 cursor-not-allowed" : isSelected
																	? "bg-green-500 border-green-500 text-white"
																	: "bg-white border-blue-500 text-blue-500 hover:bg-blue-50"
																}`}>

															<PiArmchairFill className="text-2xl rotate-90 " />
															<div className=" absolute -top-14 left-1/2 -translate-x-1/2 hidden group-hover:flex gap-2 items-center bg-black text-white text-[10px] px-2 py-1 rounded-md z-100">
																<span>Seat:{seat.seatNo} </span>
																<span>₹{seat.price}</span>
																<span>{seat.type}</span>

															</div>


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
					<div className='bg-blue-100 text-[#031e3d]  rounded-md flex items-center justify-between p-3'>
						<p>Selected Seat: <span className='text-green-600'>{selectedSeats.length > 0 ? selectedSeats.map((seat) => seat.seatNo).join(", ") : "--"}</span></p>
						<button className='text-xs text-red-600' onClick={clearSeats}>clear Selection</button>
					</div>
					<div className='flex items-center justify-between py-3'>
						<button onClick={prevStep} className='text-[#031e3d] gap-3 flex items-center border-2 rounded-md p-3'><span><FaArrowLeft /></span>Back</button>
						<button onClick={handleNextStep} className='flex items-center gap-5 border-2 bg-[#031e3d] p-3 rounded-md text-white text-xs'>Continue to Summary <span><FaAngleRight /></span></button>
					</div>
				</div>
				<div className='w-full xl:w-[30%] flex flex-col gap-4 sticky top-24 self-start'>
					<div className='shadow-lg p-3 '>
						<div className=' border-b flex flex-col gap-3'>
							<p className='text-xl font-semibold'>Booking Summary</p>
							<div className='flex items-center justify-between'>
								<p>Flight Details</p>
								<span>{selectedFlight.flights?.map((item => item?.airline))}</span>
							</div>

							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
								<div className='flex flex-col'>
									<p className='text-2xl font-semibold'>{selectedFlight?.flights?.map((item) => item?.departure_airport?.id)}</p>
									<span className='text-xs text-gray-500'>{selectedFlight?.flights.map((item) => item?.departure_airport?.time.split(" ")[1])}</span>
									<span className='text-xs text-gray-500'>{selectedFlight?.flights.map((item) => item?.departure_airport?.time.split(" ")[0])}</span>
								</div>
								<div className="flex flex-col items-center w-full max-w-[300px]">

									<div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
										<FiClock />
										<span>{hours}h:{minutes}m</span>
									</div>

									{/* Flight Line */}
									<div className="relative w-full flex items-center">

										<div className="h-[2px] bg-slate-200 flex-1"></div>

										<div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-3 shadow-lg shadow-blue-100">
											<BsAirplaneFill className="text-white text-sm rotate-90" />
										</div>

										<div className="h-[2px] bg-slate-200 flex-1"></div>
									</div>

									{/* Non Stop */}
									<div className="mt-4 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
										{selectedFlight?.type == "One way" ? "Non-stop" : selectedFlight?.type}
									</div>
								</div>
								<div className='flex flex-col'>
									<p className='text-2xl font-semibold'>{selectedFlight?.flights?.map((item) => item?.arrival_airport?.id)}</p>
									<span className='text-sm text-gray-800'>{selectedFlight?.flights.map((item) => item?.arrival_airport?.time.split(" ")[1])}</span>
									<span className='text-xs text-gray-500'>{selectedFlight?.flights.map((item) => item?.arrival_airport?.time.split(" ")[0])}</span>
								</div>
							</div>
							<p className='text-xs font-semibold text-gray-500 pb-2'>{selectedFlight?.flights.map((item) => item?.flight_number)} {selectedFlight?.flights?.map((item) => item?.airplane)}</p>
						</div>
						<div className='flex items-center justify-between py-3 border-b text-xs font-semibold'>
							<p>Passengers</p>
							<p>{flightData.travellers} Adult{flightData.travellers > 1 ? "s" : ""}</p>
						</div>
						<div className='flex items-center justify-between py-3 border-b text-xs font-semibold'>
							<p>Seat</p>

							<p>
								{selectedSeats.length > 0
									? selectedSeats.map(s => s.seatNo).join(", ")
									: "--"}
							</p>
						</div>
						<div className='py-3 border-b'>
							<p className='text-lg font-semibold'>Fare Details</p>
							<div className="flex justify-between text-xs text-gray-500 py-1">
								<span>Base fare × {flightData.travellers}</span>
								<span>₹{((selectedFlight?.price ?? 0) * flightData.travellers).toLocaleString('en-IN')}</span>
							</div>
							<div className='flex items-center justify-between text-xs py-1 text-gray-500'>
								<span>Seat Charge</span>
								<span>₹{seatTotal}</span>
							</div>
							<div className="flex justify-between text-xs text-gray-500 py-1">
								<span>Taxes & Charges × {flightData.travellers}</span>
								<span>₹{(totalTaxes).toLocaleString('en-IN')}</span>
							</div>
						</div>
						<div className='flex items-center justify-between pt-2'>
							<p className='text-xl font-semibold'>Total Amount</p>
							<p className='text-xl text-blue-600 font-semibold'>₹{grandTotal}</p>
						</div>
					</div>
					<div className='shadow-lg p-3 flex flex-col gap-3'>
						<p className='text-xl font-semibold'>Seat Legend</p>
						<div className='flex items-center justify-between text-xs font-semibold '>
							<div className='flex items-center gap-3'>
								<span className='border-2 text-2xl '><PiArmchairLight /></span>
								<p>Availabe Seat</p>
							</div>
							<span className='text-gray-500'>{availableSeats}</span>
						</div>
						<div className='flex items-center justify-between text-xs font-semibold '>
							<div className='flex items-center gap-3'>
								<span className='text-green-600 border-2 text-2xl'><PiArmchairFill /></span>
								<p>Selected Seat</p>
							</div>
							<span className='text-gray-500'>{selectedSeats.length > 0 ? selectedSeats.map((seat) => seat.seatNo).join(", ") : "--"}</span>
						</div>
						<div className='flex items-center justify-between text-xs font-semibold '>
							<div className='flex items-center gap-3'>
								<span className='text-gray-400 border-2 text-2xl'><PiArmchairFill /></span>
								<p>Occupied Seat</p>
							</div>
							<span className='text-gray-500'>{OCCUPIED_SEATS.length}</span>
						</div>
						<div className='flex items-center justify-between text-xs font-semibold '>
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
