const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    token: {
      type: String,
      default: ""
    },

  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
