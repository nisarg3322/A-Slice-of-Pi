import React, { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";

const PieComponent = ({ startDate = null, endDate = null, reviewData }) => {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    const fetchDataAndProcess = () => {
      try {
        if (reviewData) {
          const calculateSentimentTotals = () => {
            const sentimentTotals = {};

            reviewData.forEach((review) => {
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

          setFinalData(sentimentTotals);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchDataAndProcess();
  }, [startDate, endDate, reviewData]);

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg hover:shadow-lg hover:shadow-yellow-500 transition duration-300 ease-in-out lg:col-span-2 w-full h-full grid place-items-center  ">
      <Pie
        options={{
          plugins: {
            title: {
              text: "User reviews",
              display: true,
              font: { size: 25 },
            },
          },
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        }}
        data={{
          labels: Object.keys(finalData),
          datasets: [
            {
              borderRadius: 8,
              data: Object.values(finalData),
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(75, 192, 192)",
                "rgba(54, 162, 235)",
                "rgba(255, 159, 64 )",
              ],
              borderWidth: 1,
              hoverOffset: 20,
            },
          ],
        }}
      ></Pie>
    </div>
  );
};

export default PieComponent;
