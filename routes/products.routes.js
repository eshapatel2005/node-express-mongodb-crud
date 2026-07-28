const express = require("express");

const router = express.Router();

const createProduct = require("../controller/product/createProduct");
const getProduct=require("../controller/product/getProduct");
const updateProduct = require("../controller/product/updateProduct");
const deleteProduct=require("../controller/product/deleteProduct");
const getAllCreatedBy = require("../controller/product/getAllCreatedBy");
const { auth } = require("../middleware/auth");


// Create Product
router.post("/createProduct",auth, createProduct);
router.get("/getProduct/:id", getProduct);
router.get("/getAllCreatedBy", auth, getAllCreatedBy);
router.put("/updateProduct/:id",updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);

module.exports = router;