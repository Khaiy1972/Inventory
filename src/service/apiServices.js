import axios from "./baseURL";

export const getProduct = async () => {
  try {
    const reponse = await axios.get("products/category/smartphones");
    console.log("List of Products: ", reponse.data);
    return reponse.data;
  } catch (error) {
    console.log("Error fetching product list:", error);
  }
};
