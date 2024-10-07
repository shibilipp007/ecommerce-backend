const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
    shippingAdress: {
      firstName: String,
      street: String,
      city: String,
      postalCode: Number,
      phoneNumber: Number,
    },
    paymentMethode: { type: String, required: true },
    totalAmout: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
