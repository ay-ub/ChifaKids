const { patient, consultation, doctor, user, payment } = require("../Models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const db = require("../config/dbConfig");

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

    const [mostAntecedent] =
      await db.query(`SELECT a.name AS label, COUNT(pa."antecedentId") AS value
            FROM "patientAntecedents" pa
            JOIN "antecedents" a ON "pa"."antecedentId" = a.id
            GROUP BY "pa"."antecedentId", a.name
            ORDER BY value DESC
            LIMIT 4;`);

    const [mostMedicament] =
      await db.query(`SELECT m."name" AS label, COUNT(p."medicamentId") AS value
                        FROM "prescriptions" p
                        JOIN "medicaments" m ON p."medicamentId" = m.id
                        GROUP BY p."medicamentId", m."name"
                        ORDER BY value DESC
                        LIMIT 4;`);

    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const totalAmount = await payment.findAll({
      attributes: [
        [sequelize.fn("DATE", sequelize.col("date")), "x"],
        [sequelize.fn("SUM", sequelize.col("receivedAmount")), "y"],
      ],
      where: {
        date: {
          [Op.gte]: lastMonth,
        },
      },
      group: [sequelize.fn("DATE", sequelize.col("date"))],
      order: [[sequelize.fn("DATE", sequelize.col("date")), "ASC"]],
    });

    res.status(200).json({
      status: "success",
      data: {
        nbrPatientBoys,
        nbrPatientGirls,
        nbrUsers,
        totalNbrConsultation,
        topDoctors,
        mostAntecedent,
        mostMedicament,
        totalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStatistique,
};
