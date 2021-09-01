if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();

mongoose.connect(process.env.DB_URI);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/posts/comments", commentsRouter);

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
