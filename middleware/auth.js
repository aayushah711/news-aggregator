const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  if (req.headers?.authorization && process.env.API_SECRET) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET,
      function (err, decoded) {
        if (err) {
          req.message = "Header verification failed";
          next();
        }
        User.findOne({
          _id: decoded.id,
        })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            req.message = "Cannot find user with given token";
            next();
          });
      }
    );
  } else {
    req.message = "Authorization failed";
    next();
  }
};

module.exports = { verifyToken };
