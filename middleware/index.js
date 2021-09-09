const Post = require("../models/post");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }

  res.status(401).json({ message: "Please login with your username." });
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { author } = await Post.findById(id);

  console.log(req.user._id);
  console.log(author);

  if (req.user._id.equals(author)) {
    return next();
  }

  res.status(403).json({ message: "You are not allowed to do this." });
};
