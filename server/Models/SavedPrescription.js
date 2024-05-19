module.exports = (db, type) => {
  return db.define("savedPrescription", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    frequency: {
      // nbr fois par jour
      type: type.STRING,
      allowNull: false,
    },
    duration: {
      // durée du traitement
      type: type.STRING,
      allowNull: false,
    },
    notes: {
      // remarques sur le traitement
      type: type.TEXT,
      allowNull: true,
    },
    eatingTime: {
      // moment de prise du médicament
      type: type.ENUM("AVANT", "PENDANT", "APRES"),
      allowNull: false,
      defaultValue: "PENDANT",
    },
  });
};
