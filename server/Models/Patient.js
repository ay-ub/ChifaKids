module.exports = (db, type) => {
  return db.define("patients", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: type.STRING,
      allowNull: false,
    },
    lastName: {
      type: type.STRING,
      allowNull: false,
    },
    gender: {
      type: type.ENUM("MALE", "FEMALE"),
      allowNull: false,
    },
    dateOfBirth: {
      type: type.DATEONLY,
      allowNull: false,
    },
    numberPhone: {
      type: type.STRING,
      allowNull: false,
    },
    parent: {
      type: type.STRING,
      allowNull: false,
    },
    isWaiting: {
      type: type.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  });
};
