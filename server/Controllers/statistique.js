const {
  patient,
  consultation,
  patientAntecedent,
  antecedent,
} = require("../Models");
const sequelize = require("sequelize");

async function findMostCommonAntecedent() {
  try {
    const result = await patientAntecedent.findAll({
      attributes: [
        "antecedentId",
        [sequelize.fn("COUNT", "antecedentId"), "count"],
      ],
      include: [
        {
          model: antecedent,
          attributes: [],
        },
      ],
      group: ["antecedentId"],
      order: [[sequelize.literal("count"), "DESC"]],
      limit: 1,
    });

    if (result.length > 0) {
      const mostCommonAntecedentId = result[0].antecedentId;
      const mostCommonAntecedentCount = result[0].get("count");
      const mostCommonAntecedent = await antecedent.findByPk(
        mostCommonAntecedentId
      );
      return {
        mostCommonAntecedent: mostCommonAntecedent.name,
        mostCommonAntecedentCount,
      };
    } else {
      console.log("No data found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const getAllStatistique = async (req, res) => {
  try {
    // const totalNbrPatient = await patient.count();
    const nbrPatientBoys = await patient.count({ where: { gender: "MALE" } });
    const nbrPatientGirls = await patient.count({
      where: { gender: "FEMALE" },
    });
    const totalNbrConsultation = await consultation.count();
    res.json({
      status: "success",
      data: {
        // totalNbrPatient,
        nbrPatientBoys,
        nbrPatientGirls,
        totalNbrConsultation,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStatistique,
};
