import axios from "./baseURL";

export const getProduct = async () => {
  try {
    const endpoint = `products/category/smartphones`;
    const response = await axios.get(endpoint);
    let products = response.data.products;

    console.log("Filtered List of Products: ", products);

    return {
      ...response.data,
      products,
    };
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

export const updateProduct = async (productID, product) => {
  try {
    const response = await axios.patch(`products/${productID}`, product);
    console.log("Product Updated: ", response.data);

    return response.data;
  } catch (error) {
    console.log("Error Updating Product: ", error);

    throw error;
  }
};
