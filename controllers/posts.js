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
  res.status(200).json(post);
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(post);
};

module.exports.destroyPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  res.status(200).json(post);
};

module.exports.likePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  const userId = req.user._id;
  if (!post.likes.includes(userId)) {
    post.likes.push(req.user);

    if (post.dislikes.includes(userId)) {
      const index = post.dislikes.indexOf(userId);
      post.dislikes.splice(index, 1);
    }
  } else {
    const index = post.likes.indexOf(userId);
    post.likes.splice(index, 1);
  }

  post.save();

  res.status(200).json(post);
};

module.exports.dislikePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  const userId = req.user._id;
  if (!post.dislikes.includes(userId)) {
    post.dislikes.push(req.user);

    if (post.likes.includes(userId)) {
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);
    }
  } else {
    const index = post.dislikes.indexOf(userId);
    post.dislikes.splice(index, 1);
  }

  post.save();

  res.status(200).json(post);
};
