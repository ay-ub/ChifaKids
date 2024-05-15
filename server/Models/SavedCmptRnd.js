module.exports = (db, type) => {
  return db.define("savedCmptRnd", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
