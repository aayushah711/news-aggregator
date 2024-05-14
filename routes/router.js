const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const preferencesController = require("../controllers/preferencesController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.use("/register", registerController);

router.use("/login", loginController);

router.use("/preferences", verifyToken, preferencesController);

module.exports = router;
