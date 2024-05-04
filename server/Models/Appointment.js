module.exports = (db, type) => {
  return db.define("appointment", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.DATEONLY,
      allowNull: false,
    },
    time: {
      type: type.STRING,
      allowNull: false,
      defaultValue: "08:00",
    },
    patientId: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
