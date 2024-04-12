module.exports = (db, type) => {
  return db.define("antecedent", {
    name: {
      type: type.STRING,
      allowNull: false,
    },
    type: {
      type: type.ENUM("Familiaux", "Medicaux", "Chururgicaux"),
      allowNull: false,
    },
    patientId: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
