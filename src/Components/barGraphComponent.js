/**
 * Author: Nisarg Patel
 * Project: uOttawa Outreach Technical Interview Project
 * Description: This file contains the implementation of Bar graph for orders sold by each store
 */

import React, { useCallback, useEffect, useState } from "react";

//chart.js import
import { Bar } from "react-chartjs-2";

/*
 * @param {startDate, endDate, orderData (object)}
 * @returns Bar graph Component
 */
const BarGraph = ({ startDate = null, endDate = null, orderData }) => {
  // Filtered finalData for graph
  const [finalData, setFinalData] = useState([]);

  //pizza selections
  const [selectedPizzaType, setSelectedPizzaType] = useState("");
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("");

  //variable to store list of pizza types fetched from database
  const [pizzaTypes, setPizzaTypes] = useState([]);

  // fetching pizza types from database
  useEffect(() => {
    // Fetch pizza types from the JSON file
    const fetchPizzaTypes = async () => {
      try {
        const typesResponse = await fetch("/pricing_data.json");
        const dataSet = await typesResponse.json();
        const types = Object.keys(dataSet);

        setPizzaTypes(types);
      } catch (error) {
        console.error("Error fetching pizza types:", error);
      }
    };
    fetchPizzaTypes();
  }, []);

  // Filter the graph with selected pizza size and pizza type
  const filterFinalData = useCallback(async () => {
    try {
      //checking if orderData is fetched or !isNull
      if (orderData && orderData.length > 0) {
        //callback function to generate a array of object for orders per store
        const calculateTotalOrders = () => {
          //variable to store the returning array
          const orderTotal = {};

          //loop to process each order
          orderData.forEach((order) => {
            const orderDate = new Date(order.date);

            //checking if the order is between the selected dates
            if (
              (!startDate && !endDate) ||
              (startDate <= orderDate && orderDate <= endDate)
            ) {
              //destructure store name and [] of items from each order
              const { store, items } = order;

              //checking if "ALL" is selected and displaying all orders
              if (selectedPizzaSize === "" && selectedPizzaType === "") {
                orderTotal[store] = (orderTotal[store] || 0) + 1;
              } else {
                //processing the order based on selected pizza type and size
                items.forEach((item) => {
                  const { type, size } = item;
                  if (selectedPizzaType === type && selectedPizzaSize === "") {
                    orderTotal[store] = (orderTotal[store] || 0) + 1;
                  } else if (
                    selectedPizzaType === "" &&
                    selectedPizzaSize === size
                  ) {
                    orderTotal[store] = (orderTotal[store] || 0) + 1;
                  } else if (
                    selectedPizzaType === type &&
                    selectedPizzaSize === size
                  ) {
                    orderTotal[store] = (orderTotal[store] || 0) + 1;
                  }
                });
              }
            }
          });

          //returning final list of orders
          return orderTotal;
        };

        const orderTotals = calculateTotalOrders();

        //creating a json object to store store and order count
        const result = Object.entries(orderTotals).map(([store, count]) => ({
          name: store,
          orders: count,
        }));

        setFinalData(result);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  }, [orderData, startDate, endDate, selectedPizzaSize, selectedPizzaType]);

  useEffect(() => {
    filterFinalData();
  }, [filterFinalData]);

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col justify-center hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out h-96 lg:h-full  w-full ">
        {/* form to filter graph using pizza type and size */}
        <div className="flex gap-8 mb-4  justify-center">
          <div className="flex items-center">
            <label className="mb-1 mr-2 font-bold font-sans text-slate-700">
              Pizza Type:
            </label>
            <select
              value={selectedPizzaType}
              onChange={(e) => setSelectedPizzaType(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              {pizzaTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="mb-1 mr-2 font-bold font-sans text-slate-700">
              <p>Pizza Size:</p>
            </label>
            <select
              value={selectedPizzaSize}
              onChange={(e) => setSelectedPizzaSize(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
        </div>

        {/* bar graph section */}
        <Bar
          options={{
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Orders",
                  font: {
                    weight: "bold", // Bold y-axis text
                  },
                },
              },
            },
            plugins: {
              title: {
                text: "No. of Order by stores",
                display: true,
                font: { size: 25 },
              },
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels: finalData.map((entry) => entry.name),

            datasets: [
              {
                borderRadius: 10,
                barThickness: 60,
                data: finalData.map((entry) => entry.orders),

                backgroundColor: [
                  "rgba(255, 99, 132)",
                  "rgba(255, 159, 64 )",
                  "rgba(255, 205, 86)",
                  "rgba(75, 192, 192)",
                  "rgba(54, 162, 235)",
                  "rgba(153, 102, 255)",
                  "rgba(201, 203, 207)",
                ],
                borderWidth: 2,
              },
            ],
          }}
        ></Bar>
      </div>
    </>
  );
};

export default BarGraph;
