const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.isAuthenticated = (req, res, next) => {
  console.log("user " + req.user);
  console.log("session " + req.session);

  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  next();
};

module.exports.isPostAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { author } = await Post.findById(id);

  console.log(req.user._id);
  console.log(author);

  if (req.user._id.equals(author)) {
    return next();
  }

  res.status(403).json({ message: "You are not allowed to do this." });
};

module.exports.isCommentAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { author } = await Comment.findById(id);

  console.log(req.user._id);
  console.log(author);

  if (req.user._id.equals(author)) {
    return next();
  }

  res.status(403).json({ message: "You are not allowed to do this." });
};
