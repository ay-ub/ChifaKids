const medicamentController = require("../Controllers/medicament");
const express = require("express");
const router = express.Router();

//=======================================================
router
  .route("/")
  .get(medicamentController.getAllMedicament)
  .post(medicamentController.addMedicament);
router
  .route("/:id")
  .get(medicamentController.getMedicamentById)
  .delete(medicamentController.deleteMedicament)
  .patch(medicamentController.updateMedicament);
//=======================================================

module.exports = router;
