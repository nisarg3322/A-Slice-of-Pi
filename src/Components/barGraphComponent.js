import React, { PureComponent, useEffect, useState } from "react";
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

  useEffect(() => {
    const reRender = () => {
      filterFinalData();
    };

    reRender();
  }, [data, startDate, endDate]);

  // Filter the graph with selected pizza size and pizza type
  const filterFinalData = async () => {
    try {
      // const response = await fetch("/order_data.json");
      // const data = await response.json();

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
              if (selectedPizzaSize == "" && selectedPizzaType == "") {
                orderTotal[store] = (orderTotal[store] || 0) + 1;
              } else {
                items.forEach((item) => {
                  const { type, size } = item;
                  if (selectedPizzaType == type && selectedPizzaSize == "") {
                    orderTotal[store] = (orderTotal[store] || 0) + 1;
                  } else if (
                    selectedPizzaType == "" &&
                    selectedPizzaSize == size
                  ) {
                    orderTotal[store] = (orderTotal[store] || 0) + 1;
                  } else if (
                    selectedPizzaType == type &&
                    selectedPizzaSize == size
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
  };

  return (
    <>
      <div style={{ height: "500px", width: "700px", marginBottom: "20px" }}>
        {/* form to filter graph using pizza type and size */}
        <div style={{ display: "flex", gap: "30px", marginBottom: "20px" }}>
          <div>
            <label style={{ color: "white" }}>Pizza Type:</label>
            <select
              value={selectedPizzaType}
              onChange={(e) => setSelectedPizzaType(e.target.value)}
            >
              <option value="">All</option>
              {pizzaTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ color: "white" }}>Pizza Size:</label>
            <select
              value={selectedPizzaSize}
              onChange={(e) => setSelectedPizzaSize(e.target.value)}
            >
              <option value="">All</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <button onClick={filterFinalData}>Filter</button>
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
            barSize={60}
          >
            <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "none",
                color: "white",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "white" }}
            />
            <Legend />
            <Bar
              dataKey="orders"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarGraph;
