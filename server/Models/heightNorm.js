module.exports = (db, type) => {
  return db.define("heightNorm", {
    Month: {
      type: type.INTEGER,
      allowNull: false,
    },
    L: {
      type: type.FLOAT,
      allowNull: false,
    },
    M: {
      type: type.FLOAT,
      allowNull: false,
    },
    S: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD3neg: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD2neg: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD1neg: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD0: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD1: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD2: {
      type: type.FLOAT,
      allowNull: false,
    },
    SD3: {
      type: type.FLOAT,
      allowNull: false,
    },
  });
};
