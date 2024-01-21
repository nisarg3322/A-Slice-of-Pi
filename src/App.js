import React, { useEffect, useState } from "react";

//Component imports
import PieComponent from "./Components/PieComponent";
import Header from "./Components/Header";
import BarGraph from "./Components/BarGraphComponent";
import MoneyMade from "./Components/MoneyMadeDisplay";
import LineGraph from "./Components/LineGraph";
import DatePickerTop from "./Components/DatePickerTop";
import TopPerformer from "./Components/TopPerformer";
import ReviewBox from "./Components/ReviewBox";

//react element and library imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import("./Styles/App.css");

const App = () => {
  //state property for the whole app Start date and end date.
  const [startDate, setStartDate] = useState(new Date("2023-01-02"));
  const handleStartDateChange = (date) => setStartDate(date);

  const [endDate, setEndDate] = useState(new Date("2023-12-31"));
  const handleEndDateChange = (date) => setEndDate(date);

  //data for storing orderdata fetched from database
  const [orderData, setOrderData] = useState();
  const [reviewData, setReviewData] = useState();
  const [priceData, setPriceData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await fetch("/order_data.json");
        setOrderData(await orderResponse.json());
        const reviewResponse = await fetch("/review_data.json");
        setReviewData(await reviewResponse.json());
        const priceDataResponse = await fetch("/pricing_data.json");
        setPriceData(await priceDataResponse.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="grid place-items-center">
        <div className=" w-full max-w-7xl h-full ">
          <div className="grid grid-cols-1 place-items-center m-4 gap-4  lg:grid-cols-5">
            <div className="flex flex-col items-center  gap-4 justify-center lg:flex-row  lg:col-span-5">
              <div className=" w-full h-auto lg:h-24 lg:col-span-1  ">
                {/* flex flex-col items-center justify-center w-full md:flex-row */}
                <MoneyMade orderData={orderData} priceData={priceData} />
              </div>
              <div className="w-full h-auto lg:h-24  lg:col-span-1  ">
                <DatePickerTop
                  startDate={startDate}
                  endDate={endDate}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                />
              </div>
            </div>

            <PieComponent
              startDate={startDate}
              endDate={endDate}
              reviewData={reviewData}
            />

            <div className="w-full h-full  lg:col-span-3">
              <BarGraph
                startDate={startDate}
                endDate={endDate}
                orderData={orderData}
              />
            </div>

            <div className="w-full h-full max-h-96 lg:col-span-3">
              <LineGraph
                startDate={startDate}
                endDate={endDate}
                orderData={orderData}
                priceData={priceData}
              />
            </div>

            <div className="w-full h-full max-h-96 bg-white rounded-lg p-4 shadow-lg hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out lg:col-span-2  ">
              <TopPerformer
                orderData={orderData}
                reviewData={reviewData}
                priceData={priceData}
              />
            </div>
            <div className="w-full h-full bg-white rounded-lg p-4 shadow-lg hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out lg:col-span-5 ">
              <ReviewBox reviewData={reviewData} />
            </div>
          </div>
        </div>
      </div>
      {/* for Sales data graph for 2023 */}
    </>
  );
};

export default App;
