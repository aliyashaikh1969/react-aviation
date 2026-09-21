import { FiGlobe, FiTag, FiZap, FiUsers } from "react-icons/fi";

const reasons = [
  { icon: FiGlobe, title: "Wide Choices", text: "Compare flights across airlines and routes in one place." },
  { icon: FiTag, title: "Affordable Fares", text: "Competitive prices with no hidden charges." },
  { icon: FiZap, title: "Smooth Experience", text: "Search, choose seats and pay in a few quick steps." },
  { icon: FiUsers, title: "Trusted by Millions", text: "Travellers rely on us for safe, secure bookings." },
];

export const WhyChooseUs = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Why choose SkyAero</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {reasons.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center text-center gap-3 p-4">
            <div className="bg-[#5ac3fc4c] rounded-2xl w-14 h-14 flex items-center justify-center text-2xl text-[#06448a]">
              <Icon />
            </div>
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-sm text-gray-500 max-w-[220px]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
