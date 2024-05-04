const express = require("express");
const router = express.Router();

const { getAllStatistique } = require("../Controllers/statistique");

router.route("/").get(getAllStatistique);

module.exports = router;
