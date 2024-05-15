// @ts-nocheck
const news = require("express").Router();
require("dotenv").config();
const { newsAPIEndpoint } = require("../constants");
const axios = require("axios");

news.get("/", async (req, res) => {
  try {
    if (req.user) {
      const params = {
        access_key: process.env.MEDIASTACK_ACCESS_KEY,
        categories: req.user.preferences.join(","),
      };

      const queryString = new URLSearchParams(params).toString();

      axios
        .get(`${newsAPIEndpoint}?${queryString}`)
        .then((newsResp) => {
          return res.status(200).json({
            data: newsResp.data.data,
          });
        })
        .catch(() => {
          return res.status(500).json({
            error: "Something went wrong! Please try again after sometime",
          });
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

module.exports = news;
