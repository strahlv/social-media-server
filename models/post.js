const mongoose = require("mongoose");
const documentAge = require("./plugins/documentAge");
const reactions = require("./plugins/reactions");

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
  { timestamps: true, toJSON: { virtuals: true } }
);

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.plugin(reactions);
postSchema.plugin(documentAge);

module.exports = mongoose.model("Post", postSchema);
