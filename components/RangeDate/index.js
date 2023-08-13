import { formatDateWithFullDay } from "utils/dateUtils";
import Calender from "@/assets/icons/Calender";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RangeDate = ({ dateProps }) => {
  const { startDate, setStartDate, endDate, setEndDate } = dateProps;
  return (
    <div className="mr-3 flex w-[290px] items-center justify-between rounded-lg bg-white px-4 py-2 shadow-md sm:w-[320px] md:w-[400px]">
      <div className="flex items-center">
        <span className="mr-2 h-8 w-8">
          <Calender />
        </span>
        <div>
          <label
            htmlFor="startDate"
            className="text-md cursor-pointer font-semibold text-[#EE3D3D]"
          >
            {formatDateWithFullDay(startDate)}
          </label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            dateFormat="dd-MM-yyyy"
            className="hidden w-[150px] border-none"
            placeholder="pilih tanggal"
          />
        </div>
        <div className="px-2">
          <p> - </p>
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="text-md cursor-pointer font-semibold text-[#EE3D3D]"
          >
            {formatDateWithFullDay(endDate)}
          </label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            dateFormat="dd-MM-yyyy"
            className="hidden w-[150px] border-none"
            placeholder="pilih tanggal"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeDate;
