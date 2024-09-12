const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  addres: String,
  profilePic: String,
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
