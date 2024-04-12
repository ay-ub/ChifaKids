const { medicament } = require("../Models/index.js");

const addMedicament = async (req, res) => {
  try {
    const newMedicament = await medicament.create(req.body);
    // const deleteMedicament = await medicament.destroy({
    //   where: {},
    // });
    // const medications = [
    //   {
    //     name: "Metformin",
    //     type: "Antidiabetic",
    //     dosage: "1000",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Lisinopril",
    //     type: "Antihypertensive",
    //     dosage: "10",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Atorvastatin",
    //     type: "Lipid-lowering agent",
    //     dosage: "20",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Levothyroxine",
    //     type: "Thyroid hormone replacement",
    //     dosage: "50",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Paracetamol",
    //     type: "Analgesic",
    //     dosage: "500",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Omeprazole",
    //     type: "Proton pump inhibitor",
    //     dosage: "20",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Ciprofloxacin",
    //     type: "Antibiotic",
    //     dosage: "500",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Fluoxetine",
    //     type: "Antidepressant",
    //     dosage: "20",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Amlodipine",
    //     type: "Antihypertensive",
    //     dosage: "5",
    //     dosageUnit: "mg",
    //   },
    //   {
    //     name: "Warfarin",
    //     type: "Anticoagulant",
    //     dosage: "2.5",
    //     dosageUnit: "mg",
    //   },
    // ];
    // const newMedicament = await medicament.bulkCreate(medications);
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
