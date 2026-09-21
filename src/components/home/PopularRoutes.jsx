import { Link } from 'react-router-dom'
import { GiCommercialAirplane } from 'react-icons/gi';
import { IoIosAirplane } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import eiffelTowerImg from "../../assets/eiffel-tower.png"
import maldivesImg from "../../assets/maldives.png"
import baliImg from "../../assets/bali.png"
import { ROUTES } from '../../constants/routes'

// placeholder routes and fares (static demo data)
const routes = [
    { from: "Delhi", to: "Paris", price: "38,499", img: eiffelTowerImg },
    { from: "Delhi", to: "Maldives", price: "24,999", img: maldivesImg },
    { from: "Delhi", to: "Bali", price: "29,799", img: baliImg },
];

export const PopularRoutes = () => {
    return (
        <section className="bg-gray-100 py-8">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
                <div className="flex items-center justify-between pb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[#06448a] text-3xl"><GiCommercialAirplane /></span>
                        <h2 className="font-bold text-2xl">Popular Routes</h2>
                    </div>
                    <Link to={ROUTES.deals} className="text-[#06448a] font-medium hover:underline">View All</Link>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {routes.map((r) => (
                        <article
                            key={r.to}
                            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={r.img}
                                    alt={r.to}
                                    loading="lazy"
                                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{r.from}</p>
                                    <span className="text-xl text-[#06448a]"><IoIosAirplane /></span>
                                    <p className="font-semibold">{r.to}</p>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                    <span>Starting from</span>
                                    <span className="text-[#06448a] flex items-center font-bold text-lg">
                                        <FaIndianRupeeSign size={14} />{r.price}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
