const mongoose = require("mongoose");
const reactions = require("./plugins/reactions");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

commentSchema.plugin(reactions);

module.exports = mongoose.model("Comment", commentSchema);
