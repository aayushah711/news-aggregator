const User = require("../models/user");
const auth = require("express").Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const registerValidator = require("../validators/registerValidator");

auth.post("/", async (req, res) => {
  try {
    const { error } = registerValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists!",
      });
    }

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 1),
      preferences: req.body.preferences,
    });
    user
      .save()
      .then((data) => {
        return res
          .status(200)
          .json({ message: "User registered successfully!", data });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = auth;
