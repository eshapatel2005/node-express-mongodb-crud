require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    // STEP 1 - Aggregate()
    // const result = await User.aggregate([
    //   {
    //     $match: {
    //       age: { $gt: 18 },
    //     },
    //   },
    // ]);

    // STEP 2 - addFields()
    const result = await User.aggregate([
      {
        $addFields: {
          ageAfter5Years: { $add: ["$age", 5] },
        },
      },
    ]);
    console.log(result);

    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });
