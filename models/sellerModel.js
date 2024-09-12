const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  phoneNumber: Number,
  shopName: String,
  gstNo: String,
  address: String,
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = { Seller };
