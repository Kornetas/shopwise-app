// User routes for handling user-realted API endpoints

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Get /api/users - return all users (for test only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/users/register – Register new user
router.post("/register", async (req, res) => {
  try {
    // Extract name, email and password from request body
    const { name, email, password } = req.body;

    // Simple validation – check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user already exists (email should be unique)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user document
    const newUser = new User({
      name,
      email,
      passwordHash,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // For now, do NOT return passwordHash in response
    const userResponse = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
    };

    // Debug: log saved user
    console.log("User registered:", userResponse);

    res.status(201).json(userResponse);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
