import React, { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraph = ({ startDate = null, endDate = null, data }) => {
  const [finalData, setFinalData] = useState([]);
  const [selectedPizzaType, setSelectedPizzaType] = useState("");
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("");
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
      if (data && data.length > 0) {
        const calculateTotalOrders = () => {
          const orderTotal = {};

          data.forEach((order) => {
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
  }, [data, startDate, endDate, selectedPizzaSize, selectedPizzaType]);

  useEffect(() => {
    filterFinalData();
  }, [filterFinalData]);

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out "
        style={{ height: "500px", width: "600px", marginBottom: "20px" }}
      >
        {/* form to filter graph using pizza type and size */}

        <div className="flex gap-8 mb-4 justify-center">
          <div className="flex items-center">
            <label className="mb-1 mr-2">Pizza Type:</label>
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
            <label className="mb-1 mr-2">Pizza Size:</label>
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

        {/* div for the graph */}
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={finalData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={45}
          >
            <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "white" }}
            />
            <Legend />
            <Bar
              dataKey="orders"
              fill="#008ffb"
              activeBar={<Rectangle fill="#00588e" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarGraph;
