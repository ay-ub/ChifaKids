module.exports = (db, type) => {
  return db.define("user", {
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    firstName: {
      type: type.STRING,
      allowNull: false,
    },
    lastName: {
      type: type.STRING,
      allowNull: false,
    },
    typeUser: {
      type: type.ENUM("ADMIN", "DOCTOR", "NURSE"),
      allowNull: false,
      defaultValue: "NURSE",
    },
  });
};
