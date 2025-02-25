const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const {
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
  paymentRoute,
} = require("./routes/index.js");

const { app, server, io } = require("./socket/socket");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.set("socketio", io);
app.use(express.json());
app.use(cookieParser());

const db = require("./config/dbConfig.js");
db.authenticate()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/patients", patientRoute);
app.use("/medicaments", medicamentRoute);
app.use("/consultations", consultationRoute);
app.use("/antecedent", antecedentRoute);
app.use("/ordonnance", ordonnanceRoute);
app.use("/curve", curveRoute);
app.use("/compteRendu", compteRenduRoute);
app.use("/appointment", appointmentRoute);
app.use("/statistics", statistiqueRoute);
app.use("/service", serviceRoute);
app.use("/payment", paymentRoute);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listen at port num ${port}`);
});
