const User = require("../models/user");
const auth = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const loginValidator = require("../validators/loginValidator");

auth.post("/", async (req, res) => {
  try {
    const { error } = loginValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        if (process.env.API_SECRET) {
          const token = jwt.sign(
            {
              id: user.id,
            },
            process.env.API_SECRET,
            {
              expiresIn: 86400,
            }
          );
          return res.status(200).send({
            user: {
              id: user.id,
            },
            message: "Login successful",
            accessToken: token,
          });
        } else {
          return res
            .status(500)
            .json({
              error: "Something went wrong! Please try again after sometime",
            });
        }
      } else {
        return res.status(401).json({ error: "Invalid password!" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({
        error: err,
      });

  }
});

module.exports = auth;
