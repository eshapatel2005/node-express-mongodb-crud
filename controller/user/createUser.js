const User = require("../../models/user.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../../utils/mail.helper");

// Validation Function
const validateCreateUser = (data) => {

    const schema = Joi.object({

        name: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.empty": "Please enter a valid name.",
                "string.min": "Please enter a valid name.",
                "any.required": "Please enter a valid name."
            }),

        email: Joi.string().email().required(),

        age: Joi.number().required(),

        city: Joi.string().required(),

        password: Joi.string()
            .min(8)
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters.",
                "any.required": "Password is required."
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
                message: error.details[0].message
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
              }
            await sendEmail(mailObj);

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = createUser;