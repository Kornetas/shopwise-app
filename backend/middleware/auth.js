// Middleware for checking JWT authentication (user must be logged in)

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies?.token;

  // If there is no token, user is not authenticated
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify and decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Atach user info to request object for later use
    req.user = decoded;

    // Call next middleware/controller
    next();
  } catch (error) {
    console.error("JWT auth error:", error.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};
