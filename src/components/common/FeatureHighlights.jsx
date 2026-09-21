import { FiCalendar, FiHeadphones, FiPercent, FiShield } from 'react-icons/fi';

const features = [
	{ icon: FiPercent, title: "Best Price Guarantee", text: "We ensure you get the best fares on every booking." },
	{ icon: FiHeadphones, title: "24/7 Customer Support", text: "We’re here to help you anytime, anywhere." },
	{ icon: FiCalendar, title: "Easy Booking", text: "Simple steps to book your perfect flight." },
	{ icon: FiShield, title: "Safe & Secure", text: "Your data is safe and protected with us." },
];

export const FeatureHighlights = () => {
	return (
		<section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-8">
			<div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
				{features.map(({ icon: Icon, title, text }) => (
					<div
						key={title}
						className="flex items-center gap-4 rounded-3xl border border-slate-200 p-4 bg-white hover:shadow-md hover:-translate-y-0.5 transition"
					>
						<div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shrink-0">
							<Icon />
						</div>
						<div>
							<h3 className="text-base font-bold text-[#0A2A6B]">{title}</h3>
							<p className="text-sm text-slate-500 mt-1 leading-6">{text}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
