const hasRole = (roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      req.status(401).send("unatherised access : doesn't have a role");
    }
  };
};

module.exports = { hasRole };
