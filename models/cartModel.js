const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "Uesr",
    required: true,
    index: true,
    unique: true,
  },
  products: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalPrice: Number,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
