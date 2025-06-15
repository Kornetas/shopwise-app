// Handles GET /api/products/:id – get product by ID

const Product = require("../../../models/Product");

module.exports = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // log for debugging
    console.log("Fetched product", product.name);
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
