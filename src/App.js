import React from "react";
import PieComponent from "./Components/pieComponent"; // Make sure to use the correct path to your PieChart component
import Header from "./Components/header";
import BarGraph from "./Components/barGraphComponent";
import MoneyMade from "./Components/moneyMadeDisplay";
import LineGraph from "./Components/lineGraph";

const App = () => {
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
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "space-evenly",
            marginTop: "70px",
          }}
        >
          <PieComponent />
          <div style={{flexDirection: "column",
              display: "flex",justifyContent: "center",alignItems: "center",boxShadow: "0 1px 8px rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "20px",
              color: "white"}}>
            <BarGraph />

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
            <LineGraph />
            <h3>Sales data for year 2023</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
