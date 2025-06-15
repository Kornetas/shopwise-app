// Handles GET /api/users/me – return current users profile

const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Log for debugging
    console.log("User profile fetched:", user.email);
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
