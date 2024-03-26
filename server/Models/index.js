const DataTypes = require("sequelize");
const db = require("../config/dbConfig.js");
const patientModel = require("./Patient.js");
const medicamentModel = require("./Medicament.js");
const ordonnanceModel = require("./Ordonnance.js");
const userModel = require("./User.js");
const consultationModel = require("./consultation.js");
const doctorModel = require("./doctor.js");
const nurseModel = require("./nurse.js");
const heightNormModel = require("./heightNorm.js");

const patient = patientModel(db, DataTypes);
const medicament = medicamentModel(db, DataTypes);
const ordonnance = ordonnanceModel(db, DataTypes);
const user = userModel(db, DataTypes);
const consultation = consultationModel(db, DataTypes);
const doctor = doctorModel(db, DataTypes);
const nurse = nurseModel(db, DataTypes);
const heightNorm = heightNormModel(db, DataTypes);

user.hasMany(nurse);
nurse.belongsTo(user);

db.sync({ force: true })
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
  heightNorm,
};
//========================  export models END     ========================
