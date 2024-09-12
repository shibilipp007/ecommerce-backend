const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).exec();

  if (!user) {
    return res.status(401).send("Unautherised access: No user found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    var token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_KEY
    );
    res
      .cookie("token", token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } else {
    res.status(401).send("unautherised access : password not match");
  }
};

const verifyLogin = async (req, res) => {
  res.json(req.user);
};

const LogoutHandler = (req, res) => {
  return res
    .clearCookie("token")
    .sendStatus(204)
    .json({ message: "loggedOut" });
};

module.exports = {
  Login,
  verifyLogin,
  LogoutHandler,
};
