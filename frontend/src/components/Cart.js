import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cart');
        setCart(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/cart/${productId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!cart) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.items.map((item) => (
          <div key={item.product._id}>
            <h4>{item.product.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
            <button onClick={() => removeFromCart(item.product._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <h3>
        Total: $
        {cart.items.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        )}
      </h3>
    </div>
  );
};

export default Cart;
