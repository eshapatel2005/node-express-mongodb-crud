const Product = require("../../models/product.model");
const Joi = require("joi");
const { sendEmail } = require("../../utils/mail.helper");

// Validation Function
const validateUpdateProduct = (data) => {

    const schema = Joi.object({

        name: Joi.string(),

        price: Joi.number(),

        description: Joi.string(),
        image: Joi.string(),
        other_image: Joi.array().items(Joi.string())

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

        // Send Email
        const message = `
            <h2>Product Updated Successfully</h2>
            <p>Your product <b>${product.name}</b> has been updated successfully.</p>
            <p>Price: ₹${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Image: ${product.image}</p>
            <p>Other_Image: ${product.other_image}</p>
        `;

        const mailObj = {
            from: `CRUD API ${process.env.FROM_MAIL}`,
            to: req.user.email,
            subject: "Product Updated Successfully",
            html: message,
        };

        await sendEmail(mailObj);

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