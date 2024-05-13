module.exports = (db, type) => {
  return db.define("payment", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    amount: {
      type: type.INTEGER,
      allowNull: false,
    },
    date: {
      type: type.DATE,
      allowNull: false,
      defaultValue: type.NOW,
    },
    paymentMethod: {
      type: type.ENUM[("cash", "card", "cheque")],
      allowNull: false,
    },
  });
};
