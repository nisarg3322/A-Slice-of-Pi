/**
 * Author: Nisarg Patel
 * Project: uOttawa Outreach Technical Interview Project
 * Description: This file contains the implementation of date picker
 */

import DatePicker from "react-datepicker";

const DatePickerTop = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  return (
    <>
      <div className=" date-picker bg-white p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg hover:shadow-teal-500 transition duration-300 ease-in-out flex justify-center lg:h-full">
        <div className="mb-2 mr-3 ">
          <p className="font-sans text-slate-700 font-bold">Start date:</p>
          <DatePicker
            className="border p-2 w-28 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            style={{ width: "50px" }}
          />
        </div>
        <div className="mb-2">
          <p className="font-sans text-slate-700 font-bold">End date:</p>
          <DatePicker
            className="border p-2 w-28 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </>
  );
};

export default DatePickerTop;
