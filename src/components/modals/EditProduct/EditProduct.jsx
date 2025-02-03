import React, { useState, useEffect } from "react";
import { updateProduct } from "../../../service/apiServices";
import { isEqual } from "lodash";

import style from "./EditProduct.module.css";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Close,
  CloudUpload,
} from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { toast, Toaster } from "sonner";

function EditProduct({ productDetails, onClose, updatedProduct }) {
  const [product, setProduct] = useState({
    ...productDetails,
  });
  const [imgPreview, setImgPreview] = useState(0);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 5,
  });

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
    console.log("Product Details: ", productDetails);
    console.log("Updated Product: ", product);

    if (isEqual(product, productDetails)) {
      toast.warning("No changes made");
      return;
    }

    toast.loading("Updating Product");

    const toUpdate = Object.keys(product).reduce((acc, key) => {
      if (product[key] !== productDetails[key]) {
        acc[key] = product[key];
      }
      return acc;
    }, {});

    try {
      const response = await updateProduct(productDetails.id, { ...toUpdate });
      updatedProduct(response);
      console.log("Product Updated: ", response);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      toast.dismiss();
      toast.success("Product Updated Successfully");
      onClose();
    }
  };

  useEffect(() => {
    console.log(product);
  });
  return (
    <div className="fixed flex flex-col items-center justify-center bg-[#00000066] h-screen w-screen top-0 left-0 z-50">
      <Toaster richColors position="top-center" />
      <header className="bg-white flex justify-between items-center py-4 px-8 z-10 w-[95vw] shadow-md md:w-[60vw]">
        <div>
          <h4 className="text-sm">SMARTPHONES</h4>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
        </div>

        <button className="font-bold" onClick={() => onClose()}>
          <Close />
        </button>
      </header>

      <div className="bg-white flex flex-col w-[95vw] h-[65vh] md:w-[60vw] md:h-[70vh] overflow-scroll px-8 pt-4 pb-10">
        <section className="flex flex-col items-center gap-4">
          <div className={style.imgThumbnailContainer}>
            <button
              className="text-lg bg-transparent py-20 px-4 rounded-2xl cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={handleMoveLeft}>
              <ArrowBackIosNew />
            </button>
            <img
              className="h-52 md:h-80"
              src={product.images[imgPreview]}
              alt={product.title}
            />
            <button
              className="text-lg bg-transparent py-20 px-4 rounded-2xl cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={handleMoveRight}>
              <ArrowForwardIos />
            </button>
          </div>

          <div className={style.imgPreviewContainer}>
            {product.images.map((image, index) => (
              <img
                className={`h-14 rounded-md mb-8 ${
                  imgPreview === index && "border border-blue-500"
                }`}
                key={index}
                src={image}
                alt=""
              />
            ))}
          </div>

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}>
            Upload Image
            <VisuallyHiddenInput type="file" onChange={handleImgInput} multiple />
          </Button>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-bold">Model</label>
            <input
              className="text-lg bg-gray-200 py-2 px-4 rounded-sm"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-bold">Price</label>
            <input
              className="text-lg bg-gray-200 py-2 px-4 rounded-sm"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-bold">Discount</label>
            <input
              className="text-lg bg-gray-200 py-2 px-4 rounded-sm"
              type="number"
              name="discountPercentage"
              value={product.discountPercentage}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-bold">Description</label>
            <textarea
              className="text-lg bg-gray-200 py-2 px-4 rounded-sm"
              typeof="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}></textarea>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-bold">Brand</label>
            <input
              className="text-lg bg-gray-200 py-2 px-4 rounded-sm"
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-bold">Stock</label>
            <input
              className="text-lg bg-gray-200 py-2 px-4 rounded-sm"
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-bold">Rating</label>
            <input
              className="text-lg bg-gray-200 py-2 px-4 rounded-sm"
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleInputChange}
            />
          </div>
        </section>
      </div>

      <footer className="bg-white flex justify-end items-center py-4 px-4 shadow-[0_-5px_5px_rgba(0,0,0,0.1)] rounded-b-sm w-[95vw] md:w-[60vw]">
        <button
          className="bg-blue-500 py-2 px-4 text-lg text-white font-semibold rounded-sm cursor-pointer hover:bg-blue-600"
          onClick={handleUpdate}>
          Update
        </button>
      </footer>
    </div>
  );
}

export default EditProduct;
