const User = require("../models/userModel");
const catchAsync = require("../util/catchAsync");

const getProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({ profile: user });
});

module.exports = { getProfile };
