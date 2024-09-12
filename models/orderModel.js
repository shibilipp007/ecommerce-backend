const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.ObjectId, ref: "Product", required: true },
  cartId: { type: mongoose.ObjectId, ref: "Cart", required: true },
  shipping_address: { type: mongoose.ObjectId, ref: "User", required: true },
  totalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
