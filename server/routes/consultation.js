const express = require("express");
const router = express.Router();
const consultationControllers = require("../Controllers/consultation.js");

router.route("/").post(consultationControllers.newConsultation);
router.route("/:id").get(consultationControllers.getConsultationByPatientId);
router.route("/height/:id").get(consultationControllers.getHeightByPatientId);
router.route("/weight/:id").get(consultationControllers.getWeightByPatientId);

module.exports = router;
