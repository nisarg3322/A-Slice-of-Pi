/**
 * Author: Nisarg Patel
 * Project: uOttawa Outreach Technical Interview Project
 * Description: This file contains the implementation of line graph to display monthly revenue
 */

import React, { useEffect, useState } from "react";

//imports for chartjs
import { Line } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js/auto";

//returning component for line graph
const LineGraph = ({
  startDate = null,
  endDate = null,
  orderData,
  priceData,
}) => {
  //State to store final monthly sales data for graph
  const [monthlySales, setMonthlySales] = useState([]);

  //to process data for graph
  useEffect(() => {
    //callback function for getting array of months and sales respectively
    const calculateMonthlySales = () => {
      try {
        //get sales array
        const totalSales = getSales();

        // creating the final array for the graph
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

  //to get a array of {month:sales} for each month
  const getSales = () => {
    //checking if orderData and priceData is fetched from the data base
    if ((orderData, priceData)) {
      const sales = {};

      orderData.forEach((order) => {
        const orderDate = new Date(order.date);

        const { items, date } = order;
        let total = 0;

        //checking if order is between the selected range
        if (
          (!startDate && !endDate) ||
          (startDate <= orderDate && orderDate <= endDate)
        ) {
          //getting total for that order
          items.forEach((item) => {
            const { type, size } = item;
            total += priceData[type][size];
          });

          // Parse the date to get the month name
          const monthName = new Date(date).toLocaleString("en-US", {
            month: "long",
          });

          //adding that to month if exist in the array or creating a new field for that month
          sales[monthName] = (sales[monthName] || 0) + total;
        }
      });

      return sales;
    }
  };

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
