// Handles PUT /api/products/:id – update product by ID (admin only)

const Product = require("../../../models/Product");

module.exports = async (req, res) => {
  try {
    const { name, description, price, category, brand, image, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update fields if present in request body
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.image = image || product.image;
    product.countInStock = countInStock || product.countInStock;

    const updateProduct = await product.save();

    // Log update
    console.log("Product updated:", updateProduct.name);
    res.json(updateProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
