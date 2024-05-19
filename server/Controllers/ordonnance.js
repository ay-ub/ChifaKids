const {
  medicament,
  ordonnance,
  consultation,
  prescription,
  patient,
  doctor,
  savedOrdonnance,
  savedPrescription,
} = require("../Models/index");
const { Op } = require("sequelize");

const createOrdonnance = async (req, res) => {
  const { doctorId, patientId } = req.body.consultationData;
  try {
    let { consultationId, medicamentData, title, isSaved } = req.body;
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
    let savedOrdonnanceId;
    if (isSaved) {
      const savedOrdData = await savedOrdonnance.create({
        title,
      });
      savedOrdonnanceId = savedOrdData.id;
    }

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
        if (isSaved) {
          const saveOrdonnaceExist = await savedOrdonnance.findByPk(
            savedOrdonnanceId
          );
          if (!saveOrdonnaceExist) {
            return res
              .status(404)
              .json({ status: "fail", message: "Saved ordonnance not found" });
          }
          await savedPrescription.create({
            medicamentId,
            savedOrdonnanceId,
            frequency,
            duration,
            notes,
            eatingTime,
          });
        }
      }
    });

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
  const { from, to } = req.body;
  try {
    if (!patientId) {
      return res
        .status(400)
        .json({ status: "fail", message: "Patient id is required" });
    }
    const prescriptions = await ordonnance.findAll({
      attributes: ["id", "date"],
      order: [["date", "DESC"]],
      where: {
        date: {
          [Op.between]: [from, to],
        },
      },
      include: [
        {
          model: medicament,
        },
        {
          model: consultation,
          attributes: [],
          where: { patientId: patientId },
        },
      ],
    });
    res.status(200).json({ status: "success", data: prescriptions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getSavedOrdonnances = async (req, res) => {
  try {
    const prescriptions = await savedOrdonnance.findAll({
      include: medicament,
    });
    res.status(200).json({ status: "success", data: prescriptions });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteSavedOrdonnance = async (req, res) => {
  try {
    if (!req.params.savedOrdonnanceId) {
      return res
        .status(400)
        .json({ status: "fail", message: "Saved ordonnance id is required" });
    }
    const foundSavedOrdonnance = await savedOrdonnance.findByPk(
      req.params.savedOrdonnanceId
    );
    if (!foundSavedOrdonnance) {
      return res
        .status(404)
        .json({ status: "fail", message: "Saved ordonnance not found" });
    }
    await savedOrdonnance.destroy({
      where: {
        id: req.params.savedOrdonnanceId,
      },
    });
    res.status(200).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createOrdonnance,
  getOrdonnanceById,
  deleteOrdonnance,
  getAllOrdonnances,
  getSavedOrdonnances,
  deleteSavedOrdonnance,
};
