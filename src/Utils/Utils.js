//used to populate pizza types dynamically form database

// Fetch pizza types from the JSON file
export const fetchPizzaTypes = async () => {
  try {
    const typesResponse = await fetch("/pricing_data.json");
    const dataSet = await typesResponse.json();
    return Object.keys(dataSet);
  } catch (error) {
    console.error("Error fetching pizza types:", error);
    throw error; // Rethrow the error to handle it where fetchPizzaTypes is called
  }
};

export const fetchStores = async () => {
  try {
    const storeResponse = await fetch("/review_data.json");
    const storeData = await storeResponse.json();
    const storeSet = new Set();
    storeData.forEach((review) => {
      const { store } = review;
      storeSet.add(store);
    });

    const stores = Array.from(storeSet);
    return stores;
  } catch (error) {
    console.error("Error fetching pizza types:", error);
  }
};
