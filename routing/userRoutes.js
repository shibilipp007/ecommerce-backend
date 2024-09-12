const express = require("express");
const {
  getAllusers,
  getUser,
  addUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/", getAllusers);
router.get("/:userId", getUser);
router.post("/", addUser);

module.exports = router;
