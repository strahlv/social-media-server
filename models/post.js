const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    author: mongoose.SchemaTypes.ObjectId,
    likes: [mongoose.SchemaTypes.ObjectId],
    dislikes: [mongoose.SchemaTypes.ObjectId],
    comments: [mongoose.SchemaTypes.ObjectId],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
