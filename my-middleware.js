module.exports = function (options) {
  return function (req, res, next) {
    const key = req.header("x-api-key") || "";
    if (key != options.apiKey) {
      return res.status(401).send("Invalid Api Key");
    }

    next();
  };
};
