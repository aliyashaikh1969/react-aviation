import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FlightFilters } from "../../components/flights/FlightFilters";
import { FlightCard } from "../../components/flights/FlightCard"
import { FeatureHighlights } from "../../components/common/FeatureHighlights"
import saleBack from '../../assets/sale-back.jpg'
import { useFlight } from "../../hooks/useFlight";
import { SearchModify } from "../../components/search/SearchModify";
import { useScrollToTop } from "../../hooks/useScrollToTop"
import { FaFilter } from "react-icons/fa";
import { FiX, FiCheckCircle, FiEdit2 } from "react-icons/fi";
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

    const { searchData, selectedFlight, setSelectedFlight, setSelectedReturnFlight } = useFlight()
    const isRoundTrip = searchData.tripType === "round"

    // a round trip is booked as two independent one-way searches (outbound, then return) --
    // this phase tracks which leg the traveller is currently choosing a flight for
    const [selectionPhase, setSelectionPhase] = useState("outbound") // 'outbound' | 'return'

    const [outboundFlights, setOutboundFlights] = useState([])
    const [returnFlights, setReturnFlights] = useState([])
    const hasSearched = !!(searchData.from && searchData.to && searchData.date &&
        (!isRoundTrip || searchData.returnDate))
    // if there's nothing to search for yet (e.g. a direct link to /booking), don't start out
    // "loading" -- there's no fetch about to happen, so it would never turn false again
    const [loading, setLoading] = useState(hasSearched)
    const [error, setError] = useState(null)
    const [retryKey, setRetryKey] = useState(0)

    const [showFilter, setShowFilter] = useState(false)
    const [sortBy, setSortBy] = useState("recommended")
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    // the list the traveller is currently browsing -- outbound flights, or (mid round trip) return flights
    const currentFlights = isRoundTrip && selectionPhase === "return" ? returnFlights : outboundFlights
    // which airports the current leg flies between (swapped for the return leg)
    const routeFrom = isRoundTrip && selectionPhase === "return" ? searchData.to : searchData.from
    const routeTo = isRoundTrip && selectionPhase === "return" ? searchData.from : searchData.to

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true)
            setError(null)
            setOutboundFlights([])
            setReturnFlights([])
            setSelectionPhase("outbound")
            try {
                const results = await searchFlights(searchData)
                const outbound = isRoundTrip ? results.outbound : results
                const returnLeg = isRoundTrip ? results.return : []
                setOutboundFlights(outbound)
                setReturnFlights(returnLeg)

                // start with the price slider at its maximum so nothing is filtered out
                setFilters({ ...DEFAULT_FILTERS, price: getPriceBounds(outbound).max })
            } catch (err) {
                console.error("Flight search failed:", err)
                const message = err.isNetworkError
                    ? "You appear to be offline. Check your connection and try again."
                    : "We couldn't load flights. Please try again."
                setError(message)
                toast.error(message)
            } finally {
                setLoading(false)
            }
        }
        if (hasSearched) {
            fetchFlights()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- isRoundTrip/hasSearched are derived from searchData
    }, [searchData, retryKey])

    // moving from the outbound list to the return list (or back) means a fresh set of prices --
    // reset the filters so a price cap picked for one leg doesn't hide every flight on the other.
    // Done as part of the (user-triggered) phase switch itself, not a reactive effect.
    // Memoized (stable while browsing the same fetched results) so it doesn't force every
    // <FlightCard> in the list to re-render just because e.g. the price filter moved.
    const switchPhase = useCallback((phase) => {
        setSelectionPhase(phase)
        const list = phase === "return" ? returnFlights : outboundFlights
        setFilters({ ...DEFAULT_FILTERS, price: getPriceBounds(list).max })
    }, [returnFlights, outboundFlights])

    // lock page scroll while the mobile filter drawer is open
    useEffect(() => {
        document.body.style.overflow = showFilter ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [showFilter])

    // close the mobile filter drawer with Escape too, not just the X button or backdrop click
    useEffect(() => {
        if (!showFilter) return
        const onKey = (e) => e.key === "Escape" && setShowFilter(false)
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [showFilter])

    const filteredFlights = useMemo(() => {
        const matches = currentFlights.filter(flight => {
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
    }, [currentFlights, filters, sortBy])

    const resetFilters = () => {
        setFilters({ ...DEFAULT_FILTERS, price: getPriceBounds(currentFlights).max })
    }

    // picking an outbound flight moves on to choosing the return flight (round trip) or
    // straight to seats (one way); picking a return flight always moves on to seats.
    // Memoized for the same reason as switchPhase -- it's passed as <FlightCard onSelect>,
    // so a stable identity lets a memoized FlightCard skip re-rendering on unrelated updates.
    const handleSelectFlight = useCallback((flight) => {
        if (isRoundTrip && selectionPhase === "return") {
            setSelectedReturnFlight(flight)
            nextStep()
            return
        }
        setSelectedFlight(flight)
        if (isRoundTrip) {
            switchPhase("return")
        } else {
            nextStep()
        }
    }, [isRoundTrip, selectionPhase, setSelectedFlight, setSelectedReturnFlight, switchPhase, nextStep])

    return (
        <div className="bg-[#F5F7FA] min-h-screen">
            <div
                className="w-full bg-cover bg-center px-4 pt-10 pb-8 sm:px-8 lg:px-16 relative"
                style={{ backgroundImage: `url(${saleBack})` }}
            >
                <div className="absolute inset-0 bg-navy/60" />
                <div className="relative max-w-[1600px] mx-auto">
                    <h1 className="text-3xl font-bold text-white">Search results</h1>
                    <p className="text-white/90 pt-2 pb-5 md:text-lg text-sm">
                        {!hasSearched ? "Enter your trip details below to search flights." : loading ? "Searching flights…" : (
                            <>
                                {filteredFlights.length} of {currentFlights.length} flights from{" "}
                                <span className="font-bold">{routeFrom}</span> to{" "}
                                <span className="font-bold">{routeTo}</span>
                            </>
                        )}
                    </p>
                    <SearchModify allowModify={true} />
                </div>
            </div>

            <FeatureHighlights />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pb-16">

                {isRoundTrip && hasSearched && (
                    <div className="bg-white border border-slate-200 rounded-2xl px-4 sm:px-5 py-3.5 mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">

                        <div className="flex items-center">
                            <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                                    ${selectionPhase !== "outbound" ? "bg-green-600 text-white" : "bg-navy text-white ring-4 ring-navy/10"}`}>
                                    {selectionPhase !== "outbound" ? <FiCheckCircle size={15} /> : "1"}
                                </div>
                                <div>
                                    <p className={`text-sm font-semibold leading-tight ${selectionPhase === "outbound" ? "text-navy" : "text-slate-500"}`}>Outbound</p>
                                    <p className="text-xs text-slate-400 leading-tight">{searchData.from} → {searchData.to}</p>
                                </div>
                            </div>

                            <div className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-3 rounded transition-colors ${selectionPhase !== "outbound" ? "bg-green-600" : "bg-slate-200"}`} />

                            <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                                    ${selectionPhase === "return" ? "bg-navy text-white ring-4 ring-navy/10" : "border-2 border-slate-300 text-slate-400"}`}>
                                    2
                                </div>
                                <div>
                                    <p className={`text-sm font-semibold leading-tight ${selectionPhase === "return" ? "text-navy" : "text-slate-400"}`}>Return</p>
                                    <p className="text-xs text-slate-400 leading-tight">{searchData.to} → {searchData.from}</p>
                                </div>
                            </div>
                        </div>

                        {selectionPhase === "return" && selectedFlight && (
                            <div className="flex items-center gap-3 sm:ml-auto bg-[#F5F7FA] rounded-xl pl-3 pr-1.5 py-1.5">
                                <div className="text-xs leading-tight">
                                    <p className="text-slate-400">Outbound selected</p>
                                    <p className="font-semibold text-slate-700">
                                        {selectedFlight.flights?.[0]?.airline} · {selectedFlight.flights?.[0]?.departure_airport?.time?.split(" ")[1] ?? ""}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => switchPhase("outbound")}
                                    className="flex items-center gap-1 text-xs font-semibold text-navy bg-white border border-navy/20 hover:bg-navy hover:text-white transition-colors px-3 py-1.5 rounded-lg cursor-pointer"
                                >
                                    <FiEdit2 size={12} /> Change
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                    <h2 className="font-semibold text-lg">
                        {!hasSearched ? "No search yet" : loading
                            ? "Finding the best fares…"
                            : isRoundTrip && selectionPhase === "outbound"
                                ? `Choose your outbound flight — ${filteredFlights.length} found`
                                : isRoundTrip && selectionPhase === "return"
                                    ? `Choose your return flight — ${filteredFlights.length} found`
                                    : `${filteredFlights.length} flights found`}
                    </h2>

                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="hidden sm:inline">Sort by</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                disabled={loading}
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-navy cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {SORTS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                        </label>

                        <button
                            onClick={() => setShowFilter(true)}
                            className="md:hidden flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                        >
                            <FaFilter />
                            Filters
                        </button>
                    </div>
                </div>

                <div className="flex gap-6 items-start">

                    {/* Desktop filters */}
                    <div className="hidden md:block w-[290px] shrink-0 sticky top-24">
                        <FlightFilters filters={filters} setFilters={setFilters} flights={currentFlights} />
                    </div>

                    {/* Results */}
                    <div className="flex-1 min-w-0 flex flex-col gap-5">

                        {!hasSearched && (
                            <EmptyState
                                title="Start your search"
                                text="Use the search box above to find flights — enter where you're flying from and to, and pick a date."
                            />
                        )}

                        {hasSearched && loading && [0, 1, 2].map(i => <CardSkeleton key={i} />)}

                        {hasSearched && error && !loading && (
                            <EmptyState
                                title="Something went wrong"
                                text={error}
                                action={
                                    <button
                                        onClick={() => setRetryKey(k => k + 1)}
                                        className="mt-2 bg-navy hover:bg-navy-dark text-white px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                                    >
                                        Try again
                                    </button>
                                }
                            />
                        )}

                        {hasSearched && !loading && !error && filteredFlights.length === 0 && (
                            <EmptyState
                                title="No flights found"
                                text={currentFlights.length > 0
                                    ? "No flights match your filters. Try removing some."
                                    : "Try changing the date or your airports."}
                                action={currentFlights.length > 0 && (
                                    <button
                                        onClick={resetFilters}
                                        className="mt-2 border border-navy text-navy hover:bg-navy hover:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            />
                        )}

                        {hasSearched && !loading && !error && filteredFlights.map(flight => (
                            <FlightCard
                                key={flight.booking_token}
                                flight={flight}
                                selectLabel={
                                    isRoundTrip
                                        ? selectionPhase === "return" ? "Select Return" : "Select Outbound"
                                        : "Select Flight"
                                }
                                onSelect={handleSelectFlight}
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

                            <FlightFilters filters={filters} setFilters={setFilters} flights={currentFlights} />

                            <button
                                onClick={() => setShowFilter(false)}
                                className="sticky bottom-0 bg-navy text-white py-3 rounded-xl font-medium cursor-pointer"
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
