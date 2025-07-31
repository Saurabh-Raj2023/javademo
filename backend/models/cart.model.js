const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
