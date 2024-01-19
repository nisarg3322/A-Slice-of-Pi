import React, { useEffect, useState } from "react";

const MoneyMade = () => {
  const [totalMoney, setTotalMoney] = useState([]);

  useEffect(() => {
    const calculateTotal = async () => {
      try {
        const orderResponce = await fetch("/order_data.json");
        const orders = await orderResponce.json();
        const priceResponce = await fetch("/pricing_data.json");
        const prices = await priceResponce.json();

        let total = 0;

        orders.forEach((order) => {
          const { items } = order;
          items.forEach((item) => {
            const { type, size } = item;
            total += prices[type][size];
          });
        });

        setTotalMoney(total);
      } catch (error) {
        console.error("Error while fatching data", error);
      }
    };
    calculateTotal();
  }, []);

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg hover:shadow-teal-500 transition duration-300 ease-in-out">
        <img src="/bag.png" alt="Shopping Bag" className="w-12 h-12" />
        <div>
          <h2 className=" text-xl font-semibold">Total Money made in 2023:</h2>
          <p className="text-2xl font-bold">${totalMoney}</p>
        </div>
      </div>
    </>
  );
};

export default MoneyMade;
