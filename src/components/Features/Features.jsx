import React from 'react'
import { IoPricetagsOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsCalendar2Check } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FiCalendar, FiHeadphones, FiPercent, FiShield } from 'react-icons/fi';


export const Features = () => {
	return (
		<>
			<div className="mt-3   ">

				<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

					{/* Item */}
					<div className="flex items-start gap-4 rounded-3xl border border-slate-200 p-4 bg-white">

						<div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shrink-0">
							<FiPercent />
						</div>

						<div>
							<h3 className="text-xl font-bold text-[#0A2A6B]">
								Best Price Guarantee
							</h3>

							<p className="text-slate-500 mt-2 leading-7">
								We ensure you get the best fares on every booking.
							</p>
						</div>
					</div>

					{/* Item */}
					<div className="flex items-start gap-4 rounded-3xl border border-slate-200 p-4 bg-white">

						<div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shrink-0">
							<FiHeadphones />
						</div>

						<div>
							<h3 className="text-xl font-bold text-[#0A2A6B]">
								24/7 Customer Support
							</h3>

							<p className="text-slate-500 mt-2 leading-7">
								We’re here to help you anytime, anywhere.
							</p>
						</div>
					</div>

					{/* Item */}
					<div className="flex items-start gap-4 rounded-3xl border border-slate-200 p-4 bg-white">

						<div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shrink-0">
							<FiCalendar />
						</div>

						<div>
							<h3 className="text-xl font-bold text-[#0A2A6B]">
								Easy Booking
							</h3>

							<p className="text-slate-500 mt-2 leading-7">
								Simple steps to book your perfect flight.
							</p>
						</div>
					</div>

					{/* Item */}
					<div className="flex items-start gap-4 rounded-3xl border border-slate-200 p-4 bg-white">

						<div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shrink-0">
							<FiShield />
						</div>

						<div>
							<h3 className="text-xl font-bold text-[#0A2A6B]">
								Safe & Secure
							</h3>

							<p className="text-slate-500 mt-2 leading-7">
								Your data is safe and protected with us.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
