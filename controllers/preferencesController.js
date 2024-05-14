// @ts-nocheck
const preferences = require("express").Router();
require("dotenv").config();

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

module.exports = preferences;
