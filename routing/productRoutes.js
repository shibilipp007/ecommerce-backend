const express = require("express");

const {
  getAllPorducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { secure } = require("../middleware/secure");
const { hasRole } = require("../middleware/hasRole");

const router = express.Router();

router.get("/", getAllPorducts);
router.get("/:productId", getProductById);
router.post("/", secure, hasRole(["seller", "admin"]), addProduct);
router.patch(
  "/:productId",
  secure,
  hasRole(["seller", "admin"]),
  updateProduct
);
router.delete(
  "/:productId",
  secure,
  hasRole(["seller", "admin"]),
  deleteProduct
);

module.exports = router;
