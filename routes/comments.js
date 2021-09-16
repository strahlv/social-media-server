const express = require("express");
const {
  index,
  createComment,
  showComment,
  updateComment,
  destroyComment,
} = require("../controllers/comments");
const { isAuthenticated } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(isAuthenticated, catchAsync(index))
  .post(isAuthenticated, catchAsync(createComment));

router
  .route("/:id")
  .get(isAuthenticated, catchAsync(showComment))
  .put(isAuthenticated, catchAsync(updateComment))
  .delete(isAuthenticated, catchAsync(destroyComment));

module.exports = router;
