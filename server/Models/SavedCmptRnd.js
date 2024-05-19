module.exports = (db, type) => {
  return db.define("savedMedicalReport", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    commentaire: {
      type: type.TEXT,
      allowNull: true,
    },
  });
};
