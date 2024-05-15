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
const serviceModel = require("./Service.js");
const savedOrdonnanceModel = require("./SavedPrescription.js");
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
const service = serviceModel(db, DataTypes);
const savedOrdonnance = savedOrdonnanceModel(db, DataTypes);
const savedCmptRnd = savedCmptRndModel(db, DataTypes);

user.hasMany(nurse);
nurse.belongsTo(user);

user.hasMany(doctor);
doctor.belongsTo(user);

doctor.hasMany(consultation);
consultation.belongsTo(doctor);

patient.hasMany(consultation);
consultation.belongsTo(patient);

// patient.belongsToMany(doctor, {
//   through: {
//     model: consultation,
//     unique: false,
//     foreignKey: "patientId",
//   },
// });
// doctor.belongsToMany(patient, {
//   through: {
//     model: consultation,
//     unique: false,
//     foreignKey: "doctorId",
//   },
// });

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

ordonnance.hasMany(savedOrdonnance);
savedOrdonnance.belongsTo(ordonnance);

compteRendu.hasMany(savedCmptRnd);
savedCmptRnd.belongsTo(compteRendu);
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
  service,
  savedOrdonnance,
  savedCmptRnd,
};
//========================  export models END     ========================
