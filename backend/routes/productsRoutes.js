const express = require("express");
const router = express.Router();
const getAllProducts = require("../controllers/products/getAllProducts");
const createProduct = require("../controllers/products/createProduct");
const getProductById = require("../controllers/products/getProductById");
const updateProductById = require("../controllers/products/updateProductById");
const deleteProductById = require("../controllers/products/deleteProductById");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// GET /api/products – get all products
router.get("/", getAllProducts);

// GET /api/products/:id – get product by ID
router.get("/:id", getProductById);

// POST /api/products – add new product (admin only)
router.post("/", auth, isAdmin, createProduct);

// PUT /api/products/:id – update product (admin only)
router.put("/:id", auth, isAdmin, updateProductById);

// DELETE /api/products/:id – delete product (admin only)
router.delete("/:id", auth, isAdmin, deleteProductById);

module.exports = router;
