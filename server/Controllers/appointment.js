const { appointment, patient } = require("../Models");

const createAppointment = async (req, res) => {
  try {
    const { date, time, patientId } = req.body;
    if (!date || !time || !patientId) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const foundPatient = await patient.findByPk(patientId);
    if (!foundPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const newAppointment = await appointment.create(req.body);
    return res.status(201).json({ status: "success", data: newAppointment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointment.findAll({
      where: { patientId: req.params.id },
      order: [["date", "DESC"]],
    });
    return res.status(200).json({ status: "success", data: appointments });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await appointment.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedAppointment = await appointment.findOne({
        where: { id: id },
      });
      return res
        .status(200)
        .json({ status: "success", data: updatedAppointment });
    }
    throw new Error("Appointment not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await appointment.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(200).json({ status: "success", data: null });
    }
    throw new Error("Appointment not found");
  } catch (error) {
    return res.status(500).json({ staus: "error", error: error.message });
  }
};

const getNumbers = async (req, res) => {
  try {
    const today = new Date();
    const twoDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

    const appointments = await appointment.findAll({
      attributes: ["date", "time"],
      where: {
        date: twoDaysLater,
      },
      include: {
        model: patient,
        attributes: ["numberPhone", "firstName", "lastName"],
      },
    });

    console.log("appointments:", appointments);
    console.log("Notification sent");

    return res.status(200).json({ status: "success", data: appointments });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return res.status(500).json({ status: "error", error: error.message });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getNumbers,
};
