module.exports = (db, type) => {
  return db.define("service", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    price: {
      type: type.FLOAT,
      allowNull: false,
    },
  });
};
