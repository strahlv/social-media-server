const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const HttpError = require("../utils/HttpError");
const { DateTime, Interval } = require("luxon");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    email: {
      type: String,
      unique: true,
    },
    firstName: String,
    lastName: String,
    birthday: Date,
    posts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Post" }],
    // friends: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    // friendRequests: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }]
    // isPublic: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  // {timestamps: { currentTime: () => DateTime.now().toISO() }}
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (password) {
  try {
    const isMatchingPassword = await bcrypt.compare(password, this.password);
    if (!isMatchingPassword) {
      throw new HttpError(404, "User credentials doesn't match.");
    }
    return isMatchingPassword;
  } catch (error) {
    console.error(error);
  }
};

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("age").get(function () {
  const birthday = DateTime.fromJSDate(this.birthday);
  const now = DateTime.now();
  const age = Interval.fromDateTimes(birthday, now);
  return Math.floor(age.length("years"));
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    console.log(this);
    this.password = await bcrypt.hash(this.password, 12);
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
