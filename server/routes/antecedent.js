const express = require("express");
const Router = express.Router();
const antecedentController = require("../Controllers/antecedent.js");

Router.route("/").post(antecedentController.createAntecedent);
Router.route("/:patientId").get(antecedentController.getAntecedentById);
Router.route("/:antecedentId")
  .put(antecedentController.updateAntecedent)
  .delete(antecedentController.deleteAntecedent);

module.exports = Router;
