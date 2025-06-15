// Script to seed example products to MongoDB

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// Example products
const products = [
  {
    name: "iPhone 15 Pro",
    description: "Flagship Apple smartphone.",
    price: 5999,
    category: "smartphone",
    brand: "Apple",
    image: "https://example.com/iphone15.jpg",
    countInStock: 8,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "High-end Samsung smartphone.",
    price: 5299,
    category: "smartphone",
    brand: "Samsung",
    image: "https://example.com/s24ultra.jpg",
    countInStock: 12,
  },
  {
    name: "MacBook Air M3",
    description: "Lightweight Apple laptop.",
    price: 7499,
    category: "laptop",
    brand: "Apple",
    image: "https://example.com/macbookair.jpg",
    countInStock: 5,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Premium noise cancelling headphones.",
    price: 1699,
    category: "headphones",
    brand: "Sony",
    image: "https://example.com/sonywh.jpg",
    countInStock: 20,
  },
  {
    name: "Xiaomi Mi Band 8",
    description: "Popular fitness tracker.",
    price: 299,
    category: "smartwatch",
    brand: "Xiaomi",
    image: "https://example.com/miband8.jpg",
    countInStock: 15,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Remove all existing products
    await Product.deleteMany({});
    // Insert new products
    const created = await Product.insertMany(products);

    console.log(
      "Seeded products:",
      created.map((p) => p.name)
    );
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
}

seed();
