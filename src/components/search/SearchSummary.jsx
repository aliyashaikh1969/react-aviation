import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { useFlight } from "../../hooks/useFlight";
import { formatDate } from "../../utils/format";

const Item = ({ label, icon, children, className = "" }) => (
  <div className={`flex-1 min-w-0 px-4 py-3 ${className}`}>
    <p className="text-[11px] tracking-wider text-gray-500 font-semibold">{label}</p>
    <div className="flex items-center gap-2.5 mt-1.5">
      <span className="text-[#06448a] text-lg shrink-0">{icon}</span>
      <div className="min-w-0">{children}</div>
    </div>
  </div>
);

const TRIP_TYPE_LABEL = { round: "Round trip", oneway: "One way" };

export const SearchSummary = ({ onModify, showModifyButton = false }) => {
  const { searchData } = useFlight();
  const { from, to, date, returnDate, tripType, travellers } = searchData;
  const isRoundTrip = tripType === "round";

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">

        <Item label="ROUTE" icon={<FiMapPin />} className="md:flex-[1.4]">
          <div className="flex items-center gap-2 font-bold truncate">
            <span className="truncate">{from || "---"}</span>
            <FiArrowRight className="text-gray-400 shrink-0" size={14} />
            <span className="truncate">{to || "---"}</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
            {TRIP_TYPE_LABEL[tripType] ?? "One way"}
          </span>
        </Item>

        <Item label="DEPARTURE" icon={<SlCalender />}>
          <p className="font-semibold text-sm">{formatDate(date)}</p>
        </Item>

        {isRoundTrip && (
          <Item label="RETURN" icon={<SlCalender />}>
            <p className="font-semibold text-sm">{returnDate ? formatDate(returnDate) : "---"}</p>
          </Item>
        )}

        <Item label="PASSENGERS & CLASS" icon={<IoPersonOutline />}>
          <p className="font-semibold text-sm">
            {travellers} {travellers > 1 ? "Adults" : "Adult"}
          </p>
          <p className="text-xs text-gray-500">Economy</p>
        </Item>

        {showModifyButton && (
          <div className="flex items-center justify-center p-3">
            <button
              type="button"
              onClick={onModify}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#031e3d] hover:bg-[#052a5a] transition-colors px-6 py-3 rounded-xl text-white text-sm font-medium cursor-pointer"
            >
              <PiPencilSimpleLineLight />
              Modify Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
