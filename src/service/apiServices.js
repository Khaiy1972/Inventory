import axios from "./baseURL";

// export const getProduct = async (page = 1, limit = 5, search = "") => {
//   try {
//     const skip = (page - 1) * limit;
//     const response = await axios.get(
//       `products/category/smartphones?skip=${skip}&limit=${limit}`
//     );
//     console.log("List of Products: ", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("Error fetching product list:", error);
//   }
// };

export const getProduct = async (page = 1, limit = 5, search = "") => {
  try {
    const skip = (page - 1) * limit;
    const endpoint = search
      ? `products/search?q=${search}&limit=0`
      : `products/category/smartphones?skip=${skip}&limit=${limit}`;

    const response = await axios.get(endpoint);

    let products = response.data.products;

    if (search.trim()) {
      products = products.filter(
        (product) =>
          product.category === "smartphones" &&
          product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

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
