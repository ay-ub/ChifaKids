module.exports = (db, type) => {
  return db.define("payment", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    receivedAmount: {
      type: type.FLOAT,
      allowNull: false,
    },
    date: {
      type: type.DATEONLY,
      allowNull: false,
      defaultValue: type.NOW,
    },
    paymentMethod: {
      type: type.ENUM("CASH", "CARD", "CHEQUE"),
      allowNull: false,
    },
  });
};
