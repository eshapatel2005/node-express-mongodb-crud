const express = require("express");

const router = express.Router();

const createProduct = require("../controller/product/createProduct");

// Create Product
router.post("/createProduct", createProduct);

module.exports = router;