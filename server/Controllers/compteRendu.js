// const { compteRendu, consultation } = require("../Models");
const {
  consultation,
  compteRendu,
  doctor,
  patient,
  savedCmptRnd,
} = require("../Models");

const { Op } = require("sequelize");

const createCompteRendu = async (req, res) => {
  try {
    let {
      consultationId,
      commentaire,
      patientId,
      doctorId,
      date,
      isSaved,
      title,
    } = req.body;
    if (!consultationId && patientId && doctorId) {
      const foundPatient = await patient.findByPk(patientId);
      const foundDoctor = await doctor.findByPk(doctorId);
      if (!foundPatient || !foundDoctor) {
        return res
          .status(404)
          .json({ status: "fail", message: "patient or doctor not found" });
      }
      const newConsultation = await consultation.create({
        patientId,
        doctorId,
      });
      consultationId = newConsultation.id;
    }
    const newCompteRendu = await compteRendu.create({
      consultationId,
      commentaire,
      date,
    });
    if (isSaved) {
      await savedCmptRnd.create({
        title,
        commentaire,
      });
    }

    return res.status(201).json({ status: "success", data: newCompteRendu });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCompteRenduOfPatient = async (req, res) => {
  try {
    const { from, to } = req.body;
    if (!req.params.id) {
      return res
        .status(400)
        .json({ status: "fail", message: "id is required" });
    }
    const cmptData = await consultation.findAll({
      where: {
        patientId: req.params.id,
        date: {
          [Op.between]: [from, to],
        },
      },
      attributes: [],
      order: [["date", "DESC"]],
      include: [
        {
          model: compteRendu,
          attributes: ["id", "commentaire", "date"],
          order: [["date", "DESC"]],
        },
      ],
    });
    return res.status(200).json({ status: "success", data: cmptData });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateCompteRendu = async (req, res) => {
  try {
    const updated = await compteRendu.update(req.body, {
      where: { id: req.params.cmptRndId },
    });
    if (updated) {
      const updatedCompteRendu = await compteRendu.findOne({
        where: { id: req.params.cmptRndId },
      });
      return res.status(200).json({
        status: "success",
        data: updatedCompteRendu,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteCompteRendu = async (req, res) => {
  try {
    await compteRendu.destroy({
      where: { id: req.params.cmptRndId },
    });

    res.status(200).json({ status: "success", data: null });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getSavedCompteRendu = async (req, res) => {
  try {
    const savedCmptRndData = await savedCmptRnd.findAll();
    return res.status(200).json({ status: "success", data: savedCmptRndData });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteSavedCompteRendu = async (req, res) => {
  try {
    await savedCmptRnd.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({ status: "success", data: null });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createCompteRendu,
  getAllCompteRenduOfPatient,
  updateCompteRendu,
  deleteCompteRendu,
  getSavedCompteRendu,
  deleteSavedCompteRendu,
};
