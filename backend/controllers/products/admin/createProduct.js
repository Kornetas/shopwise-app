// Handles POST /api/products – create a new product (admin only)

const Product = require("../../../models/Product");

module.exports = async (req, res) => {
  try {
    // Extract product data from request body
    const { name, description, price, category, brand, image, countInStock } =
      req.body;

    // Simple validation
    if (!name || !description || !price || !category || !brand) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new product document
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      image,
      countInStock,
    });

    // Save product to databse
    const savedProduct = await newProduct.save();

    // Log the new product
    console.log("Product created:", savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
