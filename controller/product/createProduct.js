const Product = require("../../models/product.model");
const Joi = require("joi");
const { sendEmail } = require("../../utils/mail.helper");

// Validation
const validateCreateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
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
        message: error.details[0].message,
      });
    }

    const body = req.body;
    body.createdBy = req.user._id;

    // Create Product
    const product = await Product.create(body);

    // Send Email
    const message = `
            <h2>Product Created Successfully 🎉</h2>
            <p>Your product <b>${product.name}</b> has been created successfully.</p>
            <p>Price: ₹${product.price}</p>
            <p>Description: ${product.description}</p>
        `;

    const mailObj = {
        from: `CRUD API ${process.env.FROM_MAIL}`,
        to: req.user.email,
        subject: "Product Created Successfully",
        html: message,

        attachments: [
            {
            filename: "logo.png",
            path: "./assets/logo.png",
            },
        ],
        };

    await sendEmail(mailObj);

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = createProduct;
