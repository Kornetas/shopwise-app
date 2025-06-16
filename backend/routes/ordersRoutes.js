const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// USER controllers
const createOrder = require("../controllers/orders/user/createOrder");
const getMyOrders = require("../controllers/orders/user/getMyOrders");
const getOrderById = require("../controllers/orders/user/getOrderById");

// ADMIN controllers
const getAllOrders = require("../controllers/orders/admin/getAllOrders");
const updateOrderStatus = require("../controllers/orders/admin/updateOrderStatus");

// USER routes
router.post("/", auth, createOrder);
router.get("/my", auth, getMyOrders);
router.get("/:id", auth, getOrderById);

// ADMIN routes
router.get("/", auth, isAdmin, getAllOrders);
router.put("/:id/status", auth, isAdmin, updateOrderStatus);

module.exports = router;
