//used to populate pizza types dynamically form database

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
