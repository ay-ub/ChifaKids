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
      type: type.STRING,
      allowNull: true,
    },
    weight: {
      type: type.STRING,
      allowNull: true,
    },
    generalCondition: {
      type: type.TEXT,
      allowNull: true,
    },
    // =================================================end exmn clinique general Attr=================================================
    // =================================================start exmn clinique par appareil Attr=================================================
    urogenital: {
      type: type.TEXT,
      allowNull: true,
    },
    genital: {
      type: type.TEXT,
      allowNull: true,
    },
    abdominal: {
      type: type.TEXT,
      allowNull: true,
    },
    // =================================================end exmn  clinique par appareil Attr=================================================
    // =================================================start biologie Attr=================================================
    glycemie: {
      type: type.STRING,
      allowNull: true,
    },
    urea: {
      // urée
      type: type.STRING,
      allowNull: true,
    },
    creatine: {
      type: type.STRING,
      allowNull: true,
    },
    fns: {
      type: type.TEXT,
      allowNull: true,
    },
    crp: {
      type: type.STRING,
      allowNull: true,
    },
    biologyOther: {
      type: type.TEXT,
      allowNull: true,
    },
    // =================================================end biologie Attr=================================================
    // =================================================start radiologie Attr=================================================
    ultrasound: {
      type: type.TEXT,
      allowNull: true,
    },
    tdm: {
      type: type.TEXT,
      allowNull: true,
    },
    irm: {
      type: type.TEXT,
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
