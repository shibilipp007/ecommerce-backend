const express = require("express");
const {
  getCartsById,
  addToCart,
  deleteCart,
} = require("../controller/cartController");

const router = express.Router();

router.get("/:cartId", getCartsById);
router.post("/", addToCart);
router.delete("/:cartId", deleteCart);

module.exports = router;
