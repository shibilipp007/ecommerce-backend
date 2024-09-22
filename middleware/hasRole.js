const hasRole = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(401).send("unatherised access : doesn't have a role");
    }

    return next();
  };
};

module.exports = { hasRole };
