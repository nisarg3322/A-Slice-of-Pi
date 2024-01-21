/**
 * Author: Nisarg Patel
 * Project: uOttawa Outreach Technical Interview Project
 * Description: This file contains the implementation of table that dispays top performers
 */

import { useEffect, useState } from "react";

const TopPerformer = ({ orderData, reviewData, priceData }) => {
  // sales , reviews, revenue
  const [salesStore, setSalesStore] = useState({ "kanata & Orleans": 11 });

  const [reviewStore, setReviewStore] = useState("");
  const [revenueStore, setRevenueStore] = useState("");

  //to obtain best store with most happy review
  useEffect(() => {
    const getBestReviewStore = () => {
      if (reviewData) {
        const reviewTotal = {};
        reviewData.forEach((review) => {
          const { sentiment, store } = review;
          if (sentiment === "happy") {
            reviewTotal[store] = (reviewTotal[store] || 0) + 1;
          }
        });

        const maxValue = Math.max(...Object.values(reviewTotal));

        // Filter the key-value pairs with the maximum value
        const maxPairs = Object.entries(reviewTotal).filter(
          ([key, value]) => value === maxValue
        );

        setReviewStore(maxPairs);
      }
    };
    getBestReviewStore();
  }, [reviewData]);

  //to obtain store with most revenue
  useEffect(() => {
    const getMostStoreRevenue = () => {
      if (orderData && priceData) {
        const sales = {};

        orderData.forEach((order) => {
          const { items, store } = order;
          let total = 0;

          items.forEach((item) => {
            const { type, size } = item;
            total += priceData[type][size];
          });

          sales[store] = (sales[store] || 0) + total;
        });

        const maxValue = Math.max(...Object.values(sales));

        // Filter the key-value pairs with the maximum value
        const maxPairs = Object.entries(sales).filter(
          ([key, value]) => value === maxValue
        );

        setRevenueStore(maxPairs);
      }
    };
    getMostStoreRevenue();
  }, [orderData, priceData]);

  //to get the string for the most rated stores
  const getReviewName = () => {
    let finalString = "";

    for (let i = 0; i < reviewStore.length; i++) {
      if (i === 0) {
        finalString = reviewStore[i][0];
      } else {
        finalString = finalString + " & " + reviewStore[i][0];
      }
    }

    return finalString;
  };

  return (
    <>
      <h1 className="text-2xl  font-bold text-center font-sans text-slate-700 mb-4">
        Top Performer's table
      </h1>

      <table className="border-collapse w-full h-5/6 p-12  border border-gray-300">
        <thead className="bg-blue-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Criteria</th>
            <th className="border border-gray-300 px-4 py-2">Store</th>
            <th className="border border-gray-300 px-4 py-2">Matric</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Sales</td>
            <td className="border border-gray-300 px-4 py-2">
              {Object.keys(salesStore)[0]}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {Object.values(salesStore)[0]}
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Revenue</td>
            <td className="border border-gray-300 px-4 py-2">
              {revenueStore ? revenueStore[0][0] : ""}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ${revenueStore ? revenueStore[0][1] : ""}
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Rating (Happy)</td>
            <td className="border border-gray-300 px-4 py-2">
              {getReviewName()}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {reviewStore ? reviewStore[0][1] : ""} (5⭐)
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TopPerformer;
