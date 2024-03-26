const { consultation, doctor, patient } = require("../Models");

// const newConsultation = async (req, res) => {
//   try {
//     const { doctorId, patientId, date, motif, diagnostic, height, weight } =
//       req.body;
//     const Doctor = await doctor.findByPk(doctorId);
//     const Patient = await patient.findByPk(patientId);
//     if (!Doctor || !Patient) {
//       return res.status(404).send("doctor or patient not found");
//     }
//     await Doctor.addPatient(Patient, {
//       through: {
//         date,
//         motif,
//         diagnostic,
//         height,
//         weight,
//       },
//     });

//     const find = await patient.findAll({
//       where: { id: patientId },
//       attributes: ["id", "firstName"],
//       include: [
//         {
//           model: doctor,
//           as: "doctors",

//           through: {
//             attributes: ["date", "motif", "diagnostic", "height", "weight"],
//           },
//         },
//       ],
//     });

//     return res
//       .status(201)
//       .json({ message: "Consultation added successfully", data: find });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

const newConsultation = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    const Doctor = await doctor.findByPk(doctorId);
    const Patient = await patient.findByPk(patientId);
    console.log(Patient, Doctor);
    if (!Doctor || !Patient) {
      return res.status(404).send("doctor or patient not found");
    }
    const queryResult = await consultation.create(req.body);
    return res
      .status(201)
      .json({ message: "Consultation added successfully", data: queryResult });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getConsultationByPatientId = async (req, res) => {
  try {
    const queryResult = await consultation.findAll({
      where: { patientId: req.params.id },
    });
    return res.status(200).json(queryResult);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  newConsultation,
  getConsultationByPatientId,
};
