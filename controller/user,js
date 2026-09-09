const User = require("../models/user.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/mail.helper");

// ==================== CREATE USER ====================

// Validation Function
const validateCreateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Please enter a valid name.",
      "string.min": "Please enter a valid name.",
      "any.required": "Please enter a valid name.",
    }),

    email: Joi.string().email().required(),

    age: Joi.number().required(),

    city: Joi.string().required(),

    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters.",
      "any.required": "Password is required.",
    }),
  });

  return schema.validate(data, {
    convert: false,
  });
};

const createUser = async (req, res) => {
  try {
    const { error } = validateCreateUser(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Replace original password with hashed password
    req.body.password = hashedPassword;

    // Create User
    const user = await User.create(req.body);

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.USER_AUTH_TOKEN
    );

    // Save Token in Database
    user.token = token;
    await user.save();

    const message = `Your registration successfully`;

    const mailObj = {
      from: `CRUD API ${process.env.FROM_MAIL}`,
      to: req.body.email,
      subject: "User Created Successfully",
      html: message,
    };

    await sendEmail(mailObj);

    res.status(201).json({
      success: true,
      message: "User Created Successfully!!!",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== DELETE USER ====================

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== GET USER ====================

// Validation Function
const validateGetUser = (data) => {
  const schema = Joi.object({
    id: Joi.string().optional(),
  });

  return schema.validate(data);
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -token");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== LOGIN USER ====================

// Validation Function
const validateLoginUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),
  });

  return schema.validate(data, {
    convert: false,
  });
};

const loginUser = async (req, res) => {
  try {
    // Validation
    const { error } = validateLoginUser(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check Email
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.USER_AUTH_TOKEN
    );

    // Save Token in Database
    user.token = token;
    await user.save();

    // Login Success
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== UPDATE USER ====================

// Validation Function
const validateUpdateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    age: Joi.number(),
    city: Joi.string(),
    password: Joi.string().min(8),
  });

  return schema.validate(data);
};

const updateUser = async (req, res) => {
  try {
    const { error } = validateUpdateUser(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // If password is provided, hash it
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        10
      );

      req.body.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================== EXPORT ====================

module.exports = {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser,
};