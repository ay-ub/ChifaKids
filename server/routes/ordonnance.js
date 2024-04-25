const express = require("express");
const router = express.Router();
const {
  createOrdonnance,
  getOrdonnanceById,
  deleteOrdonnance,
  getAllOrdonnances,
} = require("../Controllers/ordonnance");

router.route("/:ordonnanceId").get(getOrdonnanceById).delete(deleteOrdonnance);
router.route("/").post(createOrdonnance);
router.route("/patient/:patientId").get(getAllOrdonnances);

module.exports = router;
