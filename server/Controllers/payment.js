const { payment, patient } = require("../Models");
const { Sequelize } = require("sequelize");
const createPayment = async (req, res) => {
  try {
    const { patientId, receivedAmount, paymentMethod, actsData } = req.body;
    if (!patientId || !receivedAmount) {
      return res.status(400).json({
        status: "fail",
        message: "Veuillez remplir tous les champs",
      });
    }
    if (receivedAmount < 0) {
      return res.status(400).json({
        status: "fail",
        message: "Le montant reçu ne peut pas être négatif",
      });
    }
    const patientExists = await patient.findByPk(patientId);
    if (!patientExists) {
      return res.status(404).json({
        status: "fail",
        message: "patient non trouvé",
      });
    }
    const newPayment = await payment.create({
      patientId,
      receivedAmount,
      paymentMethod,
    });
    res.status(201).json({
      status: "success",
      message: "Reglement effectué avec succès",
      data: newPayment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "Erreur lors du reglement",
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const patients = await patient.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        [
          Sequelize.fn("SUM", Sequelize.col("payments.receivedAmount")),
          "totalReceivedAmount",
        ],
      ],
      include: [
        {
          model: payment,
          attributes: [],
        },
      ],
      group: ["patient.id", "patient.firstName", "patient.lastName"],
    });
    res.status(200).json({
      status: "success",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = {
  createPayment,
  getPayments,
};
