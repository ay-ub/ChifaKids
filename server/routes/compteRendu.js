const express = require("express");
const router = express.Router();

const {
  createCompteRendu,
  getAllCompteRenduOfPatient,
  updateCompteRendu,
  deleteCompteRendu,
  getSavedCompteRendu,
  deleteSavedCompteRendu,
} = require("../Controllers/compteRendu");

router.post("/", createCompteRendu).get("/", getSavedCompteRendu);
router.delete("/saved/:id", deleteSavedCompteRendu);
router.post("/patient/:id", getAllCompteRenduOfPatient);
router.route("/:cmptRndId").put(updateCompteRendu).delete(deleteCompteRendu);
module.exports = router;
