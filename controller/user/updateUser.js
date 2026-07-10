const User = require("../../models/user.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Validation Function
const validateUpdateUser = (data) => {

    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        age: Joi.number(),
        city: Joi.string(),
        password: Joi.string().min(8)
    });

    return schema.validate(data);
};

const updateUser = async (req, res) => {

    try {

        const { error } = validateUpdateUser(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        // Agar password aaya hai to usko hash karo
        if (req.body.password) {

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

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
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = updateUser;