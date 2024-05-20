const {
  patient,
  consultation,

  doctor,
  user,
} = require("../Models");
const sequelize = require("sequelize");

const getAllStatistique = async (req, res) => {
  try {
    const nbrPatientBoys = await patient.count({ where: { gender: "MALE" } });
    const nbrPatientGirls = await patient.count({
      where: { gender: "FEMALE" },
    });
    const nbrUsers = await user.count();
    const totalNbrConsultation = await consultation.count();

    const topDoctors = await doctor.findAll({
      attributes: [
        "id",
        [
          sequelize.fn("COUNT", sequelize.col("consultations.id")),
          "consultationCount",
        ],
      ],
      include: [
        {
          model: user,
          attributes: ["firstName", "lastName"],
        },
        {
          model: consultation,
          attributes: [],
        },
      ],
      group: ["doctor.id", "user.email"],
      having: sequelize.where(
        sequelize.fn("COUNT", sequelize.col("consultations.id")),
        ">",
        0
      ),
      order: [[sequelize.literal('"consultationCount"'), "DESC"]],
      limit: 5,
      subQuery: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        nbrPatientBoys,
        nbrPatientGirls,
        nbrUsers,
        totalNbrConsultation,
        topDoctors,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStatistique,
};
