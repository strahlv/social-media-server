const Comment = require("../models/comment");
const Post = require("../models/post");
const HttpError = require("../utils/HttpError");

module.exports.index = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).populate("comments");
  res.status(200).json(post.comments);
};

module.exports.createComment = async (req, res) => {
  const newComment = new Comment(req.body);
  newComment.author = req.user;
  newComment.save();

  const { postId } = req.params;
  const post = await Post.findById(postId)
    .populate("author")
    .populate("comments")
    .populate({ path: "comments", populate: { path: "author" } });
  post.comments.push(newComment);
  post.save();

  res.status(201).json(post);
};

module.exports.showComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);

  if (!comment) {
    throw new HttpError(404, "Comment not found.");
  }

  res.status(200).json(comment);
};

module.exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndUpdate(id, req.body, { new: true });

  if (!comment) {
    throw new HttpError(404, "Comment not found.");
  }

  res.status(200).json(comment);
};

module.exports.destroyComment = async (req, res) => {
  const { id, postId } = req.params;

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: { comments: id },
    },
    { new: true }
  )
    .populate("author")
    .populate("comments")
    .populate({ path: "comments", populate: { path: "author" } });

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    throw new HttpError(404, "Comment not found.");
  }

  res.status(200).json(post);
};
