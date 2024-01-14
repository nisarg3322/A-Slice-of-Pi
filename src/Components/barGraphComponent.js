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

const BarGraph = () => {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {


    const fetchDataAndProcess = async () => {
      try {
        const response = await fetch("/order_data.json");
        const data = await response.json();
        
        if(data.length > 0){
            const calculateTotalOrders = () => {
                const orderTotal = {};
    
                data.forEach((order) => {
                  const { store } = order;
                  orderTotal[store] = (orderTotal[store] || 0) + 1;
                });
    
                return orderTotal;
            };

            const orderTotals = calculateTotalOrders();

            

            const result = Object.entries(orderTotals).map(
                ([store, count]) => ({
                  name: store,
                  orders: count,
                })
              );

            setFinalData(result);

        }

    } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };



    fetchDataAndProcess();
  }, []);

  return (
    <>

      <div style={{height: '500px', width: '700px'}}>
      <ResponsiveContainer >
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
            <XAxis dataKey="name" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip content={({ payload, label, active }) => {
                if (active) {
                  return (
                    <div style={{ color: 'white', background: 'rgba(0, 0, 0, 0.8)', padding: '8px', borderRadius: '5px' }}>
                      <p>{`Store: ${label}`}</p>
                      <p>{`Orders: ${payload[0].value}`}</p>
                    </div>
                  );
                }
                return null;
              }} />
            <Legend />
            <Bar dataKey="orders" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="blue" />} />
            {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
          </BarChart>
        </ResponsiveContainer>
        </div>
    </>
  );
};

export default BarGraph;
  
