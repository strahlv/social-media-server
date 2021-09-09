const express = require("express");
const {
  index,
  createPost,
  showPost,
  updatePost,
  destroyPost,
  likePost,
  dislikePost,
} = require("../controllers/posts");
const { isAuthenticated, isAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, catchAsync(index))
  .post(isAuthenticated, catchAsync(createPost));

router
  .route("/:id")
  .get(isAuthenticated, catchAsync(showPost))
  .put(isAuthenticated, catchAsync(isAuthor), catchAsync(updatePost))
  .delete(isAuthenticated, catchAsync(isAuthor), catchAsync(destroyPost));

router.patch("/:id/like", isAuthenticated, catchAsync(likePost));

router.patch("/:id/dislike", isAuthenticated, catchAsync(dislikePost));

module.exports = router;
