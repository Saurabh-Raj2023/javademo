import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const { name, description, price, imageUrl } = formData;

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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        description,
        price,
        imageUrl,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(newProduct);

      const res = await axios.post('http://localhost:5000/products', body, config);
      setProducts([...products, res.data]);
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={onSubmit}>
        <h3>Add Product</h3>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={imageUrl}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Add Product" />
      </form>
      <div>
        <h3>Existing Products</h3>
        {products.map((product) => (
          <div key={product._id}>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
