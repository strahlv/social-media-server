const Post = require("../models/post");
const User = require("../models/user");

module.exports.index = async (req, res) => {
  const posts = await Post.find({ author: req.user._id });
  res.status(200).json(posts);
};

module.exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  newPost.author = req.user;
  newPost.save();

  const author = await User.findById(req.user._id);
  author.posts.push(newPost);
  author.save();

  res.status(201).json(newPost);
};

module.exports.showPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    throw new HttpError(404, "Post not found.");
  }

  res.status(200).json(post);
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

  if (!post) {
    throw new HttpError(404, "Post not found.");
  }

  res.status(200).json(post);
};

module.exports.destroyPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    throw new HttpError(404, "Post not found.");
  }

  await User.findByIdAndUpdate(req.user._id, { $pull: post });

  res.status(200).json(post);
};

module.exports.likePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    throw new HttpError(404, "Post not found.");
  }

  post.like(req.user);
  res.status(200).json(post);
};

module.exports.dislikePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    throw new HttpError(404, "Post not found.");
  }

  post.dislike(req.user);
  res.status(200).json(post);
};
