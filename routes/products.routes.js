const express = require("express");

const router = express.Router();

const createProduct = require("../controller/product/createProduct");
const getProduct=require("../controller/product/getProduct");
const updateProduct = require("../controller/product/updateProduct");

// Create Product
router.post("/createProduct", createProduct);
router.get("/getProduct/:id", getProduct);
router.put("/updateProduct/:id",updateProduct)

module.exports = router;