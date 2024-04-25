const {
  medicament,
  ordonnance,
  consultation,
  prescription,
  patient,
  doctor,
} = require("../Models/index");
const db = require("../config/dbConfig.js");

const createOrdonnance = async (req, res) => {
  const { doctorId, patientId } = req.body.consultationData;
  try {
    let { consultationId, medicamentData } = req.body;
    if (!consultationId) {
      if (!doctorId || !patientId) {
        return res.status(400).json({
          status: "fail",
          message: "Doctor id and Patient id are required",
        });
      }
      const Doctor = await doctor.findByPk(doctorId);
      const Patient = await patient.findByPk(patientId);
      if (!Doctor) {
        return res
          .status(404)
          .json({ status: "fail", message: "Doctor not found" });
      }
      if (!Patient) {
        return res
          .status(404)
          .json({ status: "fail", message: "Patient not found" });
      }
      const newConsultation = await consultation.create({
        doctorId,
        patientId,
      });
      consultationId = newConsultation.id;
    }
    const foundConsultation = await consultation.findByPk(consultationId);
    if (!foundConsultation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Consultation not found" });
    }
    const ordonnanceData = await ordonnance.create({ consultationId });
    const ordonnanceId = ordonnanceData.id;
    medicamentData.forEach(async (item) => {
      const { medicamentId, frequency, duration, notes, eatingTime } = item;
      const foundMedicament = await medicament.findByPk(medicamentId);
      if (foundMedicament) {
        await prescription.create({
          medicamentId,
          ordonnanceId,
          frequency,
          duration,
          notes,
          eatingTime,
        });
      }
    });
    // const newPrescription = await prescription.bulkCreate(medicamentData);

    res.status(201).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getOrdonnanceById = async (req, res) => {
  try {
    if (!req.params.ordonnanceId) {
      return res
        .status(400)
        .json({ status: "fail", message: "Ordonnance id is required" });
    }
    const ordonnanceData = await ordonnance.findByPk(req.params.ordonnanceId, {
      include: medicament,
    });
    if (!ordonnanceData) {
      return res
        .status(404)
        .json({ status: "fail", message: "Ordonnance not found" });
    }
    res.status(200).json({ status: "success", data: ordonnanceData });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteOrdonnance = async (req, res) => {
  try {
    if (!req.params.ordonnanceId) {
      return res
        .status(400)
        .json({ status: "fail", message: "Ordonnance id is required" });
    }
    const foundOrdonnance = await ordonnance.findByPk(req.params.ordonnanceId);
    if (!foundOrdonnance) {
      return res
        .status(404)
        .json({ status: "fail", message: "Ordonnance not found" });
    }
    await ordonnance.destroy({
      where: {
        id: req.params.ordonnanceId,
      },
    });
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getAllOrdonnances = async (req, res) => {
  const { patientId } = req.params;
  try {
    if (!patientId) {
      return res
        .status(400)
        .json({ status: "fail", message: "Patient id is required" });
    }
    const prescriptions = await consultation.findAll({
      where: { patientId: patientId },
      attributes: [],
      include: [
        {
          model: ordonnance,
          attributes: ["id", "date"],
          order: [["date", "DESC"]],
          include: [
            {
              model: medicament,
            },
          ],
        },
      ],
    });
    //  const sql = `SELECT "consultation"."id", "ordonnances"."id" AS "ordonnances.id", "ordonnances"."date" AS "ordonnances.date", "ordonnances->medicaments"."id" AS "ordonnances.medicaments.id", "ordonnances->medicaments"."name" AS "ordonnances.medicaments.name", "ordonnances->medicaments"."type" AS "ordonnances.medicaments.type", "ordonnances->medicaments"."dosage" AS "ordonnances.medicaments.dosage", "ordonnances->medicaments->prescription"."id" AS "ordonnances.medicaments.prescription.id", "ordonnances->medicaments->prescription"."medicamentId" AS "ordonnances.medicaments.prescription.medicamentId", "ordonnances->medicaments->prescription"."ordonnanceId" AS "ordonnances.medicaments.prescription.ordonnanceId", "ordonnances->medicaments->prescription"."frequency" AS "ordonnances.medicaments.prescription.frequency", "ordonnances->medicaments->prescription"."duration" AS "ordonnances.medicaments.prescription.duration", "ordonnances->medicaments->prescription"."notes" AS "ordonnances.medicaments.prescription.notes", "ordonnances->medicaments->prescription"."eatingTime" AS "ordonnances.medicaments.prescription.eatingTime" FROM "consultations" AS "consultation" LEFT OUTER JOIN "ordonnances" AS "ordonnances" ON "consultation"."id" = "ordonnances"."consultationId" LEFT OUTER JOIN ( "prescriptions" AS "ordonnances->medicaments->prescription" INNER JOIN "medicaments" AS "ordonnances->medicaments" ON "ordonnances->medicaments"."id" = "ordonnances->medicaments->prescription"."medicamentId") ON "ordonnances"."id" = "ordonnances->medicaments->prescription"."ordonnanceId" WHERE "consultation"."patientId" = '1'`;

    // const sql = `SELECT c.* , o.* from consultations c
    // inner join ordonnances o on c.id = o.consultationsId
    // where "patientId" = ${patientId}`;
    // const prescriptions = await db.query(sql, {
    //   type: db.QueryTypes.SELECT,
    // });

    // console.log(prescriptions);

    res.status(200).json({ status: "success", data: prescriptions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createOrdonnance,
  getOrdonnanceById,
  deleteOrdonnance,
  getAllOrdonnances,
};
