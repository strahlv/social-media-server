const express = require("express");
const passport = require("passport");
const {
  index,
  login,
  logout,
  createUser,
  showUser,
  updateUser,
  destroyUser,
} = require("../controllers/users");
const { isAuthenticated } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router
  .route("/login")
  .get(index)
  .post(
    passport.authenticate("local", { failureMessage: true }),
    catchAsync(login)
  );

router.get("/logout", catchAsync(logout));

router.post("/register", catchAsync(createUser));

router
  .route("/users/:id")
  .get(isAuthenticated, catchAsync(showUser))
  .put(isAuthenticated, catchAsync(updateUser))
  .delete(isAuthenticated, catchAsync(destroyUser));

module.exports = router;
