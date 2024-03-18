module.exports = (db, type) => {
  return db.define("patients", {
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
  });
};
