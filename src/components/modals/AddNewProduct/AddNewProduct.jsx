import React, { useState, useEffect } from "react";
import { isEqual } from "lodash";
import { postProduct } from "../../../service/apiServices";

import { ErrorModal } from "../../../components";

import style from "./AddNewProduct.module.css";

function AddNewProduct() {
  const emptyProductData = {
    title: "",
    brand: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
  };
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
    images: [],
  });
  const [imgPreviewIndex, setImgPreviewIndex] = useState(0);

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
      setProductData(emptyProductData);
    }
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductData((pd) => ({
        ...pd,
        images: [...pd.images, reader.result],
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleMoveRight = () => {
    setImgPreviewIndex((ip) => (ip + 1) % productData.images.length);
  };

  const handleMoveLeft = () => {
    setImgPreviewIndex(
      (ip) => (ip - 1 + productData.images.length) % productData.images.length
    );
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
        <div className={style.background}>
          <div className={style.modal}>
            <h1>Add New Product</h1>

            <form className={style.form} onSubmit={handleSubmit}>
              <button
                className={style.close}
                type="button"
                onClick={() => setComponentStatus({ isAddModalOpen: false })}>
                X
              </button>
              <label>Images</label>
              {productData.images.length > 0 && (
                <>
                  <div className={style.imgThumbnailContainer}>
                    <button
                      type="button"
                      className={style.navButton}
                      onClick={handleMoveLeft}>
                      {"<"}
                    </button>
                    <img
                      className={style.imgThumbnail}
                      src={productData.images[imgPreviewIndex]}
                      alt=""
                    />
                    <button
                      type="button"
                      className={style.navButton}
                      onClick={handleMoveRight}>
                      {">"}
                    </button>
                  </div>

                  <div className={style.imgPreviewContainer}>
                    {productData.images.map((image, index) => (
                      <img
                        className={`${style.imgPreview} ${
                          imgPreviewIndex === index && style.selected
                        }`}
                        key={index}
                        src={image}
                        alt=""
                      />
                    ))}
                  </div>
                </>
              )}

              <input type="file" onChange={handleImageInput} />

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

              <button className={style.button} type="submit">
                Add Product
              </button>
              <button className={style.button} type="button">
                close
              </button>
            </form>
          </div>
        </div>
      )}
      {!componentStatus.isAddModalOpen && (
        <button
          className={style.button}
          onClick={() => setComponentStatus({ isAddModalOpen: true })}>
          Add Product
        </button>
      )}
    </>
  );
}

export default AddNewProduct;
