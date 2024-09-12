const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log("mongodb connection error", error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
