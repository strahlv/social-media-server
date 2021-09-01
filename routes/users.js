const express = require("express");
const {
  index,
  login,
  createUser,
  showUser,
  updateUser,
  destroyUser,
} = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.route("/login").get(index).post(catchAsync(login));
router.route("/register").post(catchAsync(createUser));
router
  .route("/users/:id")
  .get(catchAsync(showUser))
  .put(catchAsync(updateUser))
  .delete(catchAsync(destroyUser));

module.exports = router;
