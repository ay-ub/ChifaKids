const express = require("express");
const router = express.Router();
const { createPayment, getPayments } = require("../Controllers/payment");

router.post("/", createPayment).get("/", getPayments);

module.exports = router;
