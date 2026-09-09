const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllCreatedBy,
} = require("../controller/product");
const { auth } = require("../middleware/auth");


// Create Product
router.post("/createProduct",auth, createProduct);
router.get("/getProduct/:id", getProduct);
router.get("/getAllCreatedBy", auth, getAllCreatedBy);
router.put("/updateProduct/:id",auth,updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);

module.exports = router;