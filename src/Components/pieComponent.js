import React, { useEffect, useState } from "react";
import {
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
} from "recharts";

const PieComponent = () => {
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
              const { sentiment } = review;
              sentimentTotals[sentiment] =
                (sentimentTotals[sentiment] || 0) + 1;
            });

            return sentimentTotals;
          };

          const sentimentTotals = calculateSentimentTotals();

          const result = Object.entries(sentimentTotals).map(
            ([sentiment, count]) => ({
              name: sentiment,
              value: count,
            })
          );

          const colorPalette = [
            "#FF6B6B",
            "#6BFF6B",
            "#6B6BFF",
            "#FFD166",
            "#45A29E",
            "#DAA520",
          ];

          const formattedData = result.map((item, index) => ({
            ...item,
            color: colorPalette[index % colorPalette.length],
          }));

          setFinalData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchDataAndProcess();
  }, []);

  return (
    <div style={{ width: "400px", height: "500px", border: "2px solid gray",borderRadius:'10px',boxShadow: "0 1px 8px rgba(255, 255, 255, 0.9)" }}>
      <div style={{ height: "400px", width: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={finalData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
              animationBegin={0}
              animationDuration={800}
            >
              {finalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <h3 style={{ textAlign: "center" }}>Customer reviews</h3>
    </div>
  );
};

export default PieComponent;
