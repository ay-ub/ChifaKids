module.exports = (db, type) => {
  return db.define("consultation", {
    date: {
      type: type.DATE,
      allowNull: false,
    },
    motif: {
      type: type.STRING,
      allowNull: false,
    },
    diagnostic: {
      type: type.STRING,
      allowNull: false,
    },
    height: {
      type: type.FLOAT,
      allowNull: false,
    },
    weight: {
      type: type.FLOAT,
      allowNull: false,
    },
  });
};
