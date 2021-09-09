const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    tags: [String],
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

postSchema.virtual("likeCount").get(function () {
  return likes.length;
});

postSchema.virtual("dislikeCount").get(function () {
  return dislikes.length;
});

module.exports = mongoose.model("Post", postSchema);
