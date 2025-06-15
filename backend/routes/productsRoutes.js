const express = require("express");
const router = express.Router();

// admin
const createProduct = require("../controllers/products/admin/createProduct");
const updateProductById = require("../controllers/products/admin/updateProductById");
const deleteProductById = require("../controllers/products/admin/deleteProductById");

// user
const getAllProducts = require("../controllers/products/user/getAllProducts");
const getProductById = require("../controllers/products/user/getProductById");
const addReview = require("../controllers/products/user/addReview");

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

// POST /api/products/:id/reviews – add review (auth required)
router.post("/:id/reviews", auth, addReview);

module.exports = router;
