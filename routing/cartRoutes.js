const express = require("express");
const {
  getCartsById,
  addToCart,
  deleteCart,
} = require("../controller/cartController");
const { secure } = require("../middleware/secure");

const router = express.Router();

router.get("/", secure, getCartsById);
router.post("/", secure, addToCart);
router.delete("/:cartId", secure, deleteCart);

module.exports = router;
