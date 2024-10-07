const { image } = require("../lib/cloudinary");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const catchAsync = require("../util/catchAsync");
const stripe = require(`stripe`)(process.env.STRIPE_SECRET_KEY);

const getOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("userId")
    .populate("productId")
    .populate("cartId");
  res.json(orders);
};

const createOrder = catchAsync(async (req, res) => {
  const cart = await Cart.find({ userId: req.userId });
  if (!cart) {
    return res.status(400).json({ message: "cart not find" });
  }
  const order = new Order({
    userId: req.userId,
  });
  await order.save();

  // delete item from cart after ordre success

  await Cart.findOneAndDelete({ userId });
  res.status(201).json({ success: true, order });
});

//  handle payment

const handlePayment = catchAsync(async (req, res) => {
  const { paymentMethod, products } = req.body;

  switch (paymentMethod) {
    case "cod":
      res.status(203).json({ navigationEndpoint: { url: "/orders/success" } });

      try {
        const cart = await Cart.findOne({ user: req.userId });

        await Promise.all(
          products.map(async (item) => {
            await cart.updateOne({
              $pull: { products: { product: item.product._id } },
            });
          })
        );
      } catch (error) {}

    case "card":
      const lineItems = products?.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.product.title,
              images: [item.product.image?.[0]], // Access the first image properly
            },
            unit_amount: Number(item.product.price) * 100, // Amount in paise (INR)
          },
          quantity: item.quantity,
        };
      });

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/orders/success",
        cancel_url: "http://localhost:5173/orders/rejected",
      });

      // delete items from cart
      const cart = await Cart.findOne({ user: req.userId });

      await Promise.all(
        products.map(async (item) => {
          await cart.updateOne({
            $pull: { products: { product: item.product._id } },
          });
        })
      );

      return res.json({ id: session.id });
    default:
      return res.status(400).json({ message: "Invalid payment mothod" });
  }
});

module.exports = {
  getOrders,
  createOrder,
  handlePayment,
};
