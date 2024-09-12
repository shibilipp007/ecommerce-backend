const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId, ref: "Uesr", required: true },
  productId: { type: mongoose.ObjectId, ref: "Product" },
  totalPrice: Number,
  quantity: { type: Number, required: true, min: 1 },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
