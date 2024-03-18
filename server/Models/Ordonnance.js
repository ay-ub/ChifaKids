module.exports = (db, type) => {
  return db.define("ordonnances", {
    ordonnanceDate: {
      type: type.DATE,
      allowNull: false,
    },
  });
};
