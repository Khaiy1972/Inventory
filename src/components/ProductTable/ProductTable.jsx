import React, { useState, useEffect } from "react";
import { getProduct, deleteProduct } from "../../service/apiServices";

import style from "./ProductTable.module.css";
import {
  DetailsModal,
  EditProduct,
  ConfirmationModal,
  AddNewProduct,
} from "../../components";
import { set } from "lodash";

function ProductTable() {
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
  }, [pagination.limit]);

  useEffect(() => {
    setTotal(Math.ceil(filteredProducts.length / pagination.limit));
  }, [filteredProducts, pagination.limit]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    setFilteredProduct(
      products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);
      setProducts((p) =>
        p.map((product) => (product.id === response.id ? response : product))
      );
      setFilteredProduct((p) =>
        p.map((product) => (product.id === response.id ? response : product))
      );
      console.log("Product Deleted: ", response);
      alert("Product Deleted", response);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setComponentStatus((cs) => ({ ...cs, isConfirmOpen: null }));
    }
  };

  const handlePaginationRight = () => {
    setPagination((p) => ({ ...p, page: p.page < total ? p.page + 1 : 1 }));
  };

  const handlePaginationLeft = () => {
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
    <div className={style.container}>
      {/* conditional Renders */}
      {componentStatus.isEditOpen && (
        <EditProduct
          updatedProduct={handleUpdate}
          productDetails={componentStatus.isEditOpen}
          onClose={() => setComponentStatus({ ...componentStatus, isEditOpen: null })}
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
      <header className={style.header}>
        <h1 className={style.title}>PRODUCTS DEMO</h1>
      </header>

      <section className={style.searchSection}>
        <input
          className={style.searchInput}
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Product"
        />
        {search && (
          <button className={style.clearSearchButton} onClick={() => setSearch("")}>
            X
          </button>
        )}
        <AddNewProduct newProduct={handleAddNewProduct}></AddNewProduct>
      </section>

      <table className={style.table}>
        <thead className={style.tableHeader}>
          <tr>
            <th style={{ width: "10%" }}>Thumbnail</th>
            <th style={{ width: "10%" }}>Name</th>
            <th style={{ width: "50%" }}>Description</th>
            <th style={{ width: "10%" }}>Price</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>

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
              .map((product, index) => (
                <tr
                  style={{ height: "10rem", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}
                  key={index}>
                  <td
                    style={{ textAlign: "center" }}
                    onClick={() =>
                      setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                    }>
                    <img
                      className={style.img}
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
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      color: "var(--primary)",
                      fontWeight: "600",
                    }}
                    className={`${style.priceContainer} ${style.data}`}
                    onClick={() =>
                      setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                    }>
                    ₱{product.price}{" "}
                    <div className={style.discountBadge}>
                      {product.discountPercentage}% OFF
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className={style.actionButton}
                      onClick={() => {
                        setComponentStatus((cs) => ({
                          ...cs,
                          isConfirmOpen: "Are you sure you want to delete this product?",
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
              ))
          )}
        </tbody>
      </table>

      <footer className={style.footer}>
        <button className={style.nav} onClick={handlePaginationLeft}>
          &#12296;
        </button>
        <select
          className={style.dropdown}
          value={pagination.page}
          onChange={(e) =>
            setPagination((p) => ({ ...p, page: Number(e.target.value) }))
          }>
          {Array.from({ length: total }).map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button className={style.nav} onClick={handlePaginationRight}>
          &#12297;
        </button>
        {pagination.limit > 0 && <p>of {total} pages (16 items)</p>}
        <div style={{ position: "relative" }}>
          <select
            className={`${style.dropdown} ${style.limit}`}
            value={pagination.limit}
            onChange={(e) => setPagination((p) => ({ ...p, limit: e.target.value }))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <p
            style={{
              position: "absolute",
              top: "-10px",
              left: "10px",
              color: "var(--text)",
              fontSize: "0.9rem",
              backgroundColor: "#ffffff",
              padding: "0 8px",
            }}>
            Per Page
          </p>
        </div>
      </footer>
    </div>
  );
}
export default ProductTable;
