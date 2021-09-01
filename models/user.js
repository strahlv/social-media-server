const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    birthday: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
