// User model schema for MongoDB

const mongoose = require("mongoose");

// User schema defines the structure of user documents in MongoDB
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's display name
  email: { type: String, required: true, unique: true }, // Unique user email
  passwordHash: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ["user", "admin"], default: "user" }, // User role
  createAt: { type: Date, default: Date.now }, // Creation date
});

module.exports = mongoose.model("User", userSchema);
