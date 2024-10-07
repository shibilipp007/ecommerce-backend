const expres = require("express");
const {
  Login,
  verifyLogin,
  LogoutHandler,
} = require("../controller/authController");
const { secure } = require("../middleware/secure");
const { getProfile } = require("../controller/profileController");
const { handlePayment } = require("../controller/orderController");

const router = expres.Router();

router.get("/verify", secure, verifyLogin);
router.post("/login", Login);
router.delete("/logout", secure, LogoutHandler);
router.get("/profile", secure, getProfile);
router.post("/create_checkout_session", secure, handlePayment);
module.exports = router;
