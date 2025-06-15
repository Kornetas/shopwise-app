// Load enviroment variables from .env file
require("dotenv").config();

// Shopwise backend main entry point

const express = require("express");
const app = express();

// Simple healhcheck endpoint for testing the server

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", messsage: "Backend is running" });
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
