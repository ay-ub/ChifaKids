const express = require("express");
const router = express.Router();
const {
  createOrdonnance,
  getOrdonnance,
} = require("../Controllers/ordonnance");

router.route("/").post(createOrdonnance);
router.route("/:ordonnanceId").get(getOrdonnance);

module.exports = router;
