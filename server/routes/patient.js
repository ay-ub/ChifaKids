const patientController = require("../Controllers/patient.js");
const express = require("express");
const router = express.Router();

//=======================================================
router
  .route("/")
  .get(patientController.getAllPatients)
  .post(patientController.addPatient);
router
  .route("/:id")
  .get(patientController.getPatient)
  .delete(patientController.deletePatient)
  .patch(patientController.updatePatient);
//=======================================================

module.exports = router;
