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
    const areAllFieldsFilled = Object.values(productData).every(
      (value) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0 &&
        !(Array.isArray(value) && value.length === 0)
    );

    if (!areAllFieldsFilled) {
      setComponentStatus((cs) => ({ ...cs, isError: "Fill out the Details" }));
      return;
    }

    try {
      const response = await postProduct({ ...productData });
      alert("Product Added", response);
    } catch (error) {
      alert("Can't post");
    } finally {
      setComponentStatus({ isAddModalOpen: false, isLoading: false });
      setProductData(emptyProductData);
    }
  };

  const handleClose = () => {
    setComponentStatus({ isAddModalOpen: false });
    setProductData(emptyProductData);
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);
      setProductData((pd) => ({
        ...pd,
        images: [...pd.images, blobUrl],
      }));
    };

    reader.readAsArrayBuffer(file);

    console.log(productData.images);
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
            <header className={style.header}>
              <h1>Add New Product</h1>
              <button className={style.close} type="button" onClick={handleClose}>
                X
              </button>
            </header>

            <form className={style.form} onSubmit={handleSubmit}>
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
                  min={0}
                  name="price"
                  value={productData.price}
                  onChange={handleInput}
                />
              </label>

              <label>
                Stock:{" "}
                <input
                  type="number"
                  min={0}
                  name="stock"
                  value={productData.stock}
                  onChange={handleInput}
                />
              </label>
            </form>

            <footer className={style.footer}>
              <button className={style.button} type="submit" onClick={handleSubmit}>
                Add Product
              </button>
            </footer>
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
