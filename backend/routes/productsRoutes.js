const express = require("express");
const router = express.Router();
const getAllProducts = require("../controllers/products/getAllProducts");

// GET /api/products – get all products
router.get("/", getAllProducts);

module.exports = router;
