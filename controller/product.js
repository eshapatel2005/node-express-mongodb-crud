const Product = require("../models/product.model");
const Joi = require("joi");
const { sendEmail } = require("../utils/mail.helper");

// ==================== CREATE PRODUCT ====================

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
    console.error("Error in createProduct controller:", err.message);
    console.error("Error in createProduct controller:", err.stack);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== DELETE PRODUCT ====================

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== GET ALL PRODUCTS CREATED BY USER ====================

const getAllCreatedBy = async (req, res) => {
  try {
    const products = await Product.find({
      createdBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== GET PRODUCT ====================

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
        message: error.details[0].message,
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== UPDATE PRODUCT ====================

// Validation Function
const validateUpdateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string(),
    image: Joi.string(),
    other_image: Joi.array().items(Joi.string()),
  });

  return schema.validate(data);
};

const updateProduct = async (req, res) => {
  try {
    const { error } = validateUpdateProduct(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
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
        message: "Product Not Found",
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
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== UPLOAD ====================

const upload = async (req, res) => {
  let obj = {
    error: null,
    data: null,
  };

  try {
    const key = Object.keys(req.files)[0];

    obj.data = req.files[key].map((v) => {
      return {
        path: v.path.replace(/\\/g, "/"),
        filename: v.filename,
        mimetype: v.mimetype,
      };
    });

    obj.message = "Upload Successfully";

    return res.status(200).json(obj);
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: error.message || "Something went wrong",
    });
  }
};

// ==================== EXPORT ====================

module.exports = {
  createProduct,
  deleteProduct,
  getAllCreatedBy,
  getProduct,
  updateProduct,
  upload,
};