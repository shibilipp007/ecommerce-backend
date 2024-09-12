const { response } = require("express");

const errorHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}:`, error);

  return res.status(500).json({ message: "internal server error" });
};

module.exports = errorHandler;
