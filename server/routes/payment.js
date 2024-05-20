const express = require("express");
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPaymentOfPatient,
} = require("../Controllers/payment");

router.get("/patient/:patientId", getPaymentOfPatient);
router.post("/", createPayment).get("/", getPayments);

module.exports = router;
