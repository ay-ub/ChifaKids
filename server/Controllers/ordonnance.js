const { medicament, ordonnance, consultation } = require("../Models/index");

const createOrdonnance = async (req, res) => {
  try {
    const { consultationId, medicamentData } = req.body;
    if (!consultationId) {
      return res
        .status(400)
        .json({ status: "fail", message: "Consultation id is required" });
    }
    const foundConsultation = await consultation.findByPk(consultationId);
    if (!foundConsultation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Consultation not found" });
    }

    const newOrdonnance = await ordonnance.create();
    await newOrdonnance.setConsultation(foundConsultation); // reliate ordonnance to consultation
    medicamentData.forEach(async (item) => {
      const { medicamentId, frequency, duration, notes, eatingTime } = item;
      console.log("item = ", item);
      const foundMedicament = await medicament.findByPk(medicamentId);
      if (foundMedicament) {
        await newOrdonnance.addMedicament(foundMedicament, {
          through: {
            frequency,
            duration,
            notes,
            eatingTime,
          },
        });
      }
    });

    res.status(201).json({ status: "success", data: newOrdonnance });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const getOrdonnance = async (req, res) => {
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

module.exports = {
  createOrdonnance,
  getOrdonnance,
};
