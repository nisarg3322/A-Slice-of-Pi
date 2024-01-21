import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js/auto";

const LineGraph = ({
  startDate = null,
  endDate = null,
  orderData,
  priceData,
}) => {
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const calculateMonthlySales = () => {
      try {
        const getSales = () => {
          if ((orderData, priceData)) {
            const sales = {};

            orderData.forEach((order) => {
              const orderDate = new Date(order.date);

              const { items, date } = order;
              let total = 0;
              if (
                (!startDate && !endDate) ||
                (startDate <= orderDate && orderDate <= endDate)
              ) {
                items.forEach((item) => {
                  const { type, size } = item;
                  total += priceData[type][size];
                });

                // Parse the date to get the month name
                const monthName = new Date(date).toLocaleString("en-US", {
                  month: "long",
                });

                sales[monthName] = (sales[monthName] || 0) + total;
              }
            });

            return sales;
          }
        };

        const totalSales = getSales();

        if (totalSales) {
          const result = Object.entries(totalSales).map(([month, sales]) => ({
            name: month,
            sales: sales,
          }));

          setMonthlySales(result);
        }
      } catch (error) {
        console.error("Error while feching data", error);
      }
    };

    calculateMonthlySales();
  }, [priceData, startDate, endDate]);

  return (
    <>
      <div className=" bg-white  rounded-lg shadow-lg p-6  hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out flex justify-center h-full w-full">
        <Line
          options={{
            animations: {
              tension: {
                duration: 2000,
                easing: "linear",
                from: 0.4,
                to: 0,
                loop: true,
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Revenue $",
                  font: {
                    weight: "bold", // Bold y-axis text
                  },
                },
              },
            },
            plugins: {
              title: {
                text: "Monthly revenue",
                display: true,
                font: { size: 25 },
              },
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels: monthlySales.map((entry) => entry.name),

            datasets: [
              {
                fill: true,
                pointBackgroundColor: "blue",

                data: monthlySales.map((entry) => entry.sales),
                backgroundColor: "#D8D8FA",
                borderWidth: 3,
              },
            ],
          }}
        ></Line>
      </div>
    </>
  );
};

export default LineGraph;
