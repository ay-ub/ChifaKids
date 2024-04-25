const express = require("express");
const router = express.Router();
const { createCurve, deleteCurve } = require("../Controllers/curve");

router.route("/").post(createCurve).delete(deleteCurve);

module.exports = router;
