/**
 * Author: Nisarg Patel
 * Project: uOttawa Outreach Technical Interview Project
 * Description: This file contains the implementation of a single review block
 */

import { useEffect, useState } from "react";

const ReviewBlock = ({ reviewData }) => {
  //State to hold single review data
  const [review, setReview] = useState();
  const [reviewColor, setReviewColor] = useState();

  // to set review State to recieved data
  useEffect(() => {
    if (reviewData) {
      setReview(reviewData);
    }
  }, [reviewData]);

  //to set colour according to recieved review sentiment
  useEffect(() => {
    if (review) {
      setReviewColor(setSentimentColor(review.sentiment));
    }
  }, [review]);

  //to get sentiment colour
  const setSentimentColor = (sentiment) => {
    if (sentiment) {
      if (sentiment === "happy") {
        return "rgba(0, 255, 0, 0.7)";
      } else if (sentiment === "sad") {
        return "rgba(255, 255, 0, 0.7)";
      } else if (sentiment === "delighted") {
        return "rgba(255, 165, 0, 0.7)";
      } else if (sentiment === "angry") {
        return "rgba(255, 99, 132, 0.9)";
      } else {
        return "";
      }
    }
  };
  return (
    <>
      <div className=" w-100 h-32 col-span-1 bg-gray-100 rounded-lg shadow-lg hover:shadow-lg hover:shadow-red-500 transition duration-300 ease-in-out">
        {/* top section for review sentiment and date */}
        <div className="w-100 mt-2 ml-2 h-1/5 flex justify-between ">
          <div
            style={{ backgroundColor: reviewColor }}
            className="rounded-md p-2 flex items-center justify-center"
          >
            {review?.sentiment}
          </div>
          <div className="mr-2 text-slate-600 italic">{review?.date}</div>
        </div>

        {/* middle section for review body */}
        <div className="w-100 ml-2 mt-4 h-1/3">
          <h3 className=" inline font-bold">Review: </h3>
          <p className="inline">{review?.message}</p>
        </div>

        {/* bottom section for Store Name for that review */}
        <div className="w-100 h-1/5 flex justify-end">
          <div className="mr-2">
            <h3 className=" inline font-bold">Store: </h3>
            <p className="inline">{review?.store}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewBlock;
