const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {

    try {

        const token = req.header("Authorization");

        jwt.verify(token, process.env.USER_AUTH_TOKEN);

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }

};