// GET /api/orders – get all orders (admin only)
const Order = require("../../../models/Order");

module.exports = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
