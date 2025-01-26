import React, { useState, useEffect } from "react";
import { getProduct } from "../../service/apiServices";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        if (response) {
          const data = response.products;
          setProducts((p) => [...p, ...data]);
        }
      } catch (error) {
        setError(error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading.....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              {console.log(products)}
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              {/* <td>
                {product.images.map((image) => (
                  <img
                    src={image}
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                ))}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductTable;
