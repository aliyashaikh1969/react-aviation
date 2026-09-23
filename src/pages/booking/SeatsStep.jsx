import { SearchSummary } from '../../components/search/SearchSummary'
import { PiArmchairFill } from "react-icons/pi";
import { IoIosExit } from "react-icons/io";
import { BsAirplaneFill } from "react-icons/bs";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import airplane from '../../assets/airplaneleft.webp'
import { FaArrowLeft } from "react-icons/fa6";
import { WhyChooseUs } from '../../components/common/WhyChooseUs';
import { useFlight } from '../../hooks/useFlight';
import { seatLayoutData, TOTAL_SEAT_COUNT, OCCUPIED_SEAT_NUMBERS, isPremiumSeat, PREMIUM_PRICE_THRESHOLD } from '../../data/seatLayout';
import toast from "react-hot-toast";
import { FiHeadphones } from 'react-icons/fi';
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { Link } from 'react-router-dom';
import { useFare } from '../../hooks/useFare'
import { inr, splitDateTime } from '../../utils/format'
import { getStopsBadge, summarizeFlight } from '../../utils/flight'
import { FlightPath } from '../../components/flights/FlightPath'
import { ROUTES } from '../../constants/routes'

const seatAlpha = ["F", "E", "D", null, "C", "B", "A"]

