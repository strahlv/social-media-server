const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const HttpError = require("../utils/HttpError");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    birthday: Date,
    // friends: [mongoose.SchemaTypes.ObjectId],
    // publicProfile: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (password) {
  const isMatchingPassword = await bcrypt.compare(password, this.password);

  if (!isMatchingPassword) {
    throw new HttpError(404, "User credentials don't match.");
  }

  return isMatchingPassword;
};

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// userSchema.virtual("age").get(function () {
//   return this.birthday;
// });

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
