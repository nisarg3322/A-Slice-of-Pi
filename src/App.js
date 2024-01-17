import React, { useEffect, useState } from "react";
import PieComponent from "./Components/pieComponent"; // Make sure to use the correct path to your PieChart component
import Header from "./Components/header";
import BarGraph from "./Components/barGraphComponent";
import MoneyMade from "./Components/moneyMadeDisplay";
import LineGraph from "./Components/lineGraph";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      <div
        style={{
          backgroundColor: "#070045",
          color: "white",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Header />
        <div>
          <p>Start date:</p>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd" // adjust the date format as needed
          />
          <p>end date:</p>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd" // adjust the date format as needed
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "space-evenly",
            marginTop: "70px",
          }}
        >
          <PieComponent startDate={startDate} endDate={endDate} data={data} />
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 1px 8px rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "20px",
              color: "white",
            }}
          >
            <BarGraph startDate={startDate} endDate={endDate} data={data} />

            <MoneyMade />
          </div>
        </div>

        {/* for Sales data graph for 2023 */}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "1200px",
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "30px",
              boxShadow: "0 0px 8px rgba(255, 255, 255, 1)",
              borderRadius: "10px",
              padding: "20px",
              color: "white",
            }}
          >
            <LineGraph startDate={startDate} endDate={endDate} data={data} />
            <h3>Sales data for year 2023</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
