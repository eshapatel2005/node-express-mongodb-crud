const Product = require("../../models/product.model");
const Joi = require("joi");

// Validation Function
const validateGetProduct = (data) => {

    const schema = Joi.object({

        id: Joi.string().optional(),

    });

    return schema.validate(data);

};

const getProduct = async (req, res) => {

    try {

        const { error } = validateGetProduct(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = getProduct;