module.exports = (db, type) => {
  return db.define("antecedent", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    type: {
      type: type.ENUM("Familiaux", "Medicaux", "Chururgicaux"),
      allowNull: false,
    },
  });
};
