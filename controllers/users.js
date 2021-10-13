const User = require("../models/user");
const HttpError = require("../utils/HttpError");
const bcrypt = require("bcrypt");
const Post = require("../models/post");

module.exports.index = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

module.exports.login = (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: "Successfully logged out." });
};

module.exports.showCurrentUser = (req, res) => {
  res.status(200).json(req.user);
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

  await req.login(newUser, function (err) {
    if (err) {
      return next(err);
    }
  });

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

  if (req.body.password) {
    // Comparar senhas para evitar hash desnecessário
    const isMatchingPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isMatchingPassword) {
      req.body.password = user.password;
    }
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

  // Destruir todos os posts do usuario? Ou deixar como autor desconhecido?

  res.status(200).json(deletedUser);
};

module.exports.showUserPosts = async (req, res) => {
  const { id } = req.params;

  const posts = await Post.find({ author: id })
    .populate("author", "firstName lastName fullName birthday")
    .populate("comments")
    .populate({
      path: "comments",
      populate: { path: "author", select: "firstName lastName fullName" },
    });

  res.status(200).json(posts);
};
