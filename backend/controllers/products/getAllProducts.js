// Handles GET /api/products – return all products

const Product = require("../../models/Product");

module.exports = async (req, res) => {
  try {
    // Fetch all products from the databse
    const products = await Product.find({});
    // log for debugging
    console.log("Fetched all products. Count:", products.length);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
