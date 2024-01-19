import React, { useEffect, useState } from "react";
import PieComponent from "./Components/PieComponent"; // Make sure to use the correct path to your PieChart component
import Header from "./Components/Header";
import BarGraph from "./Components/BarGraphComponent";
import MoneyMade from "./Components/MoneyMadeDisplay";
import LineGraph from "./Components/LineGraph";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import("./Styles/App.css");

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2023-01-02"));
  const handleStartDateChange = (date) => setStartDate(date);

  const [endDate, setEndDate] = useState(new Date("2023-12-31"));
  const handleEndDateChange = (date) => setEndDate(date);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/order_data.json");
        setData(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <Header />

        <div>
          <div className="date-picker-container flex justify-evenly ">
            <MoneyMade />

            <div className="date-picker bg-white p-6 rounded-lg shadow-md border border-gray-300 flex flex-col lg:flex-row items-start lg:items-center hover:shadow-lg hover:shadow-teal-500 transition duration-300 ease-in-out">
              <div className="mb-2 lg:mr-4">
                <p>Start date:</p>
                <DatePicker
                  className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div className="mt-4 lg:mt-0">
                <p>End date:</p>
                <DatePicker
                  className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex  justify-evenly mt-10">
          <PieComponent startDate={startDate} endDate={endDate} data={data} />

          <BarGraph startDate={startDate} endDate={endDate} data={data} />
        </div>

        {/* for Sales data graph for 2023 */}
        <div className="line-chart-section  mb-20">
          <div className="line-chart w-full flex flex-col items-center justify-center mt-10">
            <LineGraph startDate={startDate} endDate={endDate} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
