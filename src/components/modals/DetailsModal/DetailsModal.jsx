import React, { useState } from "react";

import style from "./DetailsModal.module.css";
import { Button } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";

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
      <div className="w-[55vw] h-[90vh] bg-white flex flex-col">
        <header className="sticky top-0 z-10 bg-white flex justify-between items-center py-4 px-8 shadow-md">
          <div>
            <h4
              className="text-gray-500 uppercase text-xs
            ">
              SMARTPHONES
            </h4>
            <h2
              className="font-semibold text-3xl
            ">
              {productDetails.title}
            </h2>
          </div>

          <Button variant="text" sx={{ color: "gray" }} onClick={() => onClose()}>
            <Close />
          </Button>
        </header>

        <section className="flex flex-col py-10 gap-4 overflow-y-scroll">
          <section className={style.imgSection}>
            <div className={style.imgThumbnailContainer}>
              <button className={style.navButton} onClick={handleMoveLeft}>
                <ArrowBackIosNew />
              </button>
              <img
                className={style.imgThumbnail}
                src={productDetails.images[imgPreview]}
                alt={productDetails.title}
              />
              <button className={style.navButton} onClick={handleMoveRight}>
                <ArrowForwardIos />
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

          <section className="px-15 flex flex-col gap-5">
            <h2 className="text-blue-500 text-2xl">₱ {productDetails.price}</h2>
            <div>
              <label className="text-gray-500">Discount</label>
              <h3 className="text-red-600">{productDetails.discountPercentage}% OFF</h3>
            </div>
            <div>
              <label className="text-gray-500">Description</label>
              <h3>{productDetails.description}</h3>
            </div>
            <div>
              <label className="text-gray-500">Brand</label>
              <h3>{productDetails.brand}</h3>
            </div>
            <div>
              <label className="text-gray-500">Stock</label>
              <h3>{productDetails.stock} units</h3>
            </div>
            <div>
              <label className="text-gray-500">Rating</label>
              <h3>{productDetails.rating} / 5</h3>
            </div>
          </section>
        </section>

        <footer className="sticky bottom-0 z-50 bg-white flex justify-end items-center py-4 px-4 shadow-[0_-5px_5px_rgba(0,0,0,0.1)] rounded-b-sm">
          <Button variant="text" onClick={() => onClose()}>
            CLOSE
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default DetailsModal;
