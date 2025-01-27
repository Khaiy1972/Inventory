import React, { useState, useEffect } from "react";
import { isEqual } from "lodash";
import { postProduct } from "../../../service/apiServices";

import { ErrorModal } from "../../../components";

import style from "./AddNewProduct.module.css";

function AddNewProduct() {
  const emptyProductData = { title: "", brand: "", description: "", price: 0, stock: 0 };
  const [componentStatus, setComponentStatus] = useState({
    isAddModalOpen: false,
    isLoading: false,
    isError: "",
  });
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setProductData((pd) => ({ ...pd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEqual(productData, emptyProductData)) {
      setComponentStatus((cs) => ({ ...cs, isError: "Fill out the Details" }));
      return;
    }

    try {
      const response = await postProduct(productData);
      alert("Product Added", response);
    } catch (error) {
      alert("Can't post");
    } finally {
      setComponentStatus({ isAddModalOpen: false, isLoading: false });
    }
  };

  return (
    <>
      {componentStatus.isError && (
        <ErrorModal
          errorMessage={componentStatus.isError}
          onClose={() => setComponentStatus((cs) => ({ ...cs, isError: "" }))}
        />
      )}
      {componentStatus.isAddModalOpen && (
        <div className={style.Background}>
          <div className={style.modal}>
            <h1>Add New Product</h1>

            <form onSubmit={handleSubmit}>
              <label>
                Product title:{" "}
                <input
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleInput}
                />
              </label>

              <label>
                Brand:{" "}
                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleInput}
                />
              </label>

              <label>
                Description:{" "}
                <input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleInput}
                />
              </label>

              <label>
                Price:{" "}
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInput}
                />
              </label>

              <label>
                Stock:{" "}
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleInput}
                />
              </label>

              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      )}
      {!componentStatus.isAddModalOpen && (
        <button onClick={() => setComponentStatus({ isAddModalOpen: true })}>
          Add Product
        </button>
      )}
    </>
  );
}

export default AddNewProduct;
