import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('https://your-deployed-backend.herokuapp.com/cart');
        setCart(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`https://your-deployed-backend.herokuapp.com/cart/${productId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!cart || cart.items.length === 0) {
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
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