const SeatIcon = ({ state }) => (
	<span className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0
		${state === "selected" ? "bg-green-500 border-green-500 text-white"
			: state === "occupied" ? "bg-gray-200 border-gray-300 text-gray-400"
				: state === "premium" ? "bg-amber-50 border-amber-400 text-amber-600"
					: "bg-white border-blue-500 text-blue-500"}`}>
		<PiArmchairFill className='text-xl' />
	</span>
)

export const SeatsStep = ({ nextStep, prevStep }) => {

	useScrollToTop();

	const { selectedFlight, selectedReturnFlight, selectedSeats, setSelectedSeats, searchData } = useFlight()
	const { travellers, baseFare, seatTotal, taxes, grandTotal } = useFare()
	const isRoundTrip = searchData.tripType === "round"

	const { legs, first: firstLeg, last: lastLeg, stops } = summarizeFlight(selectedFlight)
	const departure = splitDateTime(firstLeg?.departure_airport?.time)
	const arrival = splitDateTime(lastLeg?.arrival_airport?.time)

	const returnSummary = summarizeFlight(selectedReturnFlight)
	const returnDeparture = splitDateTime(returnSummary.first?.departure_airport?.time)
	const returnArrival = splitDateTime(returnSummary.last?.arrival_airport?.time)

	const availableSeats = TOTAL_SEAT_COUNT - selectedSeats.length - OCCUPIED_SEAT_NUMBERS.length
	const seatsLeft = travellers - selectedSeats.length

	const handleSeatSelect = (seat) => {
		if (seat.booked) return;

		const alreadySelected = selectedSeats.some(s => s.seatNo === seat.seatNo)

		if (alreadySelected) {
			setSelectedSeats(selectedSeats.filter((item) => item.seatNo !== seat.seatNo));
			return;
		}

		// block picking more seats than there are travellers, instead of silently swapping one out
		if (selectedSeats.length >= travellers) {
			toast.error(
				travellers === 1
					? "You can only select 1 seat. Deselect it first to choose another."
					: `You can only select ${travellers} seats. Deselect one first.`
			);
			return;
		}

		setSelectedSeats([...selectedSeats, seat]);
		toast.success(`Seat ${seat.seatNo} selected`);
	};

	const handleNextStep = () => {
		if (selectedSeats.length === travellers) nextStep()
		else toast.error(`Please select ${seatsLeft} more seat${seatsLeft > 1 ? "s" : ""}`)
	}

	const clearSeats = () => setSelectedSeats([])

	return (
		<div className="bg-[#F5F7FA]">
			<div className='max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pt-6'>
				<h2 className='md:text-2xl text-xl text-navy font-bold'>Choose your seats</h2>
				<p className='text-slate-600 py-2 text-sm'>
					Select your preferred seats and enjoy your journey.
					{isRoundTrip && " Your selection applies to both your outbound and return flights."}
				</p>
				<SearchSummary />
			</div>

			<div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-5 flex flex-col xl:flex-row gap-5">

				{/* Seat map */}
				<div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full xl:w-[70%] flex flex-col p-4">
					<div className='flex items-center justify-between gap-3 pb-4 flex-wrap'>
						<div>
							<p className='text-xs text-slate-500 font-semibold uppercase tracking-wide'>Select seats</p>
							<div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1'>
								<div className='flex items-center gap-3 font-bold text-navy'>
									<span>{firstLeg?.departure_airport?.id}</span>
									<FaArrowRight className='text-slate-400' />
									<span>{lastLeg?.arrival_airport?.id}</span>
								</div>
								<span className='text-sm text-slate-500'>{legs.map(l => l.flight_number).join(" · ")}</span>
							</div>
						</div>
						<span className='bg-blue-50 rounded-full px-3 py-1 font-semibold text-xs text-blue-700'>
							{legs.map(l => l.airplane).filter(Boolean).join(", ")}
						</span>
					</div>

					{/* Legend */}
					<div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600'>
						<div className='flex items-center gap-2'><SeatIcon />Available</div>
						<div className='flex items-center gap-2'><SeatIcon state="premium" />Premium</div>
						<div className='flex items-center gap-2'><SeatIcon state="selected" />Selected</div>
						<div className='flex items-center gap-2'><SeatIcon state="occupied" />Occupied</div>
						<div className='flex items-center gap-2'><span className='text-red-500 text-xs font-bold'>EXIT</span>Emergency exit</div>
					</div>

					<p className='text-xs text-slate-400 mt-2 xl:hidden'>Scroll sideways to view the whole cabin →</p>

					<div className='relative overflow-x-auto overflow-y-hidden rounded-2xl border bg-white my-4'>
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

													const isOccupied = seat.booked;
													const isPremium = isPremiumSeat(seat);

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
															aria-label={`Seat ${seat.seatNo}, ${seat.type}${isPremium ? ", premium" : ""}, ${inr(seat.price)}${isOccupied ? ", occupied" : ""}`}
															aria-pressed={isSelected}
															disabled={isOccupied} className={`z-10 relative group w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200
																${isOccupied ? "bg-gray-200 border-gray-300 cursor-not-allowed" : isSelected
																	? "bg-green-500 border-green-500 text-white"
																	: isPremium
																		? "bg-amber-50 border-amber-400 text-amber-600 hover:bg-amber-100"
																		: "bg-white border-blue-500 text-blue-500 hover:bg-blue-50"
																}`}>

															<PiArmchairFill className="text-2xl rotate-90 " />
															<div className=" absolute -top-14 left-1/2 -translate-x-1/2 hidden group-hover:flex gap-2 items-center bg-black text-white text-[10px] px-2 py-1 rounded-md z-100 whitespace-nowrap">
																<span>Seat:{seat.seatNo} </span>
																<span>₹{seat.price}</span>
																<span>{seat.type}</span>
																{isPremium && <span className="text-amber-300">Premium</span>}

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
					</div>

					{/* Selection bar */}
					<div className='bg-blue-50 text-navy rounded-xl flex items-center justify-between gap-3 p-3 flex-wrap'>
						<p className='text-sm'>
							Selected ({selectedSeats.length}/{travellers}):{" "}
							<span className='text-green-600 font-semibold'>
								{selectedSeats.length > 0 ? selectedSeats.map((seat) => seat.seatNo).join(", ") : "--"}
							</span>
						</p>
						<button
							className='text-xs text-red-600 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer'
							onClick={clearSeats}
							disabled={selectedSeats.length === 0}
						>
							Clear selection
						</button>
					</div>

					<div className='flex items-center justify-between pt-4 gap-3'>
						<button
							onClick={prevStep}
							className='text-navy gap-3 flex items-center border-2 border-slate-200 hover:bg-slate-50 rounded-xl px-4 py-3 cursor-pointer'
						>
							<FaArrowLeft />Back
						</button>
						<button
							onClick={handleNextStep}
							className='flex items-center gap-4 bg-navy hover:bg-navy-dark transition-colors px-5 py-3 rounded-xl text-white text-sm font-medium cursor-pointer'
						>
							Continue to summary <FaAngleRight />
						</button>
					</div>
				</div>

				{/* Sidebar */}
				<div className='w-full xl:w-[30%] flex flex-col gap-5 xl:sticky xl:top-24 self-start'>

					<div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5'>
						<p className='text-xl font-bold text-navy mb-4'>Booking summary</p>

						{isRoundTrip && (
							<div className='flex items-center gap-2 mb-3'>
								<span className='w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0'>
									<BsAirplaneFill className='text-blue-600 text-[10px]' />
								</span>
								<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Outbound</p>
							</div>
						)}
						<div className='flex items-center justify-between text-sm pb-4'>
							<span className='text-slate-500'>Airline</span>
							<span className='font-semibold'>{firstLeg?.airline}</span>
						</div>

						<div className={`flex items-center justify-between gap-3 pb-4 ${isRoundTrip ? "" : "border-b"}`}>
							<div>
								<p className='text-2xl font-bold text-navy'>{firstLeg?.departure_airport?.id}</p>
								<p className='text-sm text-gray-800 font-medium'>{departure.time}</p>
								<p className='text-xs text-gray-500'>{departure.date}</p>
							</div>

							<FlightPath duration={selectedFlight?.total_duration} {...getStopsBadge(stops)} />

							<div className='text-right'>
								<p className='text-2xl font-bold text-navy'>{lastLeg?.arrival_airport?.id}</p>
								<p className='text-sm text-gray-800 font-medium'>{arrival.time}</p>
								<p className='text-xs text-gray-500'>{arrival.date}</p>
							</div>
						</div>

						{isRoundTrip && (
							<>
								<div className='flex items-center gap-2 mb-3 pt-3 mt-1 border-t border-dashed border-slate-200'>
									<span className='w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0'>
										<BsAirplaneFill className='text-amber-600 text-[10px] -rotate-[135deg]' />
									</span>
									<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Return</p>
								</div>
								<div className='flex items-center justify-between text-sm pb-4'>
									<span className='text-slate-500'>Airline</span>
									<span className='font-semibold'>{returnSummary.first?.airline}</span>
								</div>
								<div className='flex items-center justify-between gap-3 pb-4 border-b'>
									<div>
										<p className='text-2xl font-bold text-navy'>{returnSummary.first?.departure_airport?.id}</p>
										<p className='text-sm text-gray-800 font-medium'>{returnDeparture.time}</p>
										<p className='text-xs text-gray-500'>{returnDeparture.date}</p>
									</div>

									<FlightPath duration={selectedReturnFlight?.total_duration} {...getStopsBadge(returnSummary.stops)} />

									<div className='text-right'>
										<p className='text-2xl font-bold text-navy'>{returnSummary.last?.arrival_airport?.id}</p>
										<p className='text-sm text-gray-800 font-medium'>{returnArrival.time}</p>
										<p className='text-xs text-gray-500'>{returnArrival.date}</p>
									</div>
								</div>
							</>
						)}

						<div className='flex items-center justify-between py-3 border-b text-sm'>
							<p className='text-slate-500'>Passengers</p>
							<p className='font-semibold'>{travellers} Adult{travellers > 1 ? "s" : ""}</p>
						</div>
						<div className='flex items-center justify-between py-3 border-b text-sm'>
							<p className='text-slate-500'>Seats</p>
							<p className='font-semibold'>
								{selectedSeats.length > 0 ? selectedSeats.map(s => s.seatNo).join(", ") : "--"}
							</p>
						</div>

						<div className='py-3 border-b space-y-2'>
							<p className='font-semibold'>Fare details</p>
							<div className="flex justify-between text-sm text-gray-500">
								<span>Base fare × {travellers}</span>
								<span>{inr(baseFare)}</span>
							</div>
							<div className='flex justify-between text-sm text-gray-500'>
								<span>Seat charges</span>
								<span>{inr(seatTotal)}</span>
							</div>
							<div className="flex justify-between text-sm text-gray-500">
								<span>Taxes & charges × {travellers}</span>
								<span>{inr(taxes)}</span>
							</div>
						</div>

						<div className='flex items-center justify-between pt-3'>
							<p className='text-lg font-bold'>Total</p>
							<p className='text-xl text-blue-600 font-bold'>{inr(grandTotal)}</p>
						</div>
					</div>

					<div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-3'>
						<p className='text-xl font-bold text-navy'>Seat legend</p>
						<div className='flex items-center justify-between text-sm'>
							<div className='flex items-center gap-3'><SeatIcon /><p>Available</p></div>
							<span className='text-gray-500'>{availableSeats}</span>
						</div>
						<div className='flex items-center justify-between text-sm'>
							<div className='flex items-center gap-3'><SeatIcon state="premium" /><p>Premium</p></div>
							<span className='text-gray-500'>{inr(PREMIUM_PRICE_THRESHOLD)}+</span>
						</div>
						<div className='flex items-center justify-between text-sm'>
							<div className='flex items-center gap-3'><SeatIcon state="selected" /><p>Selected</p></div>
							<span className='text-gray-500'>{selectedSeats.length}</span>
						</div>
						<div className='flex items-center justify-between text-sm'>
							<div className='flex items-center gap-3'><SeatIcon state="occupied" /><p>Occupied</p></div>
							<span className='text-gray-500'>{OCCUPIED_SEAT_NUMBERS.length}</span>
						</div>
						<div className='flex items-center justify-between text-sm'>
							<div className='flex items-center gap-3'>
								<span className='text-red-600 w-8 h-8 rounded-lg border-2 border-red-200 flex items-center justify-center text-xl'><IoIosExit /></span>
								<p>Emergency exit</p>
							</div>
							<span className='text-gray-500'>Extra legroom</span>
						</div>
					</div>

					<div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5'>
						<p className='text-xl font-bold text-navy'>Need help?</p>
						<p className='text-sm text-slate-600 mt-1'>Our customer support is available 24/7 to assist you.</p>
						<Link
							to={ROUTES.contact}
							className='mt-4 inline-flex items-center gap-2 border border-navy text-navy hover:bg-navy hover:text-white transition-colors px-5 py-2.5 rounded-xl text-sm font-medium'
						>
							<FiHeadphones />
							Contact support
						</Link>
					</div>
				</div>
			</div>
			<WhyChooseUs />
		</div>
	)
}
