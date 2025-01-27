import React, { useState, useEffect } from "react";
import { getProduct, deleteProduct } from "../../service/apiServices";

import style from "./ProductTable.module.css";
import { DetailsModal } from "../../components";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [componentStatus, setComponentStatus] = useState({
    isLoading: false,
    isError: null,
    isModalOpen: null,
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct(pagination.page, pagination.limit);
        if (response) {
          const data = response.products;
          setProducts((p) => [...data]);
          setFilteredProduct([...data]);
        }
      } catch (error) {
        setError(error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [pagination]);

  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    if (search === "") {
      setFilteredProduct(products);
    } else {
      setFilteredProduct(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);
      alert("Item Deleted ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (loading) return <div>Loading.....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {componentStatus.isModalOpen && (
        <DetailsModal
          productDetails={componentStatus.isModalOpen}
          onClose={() =>
            setComponentStatus({ ...componentStatus, isModalOpen: null })
          }></DetailsModal>
      )}
      <h1>Product List</h1>
      <input type="text" value={search} onChange={handleSearch} />
      <table className={style.table}>
        <thead className={style.header}>
          <tr>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className={style.body}>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={6}>No Items Found</td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
              <tr
                key={index}
                onClick={() =>
                  setComponentStatus((cs) => ({ ...cs, isModalOpen: product }))
                }>
                <td className={style.thumbnail}>
                  <img
                    className={style.img}
                    src={product.images[0]}
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td className={style.priceContainer}>
                  ${product.price}{" "}
                  <div className={style.discountBadge}>
                    {product.discountPercentage}% OFF
                  </div>
                </td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        <button>{`<`}</button>
        <select name="" id="">
          <option value="1">1</option>
        </select>
        <button>{`>`}</button>
        <p>of {``}</p>
        <select
          value={pagination.limit}
          onChange={(e) => setPagination((p) => ({ ...p, limit: e.target.value }))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}
export default ProductTable;
