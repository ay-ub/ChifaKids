module.exports = (db, type) => {
  return db.define("medicaments", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
  });
};
