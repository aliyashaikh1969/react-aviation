import { BsAirplane } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { useFlight } from "../../hooks/useFlight";

const formatDate = (iso) => {
  if (!iso) return "---";
  const d = new Date(`${iso}T00:00`);
  return isNaN(d)
    ? iso
    : d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};

const Item = ({ label, icon, children }) => (
  <div className="flex-1 min-w-0 px-4 py-3">
    <p className="text-[11px] tracking-wider text-gray-500 font-semibold">{label}</p>
    <div className="flex items-center gap-2.5 mt-1.5">
      <span className="text-[#06448a] text-lg shrink-0">{icon}</span>
      <div className="min-w-0">{children}</div>
    </div>
  </div>
);

export const SearchSummary = ({ onModify, showModifyButton = false }) => {
  const { searchData } = useFlight();
  const { from, to, date, returnDate, tripType, travellers } = searchData;

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <Item label="FROM" icon={<FiMapPin />}>
          <p className="font-bold truncate">{from || "---"}</p>
        </Item>

        <Item label="TO" icon={<BsAirplane />}>
          <p className="font-bold truncate">{to || "---"}</p>
        </Item>

        <Item label="DEPARTURE" icon={<SlCalender />}>
          <p className="font-semibold text-sm">{formatDate(date)}</p>
          {tripType === "round" && returnDate && (
            <p className="text-xs text-gray-500">Return {formatDate(returnDate)}</p>
          )}
        </Item>

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
              Modify
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
