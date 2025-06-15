const express = require("express");
const router = express.Router();
const getAllProducts = require("../controllers/products/getAllProducts");
const createProduct = require("../controllers/products/createProduct");
const getProductById = require("../controllers/products/getProductById");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// GET /api/products – get all products
router.get("/", getAllProducts);

// GET /api/products/:id – get product by ID
router.get("/:id", getProductById);

// POST /api/products – add new product (admin only)
router.post("/", auth, isAdmin, createProduct);

module.exports = router;
