import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineGraph = () => {
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
            const { items, date } = order;
            let total = 0;

            items.forEach((item) => {
              const { type, size } = item;
              total += prices[type][size];
            });

            // Parse the date to get the month name
            const monthName = new Date(date).toLocaleString("en-US", {
              month: "long",
            });

            sales[monthName] = (sales[monthName] || 0) + total;
          });
          
          return sales;
        };

        const totalSales = getSales();
        
        const result = Object.entries(totalSales).map(
            ([month, sales]) => ({
              name: month,
              sales: sales,
            })
          );

        setMonthlySales(result);


      } catch (error) {
        console.error("Error while feching data", error);
      }
    };

    calculateMonthlySales();
  }, []);

  return (
    <>
    <div style={{height: '500px', width: '1200px'}}>
      <ResponsiveContainer >
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
          <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }}/>
          <Tooltip content={({ payload, label, active }) => {
                if (active) {
                  return (
                    <div style={{ color: 'white', background: 'rgba(0, 0, 0, 0.8)', padding: '8px', borderRadius: '5px' }}>
                      <p>{`Month: ${label}`}</p>
                      <p>{`Sales $: ${payload[0].value}`}</p>
                    </div>
                  );
                }
                return null;
              }} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={3} activeDot={{ r: 10 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
      </div>
    </>
  );
};

export default LineGraph;
