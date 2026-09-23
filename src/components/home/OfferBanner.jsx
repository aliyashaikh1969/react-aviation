import { useNavigate } from "react-router-dom";
import { IoSunnySharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { ROUTES } from '../../constants/routes'

export const OfferBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 pb-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-navy to-[#0b3d75] py-8 px-6 sm:px-10 rounded-2xl text-white flex flex-col md:flex-row gap-6 justify-between items-center">
          <IoSunnySharp className="absolute -right-8 -top-8 text-yellow-300/10" size={200} />

          <div className="relative text-center md:text-left">
            <p className="inline-block text-xs font-semibold tracking-wider text-navy bg-yellow-300 px-3 py-1 rounded-full">
              FLAT 20% OFF
            </p>

            <p className="flex items-center justify-center md:justify-start gap-3 py-3 text-2xl sm:text-3xl font-bold">
              Summer Travel Bonanza
              <IoSunnySharp className="text-yellow-300" />
            </p>

            <p className="text-sm text-gray-300">
              Book your flights and get exciting discounts!
            </p>
          </div>

          <button
            onClick={() => navigate(ROUTES.deals)}
            className="relative w-full md:w-auto bg-white text-navy font-medium px-7 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-yellow-300 transition-colors cursor-pointer"
          >
            Explore Deals
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};
