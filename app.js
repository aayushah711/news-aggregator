const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routes/router");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

try {
  mongoose.connect("mongodb://localhost:27017/news-aggregator-db");
  console.log("DB connected successfully!");
} catch (err) {
  console.log("Failed while connecting to mongodb");
}

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
