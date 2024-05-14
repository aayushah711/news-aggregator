// @ts-nocheck
const preferences = require("express").Router();
require("dotenv").config();
const preferencesValidator = require("../validators/preferencesValidator");
const User = require("../models/User");

preferences.get("/", async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        data: req.user.preferences,
      });
    } else {
      return res.status(403).json({
        error: req.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong! Please try again after sometime",
    });
  }
});

preferences.put("/", async (req, res) => {
  try {
    if (req.user) {
      const { error } = preferencesValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: { preferences: req.body.preferences },
        },
        { new: true }
      );
      return res.status(200).json({
        data: updatedUser,
        message: "Preferences updated successfully",
      });
    } else {
      return res.status(403).json({
        error: req.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong! Please try again after sometime",
    });
  }
});

module.exports = preferences;
