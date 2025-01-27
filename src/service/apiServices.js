import axios from "./baseURL";

export const getProduct = async (page = 1, limit = 5) => {
  try {
    const skip = (page - 1) * limit;
    const reponse = await axios.get(
      `products/category/smartphones?skip=${skip}&limit=${limit}`
    );
    console.log("List of Products: ", reponse.data);
    return reponse.data;
  } catch (error) {
    console.log("Error fetching product list:", error);
  }
};

export const postProduct = async (product) => {
  try {
    const response = await axios.post("products/add", product);
    console.log("Added new Item: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error posting product:", error);
    throw error;
  }
};

export const deleteProduct = async (productID) => {
  try {
    const response = await axios.delete(`products/${productID}`);
    console.log("Product Deleted: ", response.data);

    return response.data;
  } catch (error) {
    console.log("Error Deleting Product: ", error);

    throw error;
  }
};
