const { antecedent, patient } = require("../Models");

const createAntecedent = async (req, res) => {
  try {
    const { name, type, patientId } = req.body;
    if (!name || !type || !patientId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "All fields are required" });
    }
    const existingPatient = await patient.findOne({ where: { id: patientId } });
    if (!existingPatient) {
      return res.status(400).json({ status: "failed", massage: "Patient introuvable." });
    }
    const newAntecedent = await antecedent.create({
      name,
      type,
      patientId,
    });
    if (newAntecedent) {
      return res.status(201).json({ status: "success", data: newAntecedent });
    }
    res
      .status(400)
      .json({ status: "failed", massage: "échoué à créer ." });
  } catch (error) {
    res.status(400).json({ status: "error", massage: error.message });
  }
};

const getAntecedentById = async (req, res) => {
  try {
    if (!req.params.patientId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient id is required" });
    }
    const allAntecedent = await antecedent.findAll({
      where: { patientId: req.params.patientId },
    });
    if (allAntecedent) {
      return res.status(200).json({ status: "success", data: allAntecedent });
    }
    res
      .status(400)
      .json({ status: "failed", massage: "failed to get antecedent" });
  } catch (error) {
    res.status(400).json({ status: "error", massage: error.message });
  }
};

const updateAntecedent = (req, res) => {
  try {
    if (!req.params.antecedentId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient id is required" });
    }
    const updatedAntecedent = antecedent.update(req.body, {
      where: { id: req.params.antecedentId },
    });
    console.log(updatedAntecedent);
    if (updateAntecedent) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteAntecedent =async (req, res) => {
  try {
    if (!req.params.antecedentId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient id is required" });
    }
    const deletedAntecedent = await antecedent.destroy({
      where: { id: req.params.antecedentId },
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createAntecedent,
  getAntecedentById,
  updateAntecedent,
  deleteAntecedent,
};
