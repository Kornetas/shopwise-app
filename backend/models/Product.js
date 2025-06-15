// Product model schema for MongoDB

const mongoose = require("mongoose");

// Review schema for subdocuments in Product
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reviewer
  name: { type: String, required: true }, // Display name of reviewer
  rating: { type: Number, required: true }, // Rating (1-5)
  comment: { type: String }, // Review text
  createdAt: { type: Date, default: Date.now },
});

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
  reviews: [reviewSchema], // Array of reviews
  createdAt: { type: Date, default: Date.now }, // Creation date
});

module.exports = mongoose.model("Product", productSchema);
