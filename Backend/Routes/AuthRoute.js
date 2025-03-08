const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../Controllers/authController");

// User Authentication Routes
router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
