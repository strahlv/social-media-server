const mongoose = require("mongoose");
const documentAge = require("./plugins/documentAge");
const reactions = require("./plugins/reactions");

const commentSchema = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

commentSchema.plugin(reactions);
commentSchema.plugin(documentAge);

module.exports = mongoose.model("Comment", commentSchema);
