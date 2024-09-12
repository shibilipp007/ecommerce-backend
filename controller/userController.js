const { Seller } = require("../models/sellerModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllusers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.body.userId).exec();
  res.json(user);
};

const addUser = async (req, res) => {
  console.log(req.body);

  const { name, email, password, role } = req.body;
  const saltRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    email,
    password: hash,
    role,
  });
  await user.save();

  

  if (role === "seller") {
    const { gstNo, shopName, phoneNumber, address } = req.body;
    const seller = await Seller.create({
      user: user._id,
      gstNo,
      shopName,
      phoneNumber,
      address,
    }).populate("user", "-password");
  }

  res.json(user);
};

module.exports = {
  getAllusers,
  getUser,
  addUser,
};
