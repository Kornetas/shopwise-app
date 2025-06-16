// PUT /api/orders/:id/status – update order status (admin only)
const Order = require("../../../models/Order");

module.exports = async (req, res) => {
  try {
    const { isPaid, isDelivered } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Order not found." });

    if (typeof isPaid === "boolean") {
      order.isPaid = isPaid;
      if (isPaid) order.paidAt = Date.now();
    }
    if (typeof isDelivered === "boolean") {
      order.isDelivered = isDelivered;
      if (isDelivered) order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    console.log("Order status updated:", updatedOrder._id);
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
