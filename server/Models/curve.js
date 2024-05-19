module.exports = (db, type) => {
  return db.define("curve", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: type.JSONB,
      allowNull: false,
    },
    gender: {
      type: type.ENUM("MALE", "FEMALE"),
      allowNull: false,
    },
    type: {
      type: type.ENUM("HEIGHT", "WEIGHT"),
      allowNull: false,
    },
  });
};
