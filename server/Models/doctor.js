module.exports = (db, type) => {
  return db.define("doctor", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
