const HttpError = require("./HttpError");

module.exports = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      const code = error.status || 500;
      console.log(error);
      res.status(code).json({ message: error.message });
    }
  };
};
