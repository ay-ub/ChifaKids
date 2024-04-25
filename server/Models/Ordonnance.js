module.exports = (db, type) => {
  return db.define("ordonnance", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.DATEONLY,
      allowNull: true,
      defaultValue: type.NOW,
    },
  });
};
