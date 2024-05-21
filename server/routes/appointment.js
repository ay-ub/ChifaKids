const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointment");

router
  .route("/")
  .post(appointmentController.createAppointment)
  .get(appointmentController.getNumbers);
router
  .route("/:id")
  .get(appointmentController.getAllAppointments)
  .put(appointmentController.updateAppointment)
  .delete(appointmentController.deleteAppointment);

module.exports = router;
