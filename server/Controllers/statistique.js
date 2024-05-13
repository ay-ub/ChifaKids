const {
  patient,
  consultation,
  patientAntecedent,
  antecedent,
  user,
} = require("../Models");
const sequelize = require("sequelize");

const getAllStatistique = async (req, res) => {
  try {
    // const totalNbrPatient = await patient.count();
    const nbrPatientBoys = await patient.count({ where: { gender: "MALE" } });
    const nbrPatientGirls = await patient.count({
      where: { gender: "FEMALE" },
    });
    const nbrUsers = await user.count();
    const totalNbrConsultation = await consultation.count();
    res.json({
      status: "success",
      data: {
        nbrPatientBoys,
        nbrPatientGirls,
        totalNbrConsultation,
        nbrUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStatistique,
};
