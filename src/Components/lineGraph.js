import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({ startDate = null, endDate = null, data }) => {
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const calculateMonthlySales = async () => {
      try {
        const orderResponce = await fetch("/order_data.json");
        const orders = await orderResponce.json();
        const priceResponce = await fetch("/pricing_data.json");
        const prices = await priceResponce.json();

        const getSales = () => {
          const sales = {};

          orders.forEach((order) => {
            const orderDate = new Date(order.date);

            const { items, date } = order;
            let total = 0;
            if (
              (!startDate && !endDate) ||
              (startDate <= orderDate && orderDate <= endDate)
            ) {
              items.forEach((item) => {
                const { type, size } = item;
                total += prices[type][size];
              });

              // Parse the date to get the month name
              const monthName = new Date(date).toLocaleString("en-US", {
                month: "long",
              });

              sales[monthName] = (sales[monthName] || 0) + total;
            }
          });

          return sales;
        };

        const totalSales = getSales();

        const result = Object.entries(totalSales).map(([month, sales]) => ({
          name: month,
          sales: sales,
        }));

        setMonthlySales(result);
      } catch (error) {
        console.error("Error while feching data", error);
      }
    };

    calculateMonthlySales();
  }, [data, startDate, endDate]);

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center  hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out "
        style={{ height: "600px", width: "1200px" }}
      >
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={monthlySales}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ payload, label, active }) => {
                if (active) {
                  return (
                    <div
                      style={{
                        color: "white",
                        background: "rgba(0, 0, 0, 0.8)",
                        padding: "8px",
                        borderRadius: "5px",
                      }}
                    >
                      <p>{`Month: ${label}`}</p>
                      <p>{`Sales $: ${payload[0].value}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#008ffb"
              strokeWidth={3}
              activeDot={{ r: 10 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
        <label className="text-center text-black font-bold text-lg">
          Sales data for year 2023
        </label>
      </div>
    </>
  );
};

export default LineGraph;
