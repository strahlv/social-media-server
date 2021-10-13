if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();

mongoose.connect(process.env.DB_URI);

app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:3000",
  })
);
app.use(helmet());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      touchAfter: 1000 * 60 * 60,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./strategies/local")(passport);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts/:postId/comments", commentsRouter);

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
