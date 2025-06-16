// MongoDb connection config

const mongoose = require("mongoose");

// Connects to the MongoDB database using the connection string from .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the procces if the DB connection fails
  }
};

module.exports = connectDB;
