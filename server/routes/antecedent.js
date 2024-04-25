const express = require("express");
const Router = express.Router();
const antecedentController = require("../Controllers/antecedent.js");

Router.route("/")
  .post(antecedentController.createAntecedent)
  .get(antecedentController.getAllAntecedent);
Router.route("/patient")
  .post(antecedentController.addAntecedentToPatient)
  .delete(antecedentController.removeAntecedentFromPatient);
Router.route("/:antecedentId")
  .put(antecedentController.updateAntecedent)
  .delete(antecedentController.deleteAntecedent);
Router.route("/patient/:patientId").get(
  antecedentController.getAntecedentOfPatient
);

module.exports = Router;
