const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.auth = async (req, res, next) => {

    try {

        const token = req.header("Authorization");

        const decode=jwt.verify(token, process.env.USER_AUTH_TOKEN);
        const findUser = await User.findById(decode.id)
        req.user = findUser
        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }

};