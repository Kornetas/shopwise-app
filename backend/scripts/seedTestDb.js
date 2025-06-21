// Script for seeding test database: adds products, two test users (admin + user), and clears orders

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Example products for testing and E2E demo purposes
const products = [
  {
    name: "iPhone 15 Pro",
    description: "Flagship Apple smartphone.",
    price: 5999,
    category: "smartphone",
    brand: "Apple",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg",
    countInStock: 8,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "High-end Samsung smartphone.",
    price: 5299,
    category: "smartphone",
    brand: "Samsung",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg",
    countInStock: 12,
  },
  {
    name: "MacBook Air M3",
    description: "Lightweight Apple laptop.",
    price: 7499,
    category: "laptop",
    brand: "Apple",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg",
    countInStock: 5,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Premium noise cancelling headphones.",
    price: 1699,
    category: "headphones",
    brand: "Sony",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg",
    countInStock: 20,
  },
  {
    name: "Xiaomi Mi Band 8",
    description: "Popular fitness tracker.",
    price: 299,
    category: "smartwatch",
    brand: "Xiaomi",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg",
    countInStock: 15,
  },
];

// Test users: one admin and one normal user
const testUsers = [
  {
    name: "Admin",
    email: "d@o2.pl",
    password: "d",
    role: "admin",
  },
  {
    name: "Test User",
    email: "a@o2.pl",
    password: "a",
    role: "user",
  },
];

// Main async function to seed the database
async function seed() {
  try {
    // Connect to MongoDB using environment variable
    await mongoose.connect(process.env.MONGO_URI);

    // Clear all data (use ONLY for test/development database!)
    await Product.deleteMany({});
    await User.deleteMany({});
    if (Order) await Order.deleteMany({});

    // Create users with hashed passwords
    for (const userData of testUsers) {
      const passwordHash = await bcrypt.hash(userData.password, 10); // Hash the password
      await User.create({
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: userData.role,
      });
    }

    // Insert products into the database
    const createdProducts = await Product.insertMany(products);

    // Log results to the console
    console.log(
      "Seeded products:",
      createdProducts.map((p) => p.name)
    );
    console.log(
      "Test users created: ",
      testUsers.map((u) => u.email).join(", ")
    );

    process.exit(0); // Exit the script
  } catch (err) {
    // Print error if seeding failed
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
}

// Run the seeding function
seed();
