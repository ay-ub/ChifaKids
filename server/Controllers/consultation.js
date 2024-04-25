const { consultation, doctor, patient } = require("../Models");
const { Op } = require("sequelize");
const data = [
  {
    motif: "regular checkup",
    date: "2022-01-01",
    height: 170.2,
    weight: 65.4,
    generalCondition: "healthy",
    urogenital: "No abnormalities detected",
    genital: "Normal",
    abdominal: "No pain",
    glycemie: 4.8,
    urea: 26.1,
    creatine: 0.9,
    fns: "Normal",
    crp: 2.5,
    biologyOther: "Normal",
    ultrasound: "No abnormalities detected",
    tdm: "Normal",
    irm: "Normal",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "sore throat",
    date: "2022-03-02",
    height: 170.2,
    weight: 65.4,
    generalCondition: "healthy",
    urogenital: "No abnormalities detected",
    genital: "Normal",
    abdominal: "No pain",
    glycemie: 4.8,
    urea: 26.1,
    creatine: 0.9,
    fns: "Normal",
    crp: 2.5,
    biologyOther: "Normal",
    ultrasound: "No abnormalities detected",
    tdm: "Normal",
    irm: "Normal",
    patientId: 1,
    doctorId: 1,
  },
];
const createConsultation = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    if (!doctorId || !patientId) {
      return res.status(400).json({
        status: "fail",
        message: "Doctor id and Patient id are required",
      });
    }
    const Doctor = await doctor.findByPk(doctorId);
    const Patient = await patient.findByPk(patientId);
    if (!Doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }
    if (!Patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    const newConsultation = await consultation.create(req.body);

    return res.status(201).json({
      status: "success",
      data: newConsultation,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getConsultationByPatientId = async (req, res) => {
  try {
    const fondPatient = await patient.findByPk(req.params.id);
    if (!fondPatient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    const queryResult = await consultation.findAll({
      where: { patientId: req.params.id },
      order: [["date", "DESC"]],
      limit: 10,
    });
    return res.status(200).json({
      status: "success",
      data: queryResult,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getHeightByPatientId = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        status: "fail",
        message: "Patient id is required",
      });
    }
    const queryResult = await consultation.findAll({
      where: { patientId: req.params.id },
      attributes: ["height", "date"],
      order: [["date", "ASC"]],
    });
    return res.status(200).json({
      status: "success",
      data: queryResult,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getWeightByPatientId = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        status: "fail",
        message: "Patient id is required",
      });
    }
    const queryResult = await consultation.findAll({
      where: { patientId: req.params.id },
      attributes: ["weight", "date"],
      order: [["date", "ASC"]],
    });
    return res.status(200).json({
      status: "success",
      data: queryResult,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteConsultation = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        status: "fail",
        message: "Consultation id is required",
      });
    }
    await consultation.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getConsultationByDate = async (req, res) => {
  try {
    const { from, to } = req.body;
    if (!from || !to) {
      return res.status(400).json({
        status: "fail",
        message: "From and To date are required",
      });
    }
    const queryResult = await consultation.findAll({
      where: {
        patientId: req.params.id,
        date: {
          [Op.between]: [from, to],
        },
      },
      order: [["date", "DESC"]],
    });
    res.status(200).json({
      status: "success",
      data: queryResult,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = {
  createConsultation,
  getConsultationByPatientId,
  getHeightByPatientId,
  getWeightByPatientId,
  deleteConsultation,
  getConsultationByDate,
};
