import React, { useState, useEffect } from "react";
import { getProduct, deleteProduct } from "../../service/apiServices";

import style from "./ProductTable.module.css";
import {
  DetailsModal,
  EditProduct,
  ConfirmationModal,
  LoadingAnimation1,
} from "../../components";

function ProductTable() {
  const [productID, setProductID] = useState([]);
  const [total, setTotal] = useState(0);
  const [filteredProducts, setFilteredProduct] = useState([]);
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
        const response = await getProduct(pagination.page, pagination.limit, search);
        if (response) {
          const data = response.products;
          setTotal(Math.ceil(response.total / pagination.limit));
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
  }, [pagination, search]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);
      alert("Item Deleted ", response);
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

  return (
    <div className={style.container}>
      {/* conditional Renders */}
      {componentStatus.isEditOpen && (
        <EditProduct
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
        <h1 className={style.title}>Product List</h1>
      </header>

      <section className={style.searchSection}>
        <input
          className={style.searchInput}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Product"
        />
        <button className={style.clearSearchButton} onClick={() => setSearch("")}>
          Clear
        </button>
      </section>

      <table className={style.table}>
        <thead className={style.tableHeader}>
          <tr>
            <th style={{ width: "15%" }}>Thumbnail</th>
            <th style={{ width: "10%" }}>Name</th>
            <th style={{ width: "50%" }}>Description</th>
            <th style={{ width: "15%" }}>Price</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>

        <tbody className={style.body}>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No Items Found
              </td>
            </tr>
          ) : componentStatus.isLoading ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "5rem",
                }}>
                <LoadingAnimation1 />
              </td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
              <tr style={{ height: "10rem" }} key={index}>
                <td
                  style={{ textAlign: "center" }}
                  onClick={() =>
                    setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                  }>
                  <img
                    className={style.img}
                    src={product.images[0]}
                    alt={product.title}
                  />
                </td>

                <td
                  className={style.data}
                  onClick={() =>
                    setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                  }>
                  {product.title}
                </td>

                <td
                  className={style.data}
                  onClick={() =>
                    setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                  }>
                  {product.description}
                </td>

                <td
                  style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}
                  className={`${style.priceContainer} ${style.data}`}
                  onClick={() =>
                    setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                  }>
                  ${product.price}{" "}
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
                        isConfirmOpen: "Are you want to Delete the product?",
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
        <button className={style.nav} onClick={handlePaginationLeft}>{`<`}</button>
        <select
          className={style.dropdown}
          value={pagination.page}
          onChange={(e) => setPagination((p) => ({ ...p, page: e.target.value }))}>
          {Array.from({ length: total }).map((_, index) => (
            <option value={index + 1}>{index + 1}</option>
          ))}
        </select>
        <button className={style.nav} onClick={handlePaginationRight}>{`>`}</button>
        {pagination.limit > 0 && <p>of {total}</p>}
        <select
          className={`${style.dropdown} ${style.limit}`}
          value={pagination.limit}
          onChange={(e) => setPagination((p) => ({ ...p, limit: e.target.value }))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </footer>
    </div>
  );
}
export default ProductTable;
