const express = require("express");

const router = express.Router();

const createUser = require("../controller/user/createUser");
const getUser = require("../controller/user/getUser");
const updateUser = require("../controller/user/updateUser");
const deleteUser = require("../controller/user/deleteUser");
const loginUser = require("../controller/user/loginUser");
const { auth } = require("../middleware/auth");

router.post("/createUser",createUser);
router.get("/getUser",auth,getUser);
router.put("/updateUser/:id",updateUser);
router.delete("/deleteUser/:id",deleteUser);
router.get("/getUser/:id", getUser);
router.post("/loginUser", loginUser);
//router.get("/currentUser", auth, currentUser.currentUser);

module.exports=router;