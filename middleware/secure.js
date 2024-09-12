var jwt = require("jsonwebtoken");

const secure = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const userData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
      req.user = { userId: userData._id, role: userData.role };
      console.log(userData);

      next();
    } catch {
      res.status(401).json({ message: "unautherised access" });
    }
  } else {
    res.status(401).json("NO user found");
  }
};

module.exports = { secure };
