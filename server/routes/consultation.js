const express = require("express");
const router = express.Router();
const {
  createConsultation,
  getConsultationByPatientId,
  deleteConsultation,
  getHeightByPatientId,
  getWeightByPatientId,
  getConsultationByDate,
} = require("../Controllers/consultation.js");

router.route("/").post(createConsultation);
router.route("/:id").get(getConsultationByPatientId).delete(deleteConsultation);
router.route("/height/:id").get(getHeightByPatientId);
router.route("/weight/:id").get(getWeightByPatientId);
router.route("/date/:id").post(getConsultationByDate);

module.exports = router;
