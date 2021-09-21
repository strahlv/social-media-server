const { DateTime, Interval } = require("luxon");
const mongoose = require("mongoose");
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

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

postSchema.virtual("dislikeCount").get(function () {
  return this.dislikes.length;
});

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.virtual("age").get(function () {
  return calcIntervalFromJSDate(this.createdAt);
});

postSchema.virtual("updatedAge").get(function () {
  return calcIntervalFromJSDate(this.updatedAt);
});

postSchema.plugin(reactions);

module.exports = mongoose.model("Post", postSchema);

const calcIntervalFromJSDate = (from) => {
  const start = DateTime.fromJSDate(from);
  const end = DateTime.now();
  const interval = Interval.fromDateTimes(start, end);

  let age = interval.length("minutes");
  if (age < 60) {
    return `${Math.floor(age)} minute(s) ago`;
  }

  age = interval.length("hours");
  if (age < 24) {
    return `${Math.floor(age)} hour(s) ago`;
  }

  age = interval.length("days");
  if (age < 7) {
    return `${Math.floor(age)} day(s) ago`;
  }

  age = interval.length("weeks");
  if (age < 4) {
    return `${Math.floor(age)} week(s) ago`;
  }

  age = interval.length("months");
  if (age < 12) {
    return `${Math.floor(age)} month(s) ago`;
  }

  age = interval.length("years");
  return `${Math.floor(age)} year(s) ago`;
};
