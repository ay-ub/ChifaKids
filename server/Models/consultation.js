module.exports = (db, type) => {
  return db.define("consultation", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.DATEONLY,
      allowNull: true,
      defaultValue: type.NOW,
    },
    // =================================================start interrogatoire Attr=================================================
    motif: {
      type: type.STRING,
      allowNull: true,
    },
    // =================================================end interrogatoire Attr=================================================
    // =================================================start exmn clinique general Attr=================================================
    height: {
      type: type.FLOAT,
      allowNull: true,
    },
    weight: {
      type: type.FLOAT,
      allowNull: true,
    },
    generalCondition: {
      type: type.STRING,
      allowNull: true,
    },
    // =================================================end exmn clinique general Attr=================================================
    // =================================================start exmn clinique par appareil Attr=================================================
    urogenital: {
      type: type.STRING,
      allowNull: true,
    },
    genital: {
      type: type.STRING,
      allowNull: true,
    },
    abdominal: {
      type: type.STRING,
      allowNull: true,
    },
    // =================================================end exmn  clinique par appareil Attr=================================================
    // =================================================start biologie Attr=================================================
    glycemie: {
      type: type.FLOAT,
      allowNull: true,
    },
    urea: {
      // urée
      type: type.FLOAT,
      allowNull: true,
    },
    creatine: {
      type: type.FLOAT,
      allowNull: true,
    },
    fns: {
      type: type.STRING,
      allowNull: true,
    },
    crp: {
      type: type.FLOAT,
      allowNull: true,
    },
    biologyOther: {
      type: type.STRING,
      allowNull: true,
    },
    // =================================================end biologie Attr=================================================
    // =================================================start radiologie Attr=================================================
    ultrasound: {
      type: type.STRING,
      allowNull: true,
    },
    tdm: {
      type: type.STRING,
      allowNull: true,
    },
    irm: {
      type: type.STRING,
      allowNull: true,
    },
    // ================================================= end radiologie attr =================================================
    patientId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    doctorId: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "doctors",
        key: "id",
      },
    },
  });
};
