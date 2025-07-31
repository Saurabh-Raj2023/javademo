const router = require('express').Router();
const auth = require('../middleware/auth');
let Cart = require('../models/cart.model');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate(
      'items.product'
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add item to cart
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user });

    if (cart) {
      // Cart exists, update it
      const itemIndex = cart.items.findIndex(
        (p) => p.product == productId
      );

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        // Product does not exist in cart, add new item
        cart.items.push({ product: productId, quantity });
      }
      const savedCart = await cart.save();
      return res.status(201).json(savedCart);
    } else {
      // No cart for user, create new cart
      const newCart = await Cart.create({
        user: req.user,
        items: [{ product: productId, quantity }],
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item from cart
router.delete('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (p) => p.product == productId
      );

      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        const savedCart = await cart.save();
        return res.status(200).json(savedCart);
      }
    }
    return res.status(404).json({ msg: 'Item not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
