const Cart = require("../models/cartModel");
const { Product } = require("../models/productModel");
const catchAsync = require("../util/catchAsync");

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate(
    "products.product"
  );
  res.json(cart);
};

// const addToCart = catchAsync(async (req, res) => {
//   const userId = req.userId;
//   const { productId, quantity } = req.body;
//   const product = await Product.findById(productId);
//   if (!product) {
//     return res.status(404).json({ message: "Product not found." });
//   }
//   let cart = await Cart.findOne({ user: userId });
//   if (!cart) {
//     cart = new Cart({ user: userId, products: [], totalPrice: 0 });
//   }
//   const productIndex = cart.products.findIndex(
//     (prod) => prod.product.toString() === productId
//   );
//   if (productIndex >= 0) {
//     cart.products[productIndex].quantity += quantity;
//   } else {
//     cart.products.push({ product: productId, quantity });
//   }
//   cart.totalPrice = cart.products.reduce(
//     (total, item) => total + item.quantity * product.price,
//     0
//   );
//   cart = await cart.save().populate("products.product");
//   res.json(cart);
// });

const addToCart = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  // Find or create the user's cart
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, products: [], totalPrice: 0 });
  }

  // Check if the product is already in the cart
  const productIndex = cart.products.findIndex(
    (prod) => prod.product.toString() === productId
  );
  if (productIndex >= 0) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  // Update the total price
  cart.totalPrice = cart.products.reduce(
    (total, item) => total + item.quantity * product.price,
    0
  );

  // Save the cart
  await cart.save();
  // Populate the cart products
  cart = await cart.populate("products.product"); // Separate populate query

  res.json(cart);
});

const updateCartProductQuantityHandler = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(productId);

  let cart = await Cart.findOne({ user: req.userId }).populate(
    "products.product"
  );
  if (!cart) {
    return res.status(404).json({ message: "Cart not find" });
  }
  const productIndex = cart.products.findIndex(
    (prod) => prod.product._id.toString() === productId
  );
  console.log(productIndex);

  if (productIndex === -1) {
    return res.status(400).json({ message: "cannot update quantity." });
  }
  cart.products[productIndex].quantity = quantity;
  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
  cart = await cart.save();
  return res.status(200).json(cart);
});

const deleteCart = catchAsync(async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.userId }).populate(
    "products.product"
  );
  if (!cart) {
    return res.sendStatus(403);
  }
  const productIndex = cart.products.findIndex(
    (prod) => prod.product._id.toString() === productId
  );
  if (productIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  cart.products.splice(productIndex, 1);
  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
  cart = await cart.save();
  return res.status(200).json(cart);
});

module.exports = {
  getCart,
  addToCart,
  deleteCart,
  updateCartProductQuantityHandler,
};
