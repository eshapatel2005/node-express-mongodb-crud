const User = require("../../models/user.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.USER_AUTH_TOKEN);

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

module.exports = loginUser;
