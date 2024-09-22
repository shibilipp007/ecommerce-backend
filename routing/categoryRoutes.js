const express = require("express");
const {
  getAllcategory,
  getCatById,
  addCategory,
  deleteCategory,
} = require("../controller/categoryController");
const { secure } = require("../middleware/secure");
const { hasRole } = require("../middleware/hasRole");

const router = express.Router();

router.get("/", getAllcategory);
router.get("/:categoryId", getCatById);
router.post("/", secure, hasRole(["admin"]), addCategory);
router.delete("/:categoryId", secure, hasRole(["admin"]), deleteCategory);

module.exports = router;
