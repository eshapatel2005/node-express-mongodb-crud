const User = require("../../models/user.model");

const deleteUser = async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(req.user.id);

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