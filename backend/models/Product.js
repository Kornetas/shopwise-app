// Product model schema for MongoDB

const mongoose = require("mongoose");

// Product schema defines structure of product documents in MongoDB
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  description: { type: String, required: true }, // Product description
  price: { type: Number, required: true }, // Product price
  category: { type: String, required: true }, // Product category (e.g. smartphone, laptop)
  brand: { type: String, required: true }, // Product brand
  image: { type: String }, // Image URL
  rating: { type: Number, default: 0 }, // Average rating
  numReviews: { type: Number, default: 0 }, // Number of reviews
  countInStock: { type: Number, default: 0 }, // Stock count
  createdAt: { type: Date, default: Date.now }, // Creation date
});

module.exports = mongoose.model("Product", productSchema);
