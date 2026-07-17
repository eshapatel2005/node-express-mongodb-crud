const User = require("../../models/user.model");
const Joi = require("joi");

// Validation Function
const validateGetUser = (data) => {
  const schema = Joi.object({
    id: Joi.string().optional(),
  });

  return schema.validate(data);
};

const getUser = async (req, res) => {
  try {

    // If Id is given than fetch that particular user
      const user = await User.findById(req.user.id).select("-password -token");

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

module.exports = getUser;
