const Product = require("../../models/product.model");
const Joi = require("joi");

// Validation Function
const validateUpdateProduct = (data) => {

    const schema = Joi.object({

        name: Joi.string(),

        price: Joi.number(),

        description: Joi.string()

    });

    return schema.validate(data);

};

const updateProduct = async (req, res) => {

    try {

        const { error } = validateUpdateProduct(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: product
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = updateProduct;