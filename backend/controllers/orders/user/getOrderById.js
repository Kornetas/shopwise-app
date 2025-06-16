// GET /api/orders/:id – get single order by ID (for orders owner)
const Order = require("../../../models/Order");

module.exports = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Only allow user to see their own order, or admin
    if (
      order.user.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
