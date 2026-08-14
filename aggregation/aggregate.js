require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    const result = await User.aggregate([
      {
        $match: {
          age: { $gt: 18 }
        }
      }
    ]);

    console.log(result);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });