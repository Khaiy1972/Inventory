import React, { useState } from "react";

import style from "./DetailsModal.module.css";

function DetailsModal({ productDetails, onClose }) {
  const [imgPreview, setImgPreview] = useState(0);

  const handleMoveRight = () => {
    setImgPreview((ip) => (ip + 1) % productDetails.images.length);
  };

  const handleMoveLeft = () => {
    setImgPreview(
      (ip) => (ip - 1 + productDetails.images.length) % productDetails.images.length
    );
  };

  return (
    <div className={style.background}>
      <header className={style.header}>
        <div>
          <h4>SMARTPHONES</h4>
          <h2>{productDetails.title}</h2>
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
              src={productDetails.images[imgPreview]}
              alt={productDetails.title}
            />
            <button className={style.navButton} onClick={handleMoveRight}>
              {">"}
            </button>
          </div>

          <div className={style.imgPreviewContainer}>
            {productDetails.images.map((image, index) => (
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
        </section>

        <section className={style.details}>
          <h2>$ {productDetails.price}</h2>
          <label>Discount</label>
          <h3>{productDetails.discountPercentage}% OFF</h3>
          <label>Description</label>
          <h3>{productDetails.description}</h3>
          <label>Brand</label>
          <h3>{productDetails.brand}</h3>
          <label>Stock</label>
          <h3>{productDetails.stock} units</h3>
          <label>Rating</label>
          <h3>{productDetails.rating} / 5</h3>
        </section>
      </div>

      <footer className={style.footer}>
        <button className={style.closeFooter} onClick={() => onClose()}>
          CLOSE
        </button>
      </footer>
    </div>
  );
}

export default DetailsModal;
