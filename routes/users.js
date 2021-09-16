const express = require("express");
const passport = require("passport");
const {
  index,
  createUser,
  login,
  logout,
  showCurrentUser,
  showUser,
  updateUser,
  destroyUser,
  showUserPosts,
} = require("../controllers/users");
const { isAuthenticated } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.route("/").get(catchAsync(index)).post(catchAsync(createUser));

router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  catchAsync(login)
);

router.post("/logout", catchAsync(logout));

router.get("/me", catchAsync(showCurrentUser));

router
  .route("/:id")
  .get(isAuthenticated, catchAsync(showUser))
  .put(isAuthenticated, catchAsync(updateUser))
  .delete(isAuthenticated, catchAsync(destroyUser));

router.get("/:id/posts", isAuthenticated, catchAsync(showUserPosts));

module.exports = router;
