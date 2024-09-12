const Cart = require("../models/cartModel");

const getCartsById = async (req, res) => {
  await Cart.findById(req.params.cartId).populate(`product`).exec();
  res.json(getCartsById);
};

const addToCart = async (req, res) => {
  const data = req.body;
  const cart = new Cart(data);
  await cart.save();
  res.json(cart);
};

const deleteCart = async (req, res) => {
  await Cart.findByIdAndDelete();
  res.send("item deleted");
};

module.exports = {
  getCartsById,
  addToCart,
  deleteCart,
};
