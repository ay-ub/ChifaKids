module.exports = (db, type) => {
  return db.define("curve", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    L: {
      type: type.INTEGER,
      allowNull: false,
    },
    M: {
      type: type.INTEGER,
      allowNull: false,
    },
    S: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD3neg: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD2neg: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD1neg: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD0: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD1: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD2: {
      type: type.INTEGER,
      allowNull: false,
    },
    SD3: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
