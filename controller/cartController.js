const Cart = require("../models/cartModel");
const { Product } = require("../models/productModel");
const catchAsync = require("../util/catchAsync");

const getCartsById = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate(
    "products.product"
  );
  res.json(cart);
};

const addToCart = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, products: [], totalPrice: 0 });
  }
  const productIndex = cart.products.findIndex(
    (prod) => prod.product.toString() === productId
  );
  if (productIndex >= 0) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }
  cart.totalPrice = cart.products.reduce(
    (total, item) => total + item.quantity * product.price,
    0
  );
  cart = await cart.save();
  res.json(cart);
});

const deleteCart = async (req, res) => {
  await Cart.findByIdAndDelete();
  res.send("item deleted");
};

module.exports = {
  getCartsById,
  addToCart,
  deleteCart,
};
