const express = require("express");

const router = express.Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/user");
const { auth } = require("../middleware/auth");

router.post("/createUser",createUser);
router.get("/getUser",auth,getUser);
router.put("/updateUser/:id",updateUser);
router.delete("/deleteUser",auth,deleteUser);
//router.get("/getUser/:id", getUser);
router.post("/loginUser", loginUser);
//router.get("/currentUser", auth, currentUser.currentUser);

module.exports=router;