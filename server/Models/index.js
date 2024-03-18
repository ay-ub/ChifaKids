const DataTypes = require("sequelize");
const db = require("../config/dbConfig.js");
const patientModel = require("./Patient.js");
const medicamentModel = require("./Medicament.js");
const ordonnanceModel = require("./Ordonnance.js");
const userModel = require("./User.js");
const waitingRomModel = require("./watingRom.js");
const consultationModel = require("./consultation.js");
const doctorModel = require("./doctor.js");
const nurseModel = require("./nurse.js");
const appointmentModel = require("./appointment.js");

const patient = patientModel(db, DataTypes);
const medicament = medicamentModel(db, DataTypes);
const ordonnance = ordonnanceModel(db, DataTypes);
const user = userModel(db, DataTypes);
const waitingRom = waitingRomModel(db, DataTypes);
const consultation = consultationModel(db, DataTypes);
const doctor = doctorModel(db, DataTypes);
const nurse = nurseModel(db, DataTypes);
const appointment = appointmentModel(db, DataTypes);

patient.belongsToMany(doctor, {
  through: {
    model: consultation,
  },
});

doctor.belongsToMany(patient, {
  through: {
    model: consultation,
  },
});

user.hasOne(doctor);
doctor.belongsTo(user);

user.hasOne(nurse);
nurse.belongsTo(user);

nurse.hasMany(appointment);
appointment.belongsTo(nurse);

consultation.hasOne(ordonnance);
ordonnance.belongsTo(consultation);

// ordonnance.belongsToMany(medicament, {
//   through: {
//     model: "ordonnance_medicament",
//   },
// });
// medicament.belongsToMany(ordonnance, {
//   through: {
//     model: "ordonnance_medicament",
//   },
// });

db.sync({ force: true })
  .then(() => console.log("db synced"))
  .catch((err) => console.log(err));

module.exports = {
  patient,
  medicament,
  ordonnance,
  user,
  waitingRom,
  consultation,
  doctor,
  nurse,
  appointment,
};
//========================  export models END     ========================
