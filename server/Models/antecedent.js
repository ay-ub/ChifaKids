module.exports = (db, type) => {
  return db.define("antecedent", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
