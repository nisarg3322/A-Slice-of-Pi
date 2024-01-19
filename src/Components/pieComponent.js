import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";

const PieComponent = ({ startDate = null, endDate = null, data }) => {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const response = await fetch("/review_data.json");
        const data = await response.json();

        if (data.length > 0) {
          const calculateSentimentTotals = () => {
            const sentimentTotals = {};

            data.forEach((review) => {
              const orderDate = new Date(review.date);
              if (
                (!startDate && !endDate) ||
                (startDate <= orderDate && orderDate <= endDate)
              ) {
                const { sentiment } = review;
                sentimentTotals[sentiment] =
                  (sentimentTotals[sentiment] || 0) + 1;
              }
            });

            return sentimentTotals;
          };

          const sentimentTotals = calculateSentimentTotals();
          console.log(Object.keys(sentimentTotals));

          setFinalData(sentimentTotals);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchDataAndProcess();
  }, [data, startDate, endDate]);

  const chartOptions = {
    labels: Object.keys(finalData),
    options: {
      chart: {
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        position: "right",
        offsetY: 0,
        height: 230,
      },
    },
  };

  const chartSeries = Object.values(finalData); // Replace with your data

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out "
      style={{ height: "100%" }}
    >
      <div style={{ minWidth: "550px" }}>
        {/* Your pie chart code goes here */}
        <Chart
          options={{
            ...chartOptions.options,
            labels: chartOptions.labels,
          }}
          series={chartSeries}
          type="pie"
          width="100%"
        />
      </div>

      <div className="text-center text-lg font-bold">Review</div>
    </div>

    // <div>
    //   <Chart
    //     options={{
    //       ...chartOptions.options,
    //       labels: chartOptions.labels, // Set labels here
    //     }}
    //     series={chartSeries}
    //     type="pie"
    //     width="500px"
    //   />
    //   <h2>Reviews</h2>
    // </div>
  );
};

export default PieComponent;
