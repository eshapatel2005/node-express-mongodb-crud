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
    const { error } = validateGetUser(req.params);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // If Id is given than fetch that particular user
    if (req.params.id) {
      const user = await User.findById(req.params.id);

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
    }

    // if id is not mentioned then fetch all the users
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = getUser;
