const router = require('express').Router();
const auth = require('../middleware/auth');
let Order = require('../models/order.model');
let Cart = require('../models/cart.model');

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { shippingAddress, paymentResult } = req.body;
    const cart = await Cart.findOne({ user: req.user }).populate(
      'items.product'
    );

    if (cart) {
      const totalPrice = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );

      const order = new Order({
        user: req.user,
        items: cart.items,
        shippingAddress,
        paymentResult,
        totalPrice,
        isPaid: true,
        paidAt: Date.now(),
      });

      const createdOrder = await order.save();
      // Clear the cart after the order is created
      await Cart.findOneAndDelete({ user: req.user });
      res.status(201).json(createdOrder);
    } else {
      res.status(400).json({ msg: 'Cart is empty' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
