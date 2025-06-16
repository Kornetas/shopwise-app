// GET /api/orders/my – get current users orders
const Order = require("../../../models/Order");

module.exports = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
