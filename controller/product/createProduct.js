const Product = require("../../models/product.model");
const Joi = require("joi");

// Validation
const validateCreateProduct = (data) => {

    const schema = Joi.object({

        name: Joi.string().required(),

        price: Joi.number().required(),

        description: Joi.string().required()

    });

    return schema.validate(data, {
        convert: false,
    });

};

const createProduct = async (req, res) => {

    try {

        const { error } = validateCreateProduct(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const body = req.body;

        body["createdBy"] = req.user._id;

        const product = await Product.create(body);

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            data: product
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = createProduct;