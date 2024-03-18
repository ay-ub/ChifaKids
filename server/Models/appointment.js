module.exports = (db, type) => {
  return db.define("appointment", {
    appointmentDate: {
      type: type.DATE,
      allowNull: false,
    },
    appointmentTime: {
      type: type.TIME,
      allowNull: false,
    },
  });
};
