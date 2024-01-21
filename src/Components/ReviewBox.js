import ReviewBlock from "./ReviewBlock";
import { useEffect, useState } from "react";
import { fetchPizzaTypes, fetchStores } from "../Utils/Utils";

const ReviewBox = ({ reviewData }) => {
  const [formattedData, setFormattedData] = useState([]);

  //selection states
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");

  const [storeType, setStoreType] = useState([]);

  //getting pizza types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stores = await fetchStores();

        setStoreType(stores);
      } catch (error) {
        // Handle the error (e.g., show an error message)
        console.error("Error in component:", error);
      }
    };

    fetchData();
  }, []);

  //setting formated data to targeted data
  useEffect(() => {
    const formateData = () => {
      const filteredReview = [];
      if (reviewData && Array.isArray(reviewData)) {
        reviewData.forEach((review) => {
          if (selectedSentiment === "" && selectedStore === "") {
            filteredReview.push(review);
          } else if (
            selectedSentiment === review.sentiment &&
            selectedStore === ""
          ) {
            filteredReview.push(review);
          } else if (
            selectedSentiment === "" &&
            selectedStore === review.store
          ) {
            filteredReview.push(review);
          } else if (
            selectedSentiment === review.sentiment &&
            selectedStore === review.store
          ) {
            filteredReview.push(review);
          }
        });
      } else {
        // If reviewData is not defined or not an array, set an empty array
        setFormattedData([]);
      }

      setFormattedData(filteredReview);
    };
    formateData();
  }, [reviewData, selectedSentiment, selectedStore]);

  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="font-bold text-3xl font-sans text-slate-600 text-center w-full">
          List of Reviews
        </h3>

        <div className="flex justify-end w-full">
          <div className="flex items-center mr-3">
            <label className="mb-1 mr-2 font-bold font-sans text-slate-700">
              Store:
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              {storeType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mb-1 mr-2 font-bold font-sans text-slate-700">
              Sentiment:
            </label>
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              <option key={0} value={"happy"}>
                Happy
              </option>
              <option key={1} value={"sad"}>
                Sad
              </option>
              <option key={2} value={"delighted"}>
                Delighted
              </option>
              <option key={3} value={"angry"}>
                Angry
              </option>
            </select>
          </div>
        </div>

        {/* for dropdown of stores */}
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-4 grid-cols-1">
        {formattedData.map((review, index) => {
          return <ReviewBlock key={index} reviewData={review} />;
        })}
      </div>
    </>
  );
};

export default ReviewBox;
