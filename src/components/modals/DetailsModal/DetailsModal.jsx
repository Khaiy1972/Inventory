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
    <div className="fixed flex items-center justify-center bg-[#00000066] h-screen w-screen top-0 left-0 z-50">
      <div className="bg-white flex flex-col w-[95vw] h-9/10 md:w-[60vw] md:h-[95vh] ">
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
          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-evenly">
              <button
                className="text-lg bg-transparent py-20 px-4 rounded-2xl cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={handleMoveLeft}>
                <ArrowBackIosNew />
              </button>
              <img
                className="h-52 md:h-80"
                src={productDetails.images[imgPreview]}
                alt={productDetails.title}
              />
              <button
                className="text-lg bg-transparent py-20 px-4 rounded-2xl cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={handleMoveRight}>
                <ArrowForwardIos />
              </button>
            </div>

            <div className="flex justify-center gap-8">
              {productDetails.images.map((image, index) => (
                <img
                  className={`h-14 rounded-md ${
                    imgPreview === index && "border border-blue-500"
                  }`}
                  key={index}
                  src={image}
                  alt=""
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-5 px-8 md:px-15">
            <h2 className="text-blue-500 text-2xl font-bold">₱ {productDetails.price}</h2>
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
