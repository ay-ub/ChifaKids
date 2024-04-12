const DataTypes = require("sequelize");
const db = require("../config/dbConfig.js");
const patientModel = require("./Patient.js");
const medicamentModel = require("./Medicament.js");
const ordonnanceModel = require("./Ordonnance.js");
const userModel = require("./User.js");
const consultationModel = require("./Consultation.js");
const doctorModel = require("./Doctor.js");
const nurseModel = require("./Nurse.js");
// const heightNormModel = require("./heightNorm.js");
const antecedentModel = require("./Antecedent.js");
const prescriptionModel = require("./Prescription.js");

const patient = patientModel(db, DataTypes);
const medicament = medicamentModel(db, DataTypes);
const ordonnance = ordonnanceModel(db, DataTypes);
const user = userModel(db, DataTypes);
const consultation = consultationModel(db, DataTypes);
const doctor = doctorModel(db, DataTypes);
const nurse = nurseModel(db, DataTypes);
// const heightNorm = heightNormModel(db, DataTypes);
const antecedent = antecedentModel(db, DataTypes);
const prescription = prescriptionModel(db, DataTypes);

user.hasMany(nurse);
nurse.belongsTo(user);

user.hasMany(doctor);
doctor.belongsTo(user);

consultation.hasMany(ordonnance);
ordonnance.belongsTo(consultation);

ordonnance.belongsToMany(medicament, { through: prescription });
medicament.belongsToMany(ordonnance, { through: prescription });

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
  // heightNorm,
  antecedent,
  prescription,
};
//========================  export models END     ========================
