const express = require("express");
const router = express.Router();
const doctorController = require("../Controllers/doctor");

router.route("/").post(doctorController.createDoctor);

module.exports = router;
