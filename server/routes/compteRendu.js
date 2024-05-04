const express = require("express");
const router = express.Router();

const {
  createCompteRendu,
  getAllCompteRenduOfPatient,
  updateCompteRendu,
  deleteCompteRendu,
} = require("../Controllers/compteRendu");

router.post("/", createCompteRendu);
router.get("/patient/:id", getAllCompteRenduOfPatient);
router.route("/:cmptRndId").put(updateCompteRendu).delete(deleteCompteRendu);
module.exports = router;
