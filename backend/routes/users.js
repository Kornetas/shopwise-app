// User routes for handling user-realted API endpoints

const express = require("express");
const router = express.Router();
const register = require("../controllers/users/register");

router.post("/register", register);

// Get /api/users - return all users (for test only)
const User = require("../models/User");
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
