const express = require("express");
const {
  createService,
  getServices,
  deleteService,
  updateService,
} = require("../Controllers/service.js");
const router = express.Router();

router.route("/").post(createService).get(getServices);
router.route("/:id").delete(deleteService).put(updateService);

module.exports = router;
