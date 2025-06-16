// Express app setup

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connecting to MongoDB database
connectDB();

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);

// Simple healhcheck endpoint for testing the server
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running!" });
});

module.exports = app;
