// Middleware to check if user is admin

module.exports = (req, res, next) => {
  // req uset is set by auth middleware
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ error: "Admin access required." });
  }
};
