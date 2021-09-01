const User = require("../models/user");
const HttpError = require("../utils/HttpError");

module.exports.index = (req, res) => {};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  // change password check
  const existingUser = await User.findOne({ username, password });

  if (!existingUser) {
    throw new HttpError(404, "User credentials don't match.");
  }

  res.status(200).send("Logged in successfully.");
};

module.exports.createUser = async (req, res) => {
  const { username } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new HttpError(409, "This user is already registered.");
  }

  const newUser = await User.create(req.body);

  res.status(201).json(newUser);
};

module.exports.showUser = async (req, res) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new HttpError(404, "User not found.");
  }

  res.status(200).json(existingUser);
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const modifiedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!modifiedUser) {
    throw new HttpError(404, "User not found.");
  }

  res.status(200).json(modifiedUser);
};

module.exports.destroyUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new HttpError(404, "User not found.");
  }

  res.status(200).json(deletedUser);
};
