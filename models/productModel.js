const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [String],
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.ObjectId, ref: "Category", required: true },
  quantity: { type: Number, required: true },
  slug: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
