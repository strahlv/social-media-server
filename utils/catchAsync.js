module.exports = (func) => {
  return async (req, res) => {
    try {
      await func(req, res);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  };
};

// module.exports = (func) => {
//   return (req, res, next) => {
//     func(req, res, next).catch(next);
//   };
// };
