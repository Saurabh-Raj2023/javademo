import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ productId, quantity: 1 });

      await axios.post('http://localhost:5000/cart', body, config);
      alert('Product added to cart');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <img src={product.imageUrl} alt={product.name} width="200" />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
