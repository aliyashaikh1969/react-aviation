import { useEffect, useMemo, useState } from "react";
import { FlightFilters } from "../../components/flights/FlightFilters";
import { FlightCard } from "../../components/flights/FlightCard"
import { FeatureHighlights } from "../../components/common/FeatureHighlights"
import saleBack from '../../assets/sale-back.jpg'
import { useFlight } from "../../hooks/useFlight";
import { SearchModify } from "../../components/search/SearchModify";
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { FaFilter } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { searchFlights } from "../../services/flightService"
import { getPriceBounds, getTimeSlot, summarizeFlight } from "../../utils/flight"
import { EmptyState } from "../../components/ui/EmptyState"

const DEFAULT_FILTERS = { price: 15000, stops: [], airlines: [], departure: [], arrival: [] }

const SORTS = [
    { key: "recommended", label: "Recommended" },
    { key: "cheapest", label: "Cheapest first" },
    { key: "fastest", label: "Fastest first" },
    { key: "earliest", label: "Earliest departure" },
]

const depTimeOf = (f) => f.flights?.[0]?.departure_airport?.time ?? ""

const CardSkeleton = () => (
    <div className="bg-white rounded-2xl p-5 animate-pulse flex flex-col lg:flex-row gap-5">
        <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                </div>
            </div>
            <div className="h-10 bg-gray-100 rounded-lg" />
        </div>
        <div className="lg:w-[170px] h-20 bg-gray-100 rounded-xl" />
    </div>
)

export const ResultsStep = ({ nextStep }) => {
    useScrollToTop();

    const { searchData } = useFlight()
    const [allFlights, setAllFlights] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [retryKey, setRetryKey] = useState(0)

    const [showFilter, setShowFilter] = useState(false)
    const [sortBy, setSortBy] = useState("recommended")
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true)
            setError(null)
            setAllFlights([])
            try {
                const results = await searchFlights(searchData)
                setAllFlights(results)

                // start with the price slider at its maximum so nothing is filtered out
                setFilters({ ...DEFAULT_FILTERS, price: getPriceBounds(results).max })
            } catch (err) {
                console.error("Flight search failed:", err)
                setError(err.isNetworkError
                    ? "You appear to be offline. Check your connection and try again."
                    : "We couldn't load flights. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        if (searchData.from && searchData.to && searchData.date) {
            fetchFlights()
        }
    }, [searchData, retryKey])

    // lock page scroll while the mobile filter drawer is open
    useEffect(() => {
        document.body.style.overflow = showFilter ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [showFilter])

    const filteredFlights = useMemo(() => {
        const matches = allFlights.filter(flight => {
            const { first, last, stops: stopsCount } = summarizeFlight(flight)

            const priceMatch = flight.price <= filters.price

            const stopsMatch = filters.stops.length === 0 || filters.stops.includes(Math.min(stopsCount, 2))

            const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(first?.airline)

            const departureMatch = filters.departure.length === 0 ||
                filters.departure.includes(getTimeSlot(first?.departure_airport?.time))

            const arrivalMatch = filters.arrival.length === 0 ||
                filters.arrival.includes(getTimeSlot(last?.arrival_airport?.time))

            return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch
        })

        const sorted = [...matches]
        if (sortBy === "cheapest") sorted.sort((a, b) => a.price - b.price)
        if (sortBy === "fastest") sorted.sort((a, b) => (a.total_duration ?? 0) - (b.total_duration ?? 0))
        if (sortBy === "earliest") sorted.sort((a, b) => depTimeOf(a).localeCompare(depTimeOf(b)))
        return sorted
    }, [allFlights, filters, sortBy])

    const resetFilters = () => {
        setFilters({ ...DEFAULT_FILTERS, price: getPriceBounds(allFlights).max })
    }

    return (
        <div className="bg-[#F5F7FA] min-h-screen">
            <div
                className="w-full bg-cover bg-center px-4 pt-10 pb-8 sm:px-8 lg:px-16 relative"
                style={{ backgroundImage: `url(${saleBack})` }}
            >
                <div className="absolute inset-0 bg-[#031e3d]/60" />
                <div className="relative max-w-[1600px] mx-auto">
                    <h1 className="text-3xl font-bold text-white">Search results</h1>
                    <p className="text-white/90 pt-2 pb-5 md:text-lg text-sm">
                        {loading ? "Searching flights…" : (
                            <>
                                {filteredFlights.length} of {allFlights.length} flights from{" "}
                                <span className="font-bold">{searchData.from}</span> to{" "}
                                <span className="font-bold">{searchData.to}</span>
                            </>
                        )}
                    </p>
                    <SearchModify allowModify={true} />
                </div>
            </div>

            <FeatureHighlights />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pb-16">

                <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                    <h2 className="font-semibold text-lg">
                        {loading ? "Finding the best fares…" : `${filteredFlights.length} flights found`}
                    </h2>

                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="hidden sm:inline">Sort by</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                disabled={loading}
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#031e3d] cursor-pointer"
                            >
                                {SORTS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                        </label>

                        <button
                            onClick={() => setShowFilter(true)}
                            className="md:hidden flex items-center gap-2 bg-[#031e3d] text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                        >
                            <FaFilter />
                            Filters
                        </button>
                    </div>
                </div>

                <div className="flex gap-6 items-start">

                    {/* Desktop filters */}
                    <div className="hidden md:block w-[290px] shrink-0 sticky top-24">
                        <FlightFilters filters={filters} setFilters={setFilters} flights={allFlights} />
                    </div>

                    {/* Results */}
                    <div className="flex-1 min-w-0 flex flex-col gap-5">

                        {loading && [0, 1, 2].map(i => <CardSkeleton key={i} />)}

                        {error && !loading && (
                            <EmptyState
                                title="Something went wrong"
                                text={error}
                                action={
                                    <button
                                        onClick={() => setRetryKey(k => k + 1)}
                                        className="mt-2 bg-[#031e3d] hover:bg-[#052a5a] text-white px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                                    >
                                        Try again
                                    </button>
                                }
                            />
                        )}

                        {!loading && !error && filteredFlights.length === 0 && (
                            <EmptyState
                                title="No flights found"
                                text={allFlights.length > 0
                                    ? "No flights match your filters. Try removing some."
                                    : "Try changing the date or your airports."}
                                action={allFlights.length > 0 && (
                                    <button
                                        onClick={resetFilters}
                                        className="mt-2 border border-[#031e3d] text-[#031e3d] hover:bg-[#031e3d] hover:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            />
                        )}

                        {!loading && !error && filteredFlights.map(flight => (
                            <FlightCard
                                key={flight.booking_token}
                                flight={flight}
                                onSelect={nextStep}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile filter drawer */}
                {showFilter && (
                    <>
                        <div
                            onClick={() => setShowFilter(false)}
                            className="fixed inset-0 bg-black/50 z-40"
                        />
                        <div className="fixed top-0 left-0 h-full w-[88%] max-w-sm bg-[#F5F7FA] z-50 overflow-y-auto p-4 shadow-xl flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Filters</h3>
                                <button
                                    onClick={() => setShowFilter(false)}
                                    aria-label="Close filters"
                                    className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <FlightFilters filters={filters} setFilters={setFilters} flights={allFlights} />

                            <button
                                onClick={() => setShowFilter(false)}
                                className="sticky bottom-0 bg-[#031e3d] text-white py-3 rounded-xl font-medium cursor-pointer"
                            >
                                Show {filteredFlights.length} flights
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
