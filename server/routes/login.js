const express = require("express");
const router = express.Router();
const loginControllers = require("../Controllers/login.js");

//=======================================================

router.route("/").post(loginControllers.login);

//=======================================================
module.exports = router;
