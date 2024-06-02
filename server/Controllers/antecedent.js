const { antecedent, patient, patientAntecedent } = require("../Models");
// const { antecedents } = require("../data/dbData");

const createAntecedent = async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res
        .status(400)
        .json({ status: "failed", massage: "All fields are required" });
    }
    console.log(name, type);
    const newAntecedent = await antecedent.create({
      name,
      type,
    });
    if (newAntecedent) {
      return res.status(201).json({ status: "success", data: newAntecedent });
    }
    res.status(400).json({ status: "failed", massage: "échoué à créer ." });
    // await antecedent.destroy({ where: {} });
    // await antecedent.bulkCreate(antecedents);
    // return res.status(201).json({ status: "success", data: antecedents });
  } catch (error) {
    res.status(400).json({ status: "error", massage: error.message });
  }
};

const deleteAntecedent = async (req, res) => {
  try {
    if (!req.params.antecedentId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient id is required" });
    }
    await antecedent.destroy({
      where: { id: req.params.antecedentId },
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateAntecedent = async (req, res) => {
  try {
    if (!req.params.antecedentId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient id is required" });
    }
    const updatedAntecedent = await antecedent.update(req.body, {
      where: { id: req.params.antecedentId },
    });
    if (updateAntecedent) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getAllAntecedent = async (req, res) => {
  try {
    const allAntecedent = await antecedent.findAll();
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

const getAntecedentOfPatient = async (req, res) => {
  try {
    if (!req.params.patientId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient id is required" });
    }
    const allAntecedent = await patientAntecedent.findAll({
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

const addAntecedentToPatient = async (req, res) => {
  try {
    const { patientId, antecedentId } = req.body;
    if (!patientId || !antecedentId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "All fields are required" });
    }
    const existingPatient = await patient.findOne({ where: { id: patientId } });
    if (!existingPatient) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient introuvable." });
    }
    const existingAntecedent = await antecedent.findOne({
      where: { id: antecedentId },
    });
    if (!existingAntecedent) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Antecedent introuvable." });
    }
    const newPatientAntecedent = await patientAntecedent.create({
      patientId,
      antecedentId,
    });
    if (newPatientAntecedent) {
      return res
        .status(201)
        .json({ status: "success", data: newPatientAntecedent });
    }
    res.status(400).json({ status: "failed", massage: "échoué à créer ." });
  } catch (error) {
    res.status(400).json({ status: "error", massage: error.message });
  }
};

const removeAntecedentFromPatient = async (req, res) => {
  try {
    const { patientId, antecedentId } = req.body;
    console.log(patientId, antecedentId);
    if (!patientId || !antecedentId) {
      return res
        .status(400)
        .json({ status: "failed", massage: "All fields are required" });
    }
    const existingPatient = await patient.findOne({ where: { id: patientId } });
    if (!existingPatient) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Patient introuvable." });
    }
    const existingAntecedent = await antecedent.findOne({
      where: { id: antecedentId },
    });
    if (!existingAntecedent) {
      return res
        .status(400)
        .json({ status: "failed", massage: "Antecedent introuvable." });
    }
    const removedPatientAntecedent = await patientAntecedent.destroy({
      where: { patientId, antecedentId },
    });
    if (removedPatientAntecedent) {
      return res
        .status(201)
        .json({ status: "success", data: removedPatientAntecedent });
    }
    res.status(400).json({ status: "failed", massage: "échoué à supprimer ." });
  } catch (error) {
    res.status(400).json({ status: "error", massage: error.message });
  }
};

module.exports = {
  createAntecedent,
  getAntecedentOfPatient,
  updateAntecedent,
  deleteAntecedent,
  getAllAntecedent,
  addAntecedentToPatient,
  removeAntecedentFromPatient,
};
