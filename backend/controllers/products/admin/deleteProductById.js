// Handles DELETE /api/products/:id – delete product by ID (admin only)

const Product = require("../../../models/Product");

module.exports = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Log deletion
    console.log("Product deleted:", product.name);

    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
