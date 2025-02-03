import React, { useState, useEffect } from "react";
import { getProduct, deleteProduct } from "../../service/apiServices";
import { MenuItem, Select, TextField, InputLabel, FormControl } from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Star,
  Close,
  MoreVert,
} from "@mui/icons-material";

import { useViewport } from "../../lib";

import style from "./ProductTable.module.css";
import {
  DetailsModal,
  EditProduct,
  ConfirmationModal,
  AddNewProduct,
  MobileEditModal,
} from "../../components";
import { Toaster, toast } from "sonner";

function ProductTable() {
  const { viewportWidth } = useViewport();
  const [productID, setProductID] = useState([]);
  const [total, setTotal] = useState(0);
  const [filteredProducts, setFilteredProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [componentStatus, setComponentStatus] = useState({
    isLoading: false,
    isError: null,
    isModalOpen: null,
    isEditOpen: null,
    isConfirmOpen: null,
    isShowMobileMore: null,
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  useEffect(() => {
    const fetchProducts = async () => {
      setComponentStatus((cs) => ({ ...cs, isLoading: true }));
      try {
        const response = await getProduct();
        if (response) {
          const data = response.products;
          setTotal(Math.ceil(response.total / pagination.limit));
          setProducts([...data]);
          setFilteredProduct([...data]);
        }
      } catch (error) {
        setError(error.message);
        alert(error.message);
      } finally {
        setComponentStatus((cs) => ({ ...cs, isLoading: false }));
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setTotal(Math.ceil(filteredProducts.length / pagination.limit));
  }, [filteredProducts, pagination.limit]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPagination((p) => ({ ...p, page: 1 }));
    setFilteredProduct(
      products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDelete = async (id) => {
    toast.loading("Deleting Product...");
    try {
      const response = await deleteProduct(id);
      setProducts((p) =>
        p.map((product) => (product.id === response.id ? response : product))
      );
      setFilteredProduct((p) =>
        p.map((product) => (product.id === response.id ? response : product))
      );
      console.log("Product Deleted: ", response);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      toast.success("Product Deleted Successfully");
      setComponentStatus((cs) => ({ ...cs, isConfirmOpen: null }));
      toast.dismiss();
    }
  };

  const handlePaginationRight = () => {
    if (pagination.page === total) return;
    setPagination((p) => ({ ...p, page: p.page < total ? p.page + 1 : 1 }));
  };

  const handlePaginationLeft = () => {
    if (pagination.page === 1) return;
    setPagination((p) => ({ ...p, page: p.page > 1 ? p.page - 1 : total }));
  };

  const handleAddNewProduct = (productData) => {
    setProducts((p) => [...p, { ...productData }]);
    setFilteredProduct((p) => [...p, { ...productData }]);
  };

  const handleUpdate = async (product) => {
    setProducts((p) => p.map((p) => (p.id === product.id ? product : p)));
    setFilteredProduct((p) => p.map((p) => (p.id === product.id ? product : p)));
  };

  return (
    <div className="p-4 w-full">
      <Toaster richColors position="top-center" />
      {/* conditional Renders */}
      {componentStatus.isShowMobileMore && (
        <MobileEditModal
          product={componentStatus.isShowMobileMore}
          onClose={() =>
            setComponentStatus({ ...componentStatus, isShowMobileMore: null })
          }
          onDelete={() => {
            setComponentStatus({
              ...componentStatus,
              isConfirmOpen: "Are you sure you want to delete this product?",
              isShowMobileMore: null,
            });
            setProductID(componentStatus.isShowMobileMore.id);
          }}
          onEdit={() =>
            setComponentStatus((cs) => ({
              ...cs,
              isEditOpen: componentStatus.isShowMobileMore,
              isShowMobileMore: null,
            }))
          }
        />
      )}
      {componentStatus.isEditOpen && (
        <EditProduct
          updatedProduct={handleUpdate}
          productDetails={componentStatus.isEditOpen}
          onClose={() =>
            setComponentStatus({
              ...componentStatus,
              isEditOpen: null,
            })
          }
        />
      )}

      {componentStatus.isModalOpen && (
        <DetailsModal
          productDetails={componentStatus.isModalOpen}
          onClose={() =>
            setComponentStatus({ ...componentStatus, isModalOpen: null })
          }></DetailsModal>
      )}

      {componentStatus.isConfirmOpen && (
        <ConfirmationModal
          onConfirm={() => handleDelete(productID)}
          onClose={() => setComponentStatus((cs) => ({ ...cs, isConfirmOpen: null }))}
          message={componentStatus.isConfirmOpen}
        />
      )}

      {/* main render */}
      <header className="bg-blue-500 p-4 text-center">
        <h1 className="md:text-3xl font-bold text-white">PRODUCTS DEMO</h1>
      </header>

      <section className="relative flex justify-between items-center py-4 gap-4">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search Product"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        {search && (
          <button
            className="absolute right-32 md:right-40 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
            onClick={() => {
              setSearch("");
              setFilteredProduct(products);
            }}>
            <Close />
          </button>
        )}
        <AddNewProduct newProduct={handleAddNewProduct}></AddNewProduct>
      </section>

      <table className={style.table}>
        {viewportWidth > 768 && (
          <thead className="bg-gray-100">
            <tr className="md:h-20">
              <th className="md:w-[10%] p-4">Thumbnail</th>
              <th className="md:w-[10%] p-4 ">Name</th>
              <th className="md:w-1/2 p-4 ">Description</th>
              <th className="md:w-[10%] p-4 text-center">Price</th>
              <th className="md:w-[10%] p-4 text-center">Action</th>
            </tr>
          </thead>
        )}

        <tbody className={style.body}>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ paddingLeft: "2rem" }}>
                No Items Found
              </td>
            </tr>
          ) : componentStatus.isLoading ? (
            <tr>
              <td colSpan={6} style={{ paddingLeft: "2rem" }}>
                Searching...
              </td>
            </tr>
          ) : (
            filteredProducts
              .filter((product) => !product.isDeleted)
              .slice(
                (pagination.page - 1) * pagination.limit,
                pagination.page * pagination.limit
              ) // Slicing for pagination
              .map((product, index) =>
                viewportWidth > 768 ? (
                  <tr
                    style={{ height: "10rem", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}
                    key={index}>
                    <td
                      className="text-center"
                      onClick={() =>
                        setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                      }>
                      <img
                        className="h-40 w-auto inline-block object-contain"
                        src={
                          typeof product.images[0] === "object"
                            ? URL.createObjectURL(product.images[0])
                            : product.images[0]
                        }
                        alt={product.title}
                      />
                    </td>
                    <td
                      style={{ fontSize: "1.1rem" }}
                      className={style.data}
                      onClick={() =>
                        setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                      }>
                      {product.title}
                    </td>
                    <td
                      style={{ color: "var(--text)" }}
                      className={style.data}
                      onClick={() =>
                        setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                      }>
                      {product.description}
                    </td>
                    <td
                      className="text-center text-blue-500 font-semibold text-2xl"
                      onClick={() =>
                        setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                      }>
                      <h3 className="text-center text-blue-500">₱{product.price} </h3>
                      <div className="text-white font-semibold text-base bg-blue-500 mt-4 ml-4 px-2 py-1 rounded-full break">
                        {product.discountPercentage}% OFF
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className={style.actionButton}
                        onClick={() => {
                          setComponentStatus((cs) => ({
                            ...cs,
                            isConfirmOpen:
                              "Are you sure you want to delete this product?",
                          }));
                          setProductID(product.id);
                        }}>
                        Delete
                      </button>
                      <button
                        className={style.actionButton}
                        onClick={() =>
                          setComponentStatus((cs) => ({ ...cs, isEditOpen: product }))
                        }>
                        Edit
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={index}
                    onClick={() =>
                      setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                    }>
                    <td className="flex items-start ">
                      <img
                        className="h-30 aspect-square object-contain -ml-6"
                        src={
                          typeof product.images[0] === "object"
                            ? URL.createObjectURL(product.images[0])
                            : product.images[0]
                        }
                        alt={product.title}
                      />

                      <div className="flex flex-col gap-3">
                        <h1 className="relative text-lg font-bold">
                          {product.title}{" "}
                          <span
                            className="absolute right-0 z-10 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setComponentStatus({
                                ...componentStatus,
                                isShowMobileMore: product,
                              });
                            }}>
                            <MoreVert />
                          </span>
                        </h1>
                        <p className="line-clamp-2 text-gray-500 text-sm">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <h1 className="text-xl  font-bold text-blue-500">
                            ₱ {product.price}
                          </h1>
                          <div className="flex items-center gap-1 border border-gray-500 rounded-full px-2 ">
                            {<Star sx={{ fontSize: "1rem" }} />} {product.rating}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              )
          )}
        </tbody>
      </table>

      <footer className="flex gap-1 md:gap-4 items-center">
        <button
          className={`bg-transparent ${pagination.page === 1 || "cursor-pointer"}`}
          onClick={handlePaginationLeft}>
          <ArrowBackIosNew />
        </button>
        <Select
          sx={{ width: "5rem" }}
          value={pagination.page}
          onChange={(e) =>
            setPagination((p) => ({ ...p, page: Number(e.target.value) }))
          }>
          {Array.from({ length: total }).map((_, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
        <button
          className={`bg-transparent ${pagination.page === total || "cursor-pointer"}`}
          onClick={handlePaginationRight}>
          <ArrowForwardIos />
        </button>
        {pagination.limit > 0 && (
          <p>
            of {total} pages ({products.length})
          </p>
        )}
        <FormControl style={{ position: "relative" }}>
          <InputLabel id="per_page">Per Page</InputLabel>
          <Select
            sx={{ width: "6rem" }}
            labelId="per_page"
            label="Per Page"
            value={pagination.limit}
            onChange={(e) => {
              setPagination((p) => ({ ...p, limit: e.target.value }));
              setPagination((p) => ({ ...p, page: 1 }));
            }}>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="20">20</MenuItem>
          </Select>
        </FormControl>
      </footer>
    </div>
  );
}
export default ProductTable;
