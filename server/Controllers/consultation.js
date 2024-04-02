const { consultation, doctor, patient } = require("../Models");

const getCurrentDate = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  return (
    currentYear +
    "-" +
    (currentMonth < 10 ? "0" : "") +
    currentMonth +
    "-" +
    (currentDay < 10 ? "0" : "") +
    currentDay
  );
};

const calculateAgeMonth = (date) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  const birthDate = new Date(date);
  const birthMonth = birthDate.getMonth() + 1;
  const birthYear = birthDate.getFullYear();
  const birthDay = birthDate.getDate();

  let ageMonth = currentMonth - birthMonth;
  let ageYear = currentYear - birthYear;

  if (currentDay < birthDay) {
    ageMonth--;
  }
  if (ageMonth < 0) {
    ageMonth += 12;
    ageYear--;
  }
  return ageYear * 12 + ageMonth;
};

const newConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, motif, height, weight, generalCondition } =
      req.body;
    const Doctor = await doctor.findByPk(doctorId);
    const Patient = await patient.findByPk(patientId);
    console.log(req.body);
    if (!Doctor || !Patient) {
      return res.status(404).json({
        status: "error",
        message: "Doctor or Patient not found",
      });
    }
    const currentDate = getCurrentDate();
    const newConsultation = await consultation.create({
      doctorId: doctorId,
      patientId: patientId,
      date: currentDate,
      motif: motif,
      height: height,
      weight: weight,
      generalCondition: generalCondition,
      month: calculateAgeMonth(Patient.dateOfBirth),
    });
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
    const queryResult = await consultation.findAll({
      where: { patientId: req.params.id },
      order: [["date", "ASC"]],
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
    const queryResult = await consultation.findAll({
      where: { patientId: req.params.id },
      attributes: ["height", "month"],
      order: [["month", "ASC"]],
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
    const queryResult = await consultation.findAll({
      where: { patientId: req.params.id },
      attributes: ["weight", "month"],
      order: [["month", "ASC"]],
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

module.exports = {
  newConsultation,
  getConsultationByPatientId,
  getHeightByPatientId,
  getWeightByPatientId,
};
