import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import { Toaster, toast } from "sonner";
import { postProduct } from "../../../service/apiServices";
import {
  Close,
  ArrowBackIosNew,
  ArrowForwardIos,
  CloudUpload,
} from "@mui/icons-material";

import { ErrorModal } from "../../../components";

import style from "./AddNewProduct.module.css";

function AddNewProduct({ newProduct }) {
  const emptyProductData = {
    title: "",
    brand: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    rating: 0,
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
    rating: 0,
  });
  const [imgPreviewIndex, setImgPreviewIndex] = useState(0);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
      console.log("Product Added: ", response);

      toast.success("Product Added Successfully");
      newProduct(response);
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
      <Toaster position="top-center" richColors />
      {componentStatus.isError && (
        <ErrorModal
          errorMessage={componentStatus.isError}
          onClose={() => setComponentStatus((cs) => ({ ...cs, isError: "" }))}
        />
      )}

      {componentStatus.isAddModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000069] z-50 flex justify-center items-center">
          <div className="bg-white flex flex-col w-[95vw] h-9/10 md:w-[60vw] md:h-[95vh] ">
            <header className="bg-white py-5 px-9 flex justify-between items-center shadow-md sticky top-0 ">
              <h1 className="font-bold text-3xl">Add New Product</h1>
              <button
                className="font-bold text-2xl cursor-pointer"
                type="button"
                onClick={handleClose}>
                <Close sx={{ fontSize: 30 }} />
              </button>
            </header>

            <form
              className="bg-gray-100 flex flex-col p-12 gap-6 overflow-scroll h-[74vh]"
              onSubmit={handleSubmit}>
              <label
                className="text-2xl font-bold
              ">
                Images
              </label>
              {productData.images.length > 0 && (
                <>
                  <div className={style.imgThumbnailContainer}>
                    <button
                      type="button"
                      className={style.navButton}
                      onClick={handleMoveLeft}>
                      <ArrowBackIosNew />
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
                      <ArrowForwardIos />
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

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}>
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleImageInput} multiple />
              </Button>
              <TextField
                label="Product Name"
                variant="filled"
                type="text"
                name="title"
                value={productData.title}
                onChange={handleInput}
              />
              <TextField
                label="Brand"
                variant="filled"
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleInput}
              />
              <TextField
                label="Description"
                variant="filled"
                type="text"
                name="description"
                value={productData.description}
                onChange={handleInput}
              />
              <TextField
                label="Price"
                variant="filled"
                type="number"
                min={0}
                name="price"
                value={productData.price}
                onChange={handleInput}
              />
              <TextField
                label="Stock"
                variant="filled"
                type="number"
                min={0}
                name="stock"
                value={productData.stock}
                onChange={handleInput}
              />
            </form>

            <footer className="sticky bottom-0 right-0 bg-white w-full  p-4 flex justify-end shadow-[0 10px 10px 0 rgba(0, 0, 0, 0.1)]">
              <Button
                variant="contained"
                className=""
                type="submit"
                onClick={handleSubmit}>
                Add Product
              </Button>
            </footer>
          </div>
        </div>
      )}
      {!componentStatus.isAddModalOpen && (
        <Button
          variant="contained"
          size="small"
          onClick={() => setComponentStatus({ isAddModalOpen: true })}>
          Add Product
        </Button>
      )}
    </>
  );
}

export default AddNewProduct;
