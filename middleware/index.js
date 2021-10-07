const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("User not authenticated.");
    return;
  }

  next();
};

module.exports.isPostAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { author } = await Post.findById(id);

  if (req.user._id.equals(author)) {
    return next();
  }

  res.status(403).json({ message: "You are not allowed to do this." });
};

module.exports.isCommentAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { author } = await Comment.findById(id);

  if (req.user._id.equals(author)) {
    return next();
  }

  res.status(403).json({ message: "You are not allowed to do this." });
};
