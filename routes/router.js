const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const preferencesController = require("../controllers/preferencesController");
const { verifyToken } = require("../middleware/auth");
const newsController = require("../controllers/newsController");

const router = express.Router();

router.use("/register", registerController);

router.use("/login", loginController);

router.use("/preferences", verifyToken, preferencesController);

router.use("/news", verifyToken, newsController);

module.exports = router;
