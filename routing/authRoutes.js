const expres = require("express");
const {
  Login,
  verifyLogin,
  LogoutHandler,
} = require("../controller/authController");
const { secure } = require("../middleware/secure");
const { getProfile } = require("../controller/profileController");

const router = expres.Router();

router.get("/verify", secure, verifyLogin);
router.post("/login", Login);
router.delete("/logout", secure, LogoutHandler);
router.get("/profile", secure, getProfile);
module.exports = router;
