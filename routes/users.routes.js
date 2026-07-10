const express = require("express");

const router = express.Router();

const createUser = require("../controller/user/createUser");
const getUser = require("../controller/user/getUser");
const updateUser = require("../controller/user/updateUser");
const deleteUser = require("../controller/user/deleteUser");

router.post("/createUser",createUser);
router.get("/getUser",getUser);
router.put("/updateUser/:id",updateUser);
router.delete("/deleteUser/:id",deleteUser);
router.get("/getUser/:id", getUser);

module.exports=router;