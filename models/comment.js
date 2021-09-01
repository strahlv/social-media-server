const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    createdAt: { type: Date, default: Date.now },
    author: mongoose.SchemaTypes.ObjectId,
    likes: [mongoose.SchemaTypes.ObjectId],
    dislikes: [mongoose.SchemaTypes.ObjectId],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
