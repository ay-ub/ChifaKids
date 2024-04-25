module.exports = (db, type) => {
  return db.define("prescription", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    medicamentId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "medicament",
        key: "id",
      },
    },
    ordonnanceId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "ordonnance",
        key: "id",
      },
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
    },
  });
};
