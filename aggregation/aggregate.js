require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    // STEP 1 - Aggregate()
    // const result = await User.aggregate([
    //   {
    //     $match: {
    //       age: { $gt: 18 },
    //     },
    //   },
    // ]);

    // STEP 2 - addFields()
    // const result = await User.aggregate([
    //   {
    //     $addFields: {
    //       ageAfter5Years: { $add: ["$age", 5] },
    //     },
    //   },
    // ]);

    // STEP 3 - allowDiskUse()
    // const result = await User.aggregate([
    //   {
    //     $match: {
    //       age: { $gt: 18 },
    //     },
    //   },
    // ]).allowDiskUse(true);

    // STEP 4 - append()
    // const result = await User.aggregate().append(
    //   { $match: { age: { $gt: 18 } } },
    //   { $project: { name: 1, age: 1, city: 1, _id: 0 } },
    // );

    // STEP 5 - collation()
    const result = await User.aggregate([
      {
        $sort: {
          name: 1,
        },
      },
    ]).collation({
      locale: "en",
      strength: 1,
    });
    console.log(result);

    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });
