import React, { useEffect, useState } from "react";

const MoneyMade = ({ orderData, priceData }) => {
  const [totalMoney, setTotalMoney] = useState([]);

  useEffect(() => {
    const calculateTotal = async () => {
      try {
        if (orderData && priceData) {
          let total = 0;

          orderData.forEach((order) => {
            const { items } = order;
            items.forEach((item) => {
              const { type, size } = item;
              total += priceData[type][size];
            });
          });

          setTotalMoney(total);
        }
      } catch (error) {
        console.error("Error while fatching data", error);
      }
    };
    calculateTotal();
  }, [orderData, priceData]);

  return (
    <>
      <div className="bg-white pr-4 pl-4 md:h-full rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg hover:shadow-teal-500 transition duration-300 ease-in-out">
        <img src="/bag.png" alt="Shopping Bag" className="w-12 h-12" />
        <div>
          <h2 className=" text-xl font-semibold inline font-sans text-slate-700">
            Total Revenue
          </h2>
          <p className="text-2xl  font-bold text-green-500 ">${totalMoney}</p>
        </div>
      </div>
    </>
  );
};

export default MoneyMade;
