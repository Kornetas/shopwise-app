const express = require("express");
const router = express.Router();
const getAllProducts = require("../controllers/products/getAllProducts");
const createProduct = require("../controllers/products/createProduct");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// GET /api/products – get all products
router.get("/", getAllProducts);

// POST /api/products – add new product (admin only)
router.post("/", auth, isAdmin, createProduct);

module.exports = router;
