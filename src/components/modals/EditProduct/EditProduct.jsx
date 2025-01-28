import React, { useState, useEffect } from "react";
import { postProduct } from "../../../service/apiServices";
import { isEqual } from "lodash";

import { ErrorModal } from "../../../components";

import style from "./EditProduct.module.css";

function EditProduct({ productDetails, onClose }) {
  const [product, setProduct] = useState({
    title: productDetails.title,
    description: productDetails.description,
    brand: productDetails.brand,
    price: productDetails.price,
    discountPercentage: productDetails.discountPercentage,
    stock: productDetails.stock,
    rating: productDetails.rating,
    images: productDetails.images,
  });
  const [imgPreview, setImgPreview] = useState(0);

  const handleMoveRight = () => {
    setImgPreview((ip) => (ip + 1) % product.images.length);
  };

  const handleMoveLeft = () => {
    setImgPreview((ip) => (ip - 1 + product.images.length) % product.images.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));
  };

  const handleImgInput = (e) => {
    const { files } = e.target;
    const reader = new FileReader();

    reader.onload = () => {
      const blob = new Blob([reader.result], { type: files[0].type });
      const blobUrl = URL.createObjectURL(blob);
      setProduct((p) => ({
        ...p,
        images: p.images ? [...p.images, blobUrl] : [blobUrl],
      }));
    };

    if (files.length > 0) {
      reader.readAsArrayBuffer(files[0]);
    }
  };

  const handleUpdate = async () => {
    if (isEqual(product, productDetails)) {
      alert("No changes were made");
      return;
    }

    try {
      const response = await postProduct(product);
      alert("Product Updated");
      console.log("Product Updated: ", response);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    console.log(product);
  });
  return (
    <div className={style.background}>
      <header className={style.header}>
        <div>
          <h4>SMARTPHONES</h4>
          <input
            className={`${style.input} ${style.title}`}
            name="title"
            value={product.title}
            onChange={handleInputChange}
          />
        </div>

        <button className={style.close} onClick={() => onClose()}>
          X
        </button>
      </header>
      <div className={style.modal}>
        <section className={style.imgSection}>
          <div className={style.imgThumbnailContainer}>
            <button className={style.navButton} onClick={handleMoveLeft}>
              {"<"}
            </button>
            <img
              className={style.imgThumbnail}
              src={product.images[imgPreview]}
              alt={product.title}
            />
            <button className={style.navButton} onClick={handleMoveRight}>
              {">"}
            </button>
          </div>

          <div className={style.imgPreviewContainer}>
            {product.images.map((image, index) => (
              <img
                className={`${style.imgPreview} ${
                  imgPreview === index && style.selected
                }`}
                key={index}
                src={image}
                alt=""
              />
            ))}
          </div>

          <input type="file" name="images" onChange={handleImgInput} />
        </section>

        <section className={style.details}>
          <input
            className={style.input}
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
          <label>Discount</label>
          <input
            className={style.input}
            type="number"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleInputChange}
          />
          <label>Description</label>
          <textarea
            className={style.input}
            typeof="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}></textarea>
          <label>Brand</label>
          <input
            className={style.input}
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
          />
          <label>Stock</label>
          <input
            className={style.input}
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
          />
          <label>Rating</label>
          <input
            className={style.inputBrand}
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleInputChange}
          />
        </section>
      </div>

      <footer className={style.footer}>
        <button className={style.closeFooter} onClick={handleUpdate}>
          Update
        </button>
      </footer>
    </div>
  );
}

export default EditProduct;
