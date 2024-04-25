module.exports = (db, type) => {
  return db.define("patientAntecedent", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    antecedentId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "antecedents",
        key: "id",
      },
    },
  });
};
