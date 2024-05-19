const express = require("express");
const router = express.Router();
const {
  createOrdonnance,
  getOrdonnanceById,
  deleteOrdonnance,
  getAllOrdonnances,
  getSavedOrdonnances,
  deleteSavedOrdonnance,
} = require("../Controllers/ordonnance");

// router.get("/saved", getSavedOrdonnances);
// get all saved ordonnances
router.get("/saved", getSavedOrdonnances);
// delete a saved ordonnance
router.delete("/saved/:savedOrdonnanceId", deleteSavedOrdonnance);
router.route("/:ordonnanceId").get(getOrdonnanceById).delete(deleteOrdonnance);
router.route("/").post(createOrdonnance);
router.route("/patient/:patientId").post(getAllOrdonnances);

module.exports = router;
