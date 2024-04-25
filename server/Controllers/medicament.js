const { medicament } = require("../Models/index.js");

const addMedicament = async (req, res) => {
  try {
    // if (!req.body.name || !req.body.type || !req.body.dosage) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "name, type, and dosage are required",
    //   });
    // }
    // const newMedicament = await medicament.create(req.body);
    const deleteMedicament = await medicament.destroy({
      where: {},
    });
    const medications = [
      {
        name: "Metformin",
        type: "Antidiabetic",
        dosage: "1000Mg",
      },
      {
        name: "Lisinopril",
        type: "Antihypertensive",
        dosage: "10Mg",
      },
      {
        name: "Atorvastatin",
        type: "Lipid-lowering agent",
        dosage: "20Mg",
      },
      {
        name: "Levothyroxine",
        type: "Thyroid hormone replacement",
        dosage: "50Mg",
      },
      {
        name: "Paracetamol",
        type: "Analgesic",
        dosage: "500Mg",
      },
      {
        name: "Omeprazole",
        type: "Proton pump inhibitor",
        dosage: "20Mg",
      },
      {
        name: "Ciprofloxacin",
        type: "Antibiotic",
        dosage: "500Mg",
      },
      {
        name: "Fluoxetine",
        type: "Antidepressant",
        dosage: "20Mg",
      },
      {
        name: "Amlodipine",
        type: "Antihypertensive",
        dosage: "5Mg",
      },
      {
        name: "Warfarin",
        type: "Anticoagulant",
        dosage: "2.5Mg",
      },
    ];
    const newMedicament = await medicament.bulkCreate(medications);
    return res.status(201).json({
      status: "success",
      data: { medicament: newMedicament },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getAllMedicament = async (req, res) => {
  try {
    const allMedicament = await medicament.findAll();
    return res.status(200).json({
      status: "success",
      data: { medicament: allMedicament },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getMedicamentById = async (req, res) => {
  try {
    const tmpMedicament = await medicament.findByPk(req.params.id);
    return res.status(200).json({
      status: "success",
      data: { medicament: tmpMedicament },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteMedicament = async (req, res) => {
  try {
    await medicament.destroy({
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
      message: error.message,
    });
  }
};

const updateMedicament = async (req, res) => {
  try {
    console.log(req.body);
    const updateMedicament = await medicament.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updateMedicament[0] === 0) {
      return res.status(404).json({
        status: "error",
        message: "medicament not found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: updateMedicament,
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
  addMedicament,
  getAllMedicament,
  deleteMedicament,
  getMedicamentById,
  updateMedicament,
};
