const auth = require("express").Router();

module.exports = {
  register: auth.post("/", (req, res) => {
    return res.status(200).send("Hello");
  }),
};
