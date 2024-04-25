module.exports = (db, type) => {
  return db.define("nurse", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
