const DataTypes = require("sequelize");
const db = require("../config/dbConfig.js");
const patientModel = require("./Patient.js");
const medicamentModel = require("./Medicament.js");
const ordonnanceModel = require("./Ordonnance.js");
const userModel = require("./User.js");
const consultationModel = require("./Consultation.js");
const doctorModel = require("./Doctor.js");
const nurseModel = require("./Nurse.js");
const antecedentModel = require("./Antecedent.js");
const prescriptionModel = require("./Prescription.js");
const curveModel = require("./Curve.js");
const patientAntecedentModel = require("./PatientAntecedent.js");
const compteRenduModel = require("./CompteRendu.js");
const appointmentModel = require("./Appointment.js");
const actModel = require("./Act.js");
const payModel = require("./Payment.js");
const actPaymentModel = require("./ActPayment.js");
const savedOrdonnanceModel = require("./SavedOrdonnance.js"); // <== Add this line to import the savedOrdonnance model
const savedPrescriptionModel = require("./SavedPrescription.js"); // <== Add this line to import the savedPrescription model
const savedCmptRndModel = require("./SavedCmptRnd.js");

const patient = patientModel(db, DataTypes);
const medicament = medicamentModel(db, DataTypes);
const ordonnance = ordonnanceModel(db, DataTypes);
const user = userModel(db, DataTypes);
const consultation = consultationModel(db, DataTypes);
const doctor = doctorModel(db, DataTypes);
const nurse = nurseModel(db, DataTypes);
const antecedent = antecedentModel(db, DataTypes);
const prescription = prescriptionModel(db, DataTypes);
const curve = curveModel(db, DataTypes);
const patientAntecedent = patientAntecedentModel(db, DataTypes);
const compteRendu = compteRenduModel(db, DataTypes);
const appointment = appointmentModel(db, DataTypes);
const act = actModel(db, DataTypes);
const payment = payModel(db, DataTypes);
const actPayment = actPaymentModel(db, DataTypes);
const savedOrdonnance = savedOrdonnanceModel(db, DataTypes); // <== Add this line to create the savedOrdonnance table
const savedPrescription = savedPrescriptionModel(db, DataTypes); // <== Add this line to create the savedPrescription table
const savedCmptRnd = savedCmptRndModel(db, DataTypes);

user.hasMany(nurse);
nurse.belongsTo(user);

user.hasMany(doctor);
doctor.belongsTo(user);

doctor.hasMany(consultation);
consultation.belongsTo(doctor);

patient.hasMany(consultation);
consultation.belongsTo(patient);

consultation.hasMany(ordonnance);
ordonnance.belongsTo(consultation);

consultation.hasMany(compteRendu);
compteRendu.belongsTo(consultation);

ordonnance.belongsToMany(medicament, {
  through: {
    model: prescription,
    unique: false,
    foreignKey: "ordonnanceId",
  },
});

medicament.belongsToMany(ordonnance, {
  through: {
    model: prescription,
    unique: false,
    foreignKey: "medicamentId",
  },
});
patient.belongsToMany(antecedent, {
  through: {
    model: patientAntecedent,
    unique: false,
    foreignKey: "patientId",
  },
});
antecedent.belongsToMany(patient, {
  through: {
    model: patientAntecedent,
    unique: false,
    foreignKey: "antecedentId",
  },
});

patient.hasMany(appointment);
appointment.belongsTo(patient);

patient.hasMany(payment);
payment.belongsTo(patient);

payment.belongsToMany(act, {
  through: {
    model: actPayment,
    unique: false,
    foreignKey: "paymentId",
  },
});
act.belongsToMany(payment, {
  through: {
    model: actPayment,
    unique: false,
    foreignKey: "actId",
  },
});

savedOrdonnance.belongsToMany(medicament, {
  through: {
    model: savedPrescription,
    unique: false,
    foreignKey: "ordonnanceId",
  },
});
medicament.belongsToMany(savedOrdonnance, {
  through: {
    model: savedPrescription,
    unique: false,
    foreignKey: "medicamentId",
  },
});

db.sync({ force: false })
  .then(() => console.log("db synced"))
  .catch((err) => console.log(err));
module.exports = {
  patient,
  medicament,
  ordonnance,
  user,
  consultation,
  doctor,
  nurse,
  antecedent,
  prescription,
  curve,
  patientAntecedent,
  compteRendu,
  appointment,
  act,
  payment,
  actPayment,
  savedOrdonnance,
  savedPrescription,
  savedCmptRnd,
};
//========================  export models END     ========================
