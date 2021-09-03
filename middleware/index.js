module.exports.isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Please login with your username." });
  }
  next();
};

module.exports.isAuthor = (req, res, next) => {
  if (!req.user._id === req.author) {
    res.status(403).json({ message: "You are not allowed to do this." });
  }
  next();
};
