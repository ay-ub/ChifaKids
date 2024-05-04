module.exports = (db, type) => {
  return db.define("compteRendu", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.DATEONLY,
      defaultValue: type.NOW,
    },
    commentaire: {
      type: type.TEXT,
      allowNull: false,
    },
  });
};
