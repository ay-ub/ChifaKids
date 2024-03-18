const { patient } = require("../Models/index.js");

const addPatient = async (req, res) => {
  try {
    const newPatient = await patient.create(req.body);
    res.status(201).json({
      status: "success",
      data: newPatient,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.where,
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const allPatient = await patient.findAll();
    return res.status(200).json({
      status: "success",
      data: { patient: allPatient },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.where,
    });
  }
};

const getPatient = async (req, res) => {
  try {
    const tmpPatient = await patient.findByPk(req.params.id);
    return res.status(200).json({
      status: "success",
      data: { patient: tmpPatient },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const deletePatient = await patient.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.where,
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const updatePatient = await patient.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatePatient[0] === 0) {
      return res.status(404).json({
        status: "error",
        message: "patient not found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: updatePatient,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error.where,
    });
  }
};

module.exports = {
  addPatient,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
};
