import React, { useEffect, useState } from "react";

const PaketLengkap = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?categoryId=${categoryId}`);
        const data = await response.json();
        if (data.status === "success") {
          setProducts(data.products);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h1>Products in Category {categoryId}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaketLengkap;
