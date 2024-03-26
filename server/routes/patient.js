const patientController = require("../Controllers/patient.js");
const express = require("express");
const router = express.Router();

//=======================================================

router.route("/isWaiting").get(patientController.gattWaitingPatient);
router
  .route("/:id/leaveWaitingRoom")
  .put(patientController.deleteTFromWaitinRom);
router.route("/:id/enterWaitingRoom").put(patientController.addToWaitinRom);
router
  .route("/:id")
  .get(patientController.getPatient)
  .delete(patientController.deletePatient)
  .patch(patientController.updatePatient);
router
  .route("/")
  .get(patientController.getAllPatients)
  .post(patientController.addPatient);

//=======================================================

module.exports = router;
