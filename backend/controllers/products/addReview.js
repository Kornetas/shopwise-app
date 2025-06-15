// Handles POST /api/products/:id/reviews – add review for product (auth required)

const Product = require("../../models/Product");

module.exports = async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.userId;
    const userName = req.user.name;

    // Validate
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === userId
    );
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this product" });
    }

    // Add review
    const review = {
      user: userId,
      name: userName || "Anonymous",
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);

    // Update numReviews and average rating
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
      product.reviews.length;

    await product.save();

    console.log(`Review added for product: ${product.name} by user: ${userId}`);
    res.status(201).json({ message: "Review added!" });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
