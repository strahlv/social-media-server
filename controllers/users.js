const User = require("../models/user");
const HttpError = require("../utils/HttpError");
const bcrypt = require("bcrypt");

module.exports.index = (req, res) => {};

module.exports.login = async (req, res) => {
  // const { username, password } = req.body;

  // const existingUser = await User.findOne({ username });

  // if (!existingUser) {
  //   throw new HttpError(404, "User credentials don't match.");
  // }

  // await existingUser.validatePassword(password);

  console.log(req.user);
  res.status(200).json({ message: "Logged in successfully." });
};

module.exports.logout = (req, res) => {
  req.logout();
  console.log(req.user);
  res.redirect("/");
};

module.exports.createUser = async (req, res) => {
  const { username, email } = req.body;

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new HttpError(409, "This username is already taken.");
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new HttpError(409, "This email is already taken.");
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

  // Utilizando o método find/save (em vez de findAndUpdate) pra poder utilizar o middleware de pre-save
  let user = await User.findById(id);

  if (!user) {
    throw new HttpError(404, "User not found.");
  }

  // Comparar senhas para evitar hash desnecessário
  const isMatchingPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isMatchingPassword) {
    req.body.password = user.password;
  }

  user.set(req.body);
  await user.save();

  res.status(200).json(user);
};

module.exports.destroyUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new HttpError(404, "User not found.");
  }

  res.status(200).json(deletedUser);
};
