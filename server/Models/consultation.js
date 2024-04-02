module.exports = (db, type) => {
  return db.define("consultation", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.DATEONLY,
      allowNull: false,
      defaultValue: type.NOW,
    },
    motif: {
      type: type.STRING,
      allowNull: false,
      defaultValue: "Pas de motif",
    },
    height: {
      type: type.FLOAT,
      allowNull: false,
    },
    weight: {
      type: type.FLOAT,
      allowNull: false,
    },
    generalCondition: {
      type: type.TEXT,
      allowNull: false,
      defaultValue: "Pas d'etat general",
    },
    doctorId: {
      type: type.INTEGER,
      allowNull: false,
    },
    patientId: {
      type: type.INTEGER,
      allowNull: false,
    },
    month: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
