const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    `API HIT LOG : ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : Time --> ${moment().format()}`
  );
  console.log();
  next();
};

module.exports = logger;
