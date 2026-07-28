const Product = require("../../models/product.model");

const getAllCreatedBy = async (req, res) => {

    try {

        const products = await Product.find({
            createdBy: req.user._id
        });

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = getAllCreatedBy;