module.exports = (db, type) => {
  return db.define("actPayment", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    actId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "acts",
        key: "id",
      },
    },
    paymentId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "payments",
        key: "id",
      },
    },
  });
};
