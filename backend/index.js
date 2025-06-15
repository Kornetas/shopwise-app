// Load enviroment variables from .env file
require("dotenv").config();

// Shopwise backend main entry point

const express = require("express");
const app = express();

// allows receiving JSON in req.body
app.use(express.json());

// Middleware to read cookies from the request headers
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Connecting to MongoDB database
const connectDB = require("./config/db");
connectDB();

// Import user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Simple healhcheck endpoint for testing the server

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", messsage: "Backend is running" });
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
