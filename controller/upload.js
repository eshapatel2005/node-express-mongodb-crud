const uploadController = {
    upload: async (req, res) => {
        let obj = {
            error: null,
            data: null,
        };
        try {
            const key = Object.keys(req.files)[0]
            obj["data"] = req.files[key].map((v) => {
                return {
                    path: v.path.replace(/\\/g, "/"),
                    filename    : v.filename,
                    mimetype: v.mimetype
                }
            })
            obj["message"] = "Upload Successfully"

            return res.status(200).json(obj)

        } catch (error) {
            res.status(500).json({
                status: false,
                code: 500,
                message: error.message || "Something went wrong",
            })
        }
    }
}
 
module.exports = uploadController;