module.exports = (db, type) => {
  return db.define("medicaments", {
    name: {
      type: type.STRING,
      allowNull: false,
    },
    type: {
      type: type.STRING,
      allowNull: false,
    },
    dosage: {
      type: type.STRING,
      allowNull: false,
    },
    dosageUnit: {
      type: type.ENUM("mL", "mg", "g"),
      allowNull: false,
    },
  });
};
