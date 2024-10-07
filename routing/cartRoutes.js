const express = require("express");
const {
  getCart,
  addToCart,
  deleteCart,
  updateCartProductQuantityHandler,
} = require("../controller/cartController");
const { secure } = require("../middleware/secure");

const router = express.Router();

router
  .route("/")
  .get(secure, getCart)
  .post(secure, addToCart)
  .put(secure, updateCartProductQuantityHandler);

router.post("/RemoveItem", secure, deleteCart);

module.exports = router;
