const authRoute = require("./auth.js");
const patientRoute = require("./patient.js");
const userRoute = require("./user.js");
const medicamentRoute = require("./medicament.js");
const consultationRoute = require("./consultation.js");
const antecedentRoute = require("./antecedent.js");
const ordonnanceRoute = require("./ordonnance.js");
const curveRoute = require("./curve.js");
const compteRenduRoute = require("./compteRendu.js");
const appointmentRoute = require("./appointment.js");
const statistiqueRoute = require("./statistique.js");
const serviceRoute = require("./service.js");

module.exports = {
  authRoute,
  userRoute,
  patientRoute,
  medicamentRoute,
  consultationRoute,
  antecedentRoute,
  ordonnanceRoute,
  curveRoute,
  compteRenduRoute,
  appointmentRoute,
  statistiqueRoute,
  serviceRoute,
};
