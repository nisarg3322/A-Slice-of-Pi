import React, { useCallback, useEffect, useState } from "react";
import { Chart, ArcElement } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ startDate = null, endDate = null, orderData }) => {
  //finalData filtered
  const [finalData, setFinalData] = useState([]);

  //pizza selections
  const [selectedPizzaType, setSelectedPizzaType] = useState("");
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("");

  //used to populate pizza types dynamically form database
  const [pizzaTypes, setPizzaTypes] = useState([]);

  // fetching pizza types
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
      if (orderData && orderData.length > 0) {
        const calculateTotalOrders = () => {
          const orderTotal = {};

          orderData.forEach((order) => {
            const orderDate = new Date(order.date);
            if (
              (!startDate && !endDate) ||
              (startDate <= orderDate && orderDate <= endDate)
            ) {
              const { store, items } = order;
              if (selectedPizzaSize === "" && selectedPizzaType === "") {
                orderTotal[store] = (orderTotal[store] || 0) + 1;
              } else {
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

          return orderTotal;
        };

        const orderTotals = calculateTotalOrders();

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
