const express = require("express");
const router = express.Router();
const { createCurve, getCurve } = require("../Controllers/curve");

router.route("/").post(createCurve);
router.route("/getCurve").post(getCurve);

module.exports = router;
