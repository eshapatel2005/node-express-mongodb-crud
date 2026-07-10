const User = require("../../models/user.model");
const Joi = require("joi");

// Validation Function
const validateDeleteUser = (data) => {

    const schema = Joi.object({
        id: Joi.string().required()
    });

    return schema.validate(data,{
        convert:false,
    });
};

const deleteUser = async (req, res) => {

    try {

        const { error } = validateDeleteUser(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = deleteUser;