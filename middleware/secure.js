var jwt = require("jsonwebtoken");

const secure = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unautherised request access denied." });
  }

  try {
    const userData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    console.log(userData);
    req.userId = userData._id;
    req.role = userData.role;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = { secure };
