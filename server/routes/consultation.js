const express = require("express");
const router = express.Router();
const consultationControllers = require("../Controllers/consultation.js");

router.route("/").post(consultationControllers.newConsultation);
router.route("/:id").get(consultationControllers.getConsultationByPatientId);

module.exports = router;
