const Order = require("../models/orderModel");

const getOrders = async (req, res) => {
  await Order.find({})
    .populate("userId")
    .populate("productId")
    .populate("cartId");
  res.json(getOrders);
};

const getOrderById = async (req, res) => {
  await Order.findById(req.pqrams.id)
    .populate("userId")
    .populate("productId")
    .populate("cartId");
  res.json(getOrderById);
};

const createOrder = async (req, res) => {
  const { userId, productId, cartId, totalPrice } = req.dody;
  const newOrder = new Order({ userId, productId, totalPrice });
  await newOrder.save();
  res.json(newOrder);
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
};
