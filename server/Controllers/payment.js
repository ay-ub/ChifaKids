const { payment, patient, actPayment, act } = require("../Models");
const { paymentData } = require("../data/dbData");
const { Sequelize } = require("sequelize");
const createPayment = async (req, res) => {
  try {
    const { patientId, receivedAmount, paymentMethod, actsData } = req.body;
    if (!patientId) {
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
    actsData.forEach(async (act) => {
      await actPayment.create({
        paymentId: newPayment.id,
        actId: act,
      });
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
          // include: [
          //   {
          //     model: act,
          //   },
          // ],
        },
      ],
      group: ["patient.id", "patient.firstName", "patient.lastName"],
    });

    const patientsWithPayment = await patient.findAll({
      attributes: ["id", "firstName", "lastName"],
      include: [
        {
          model: payment,
          include: [
            {
              model: act,
            },
          ],
        },
      ],
    });
    res.status(200).json({
      status: "success",
      // patientsWithPayment,
      data: patientsWithPayment,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getPaymentOfPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res.status(400).json({
        status: "fail",
        message: "Veuillez fournir l'identifiant du patient",
      });
    }
    const patientExists = await patient.findByPk(patientId);
    if (!patientExists) {
      return res.status(404).json({
        status: "fail",
        message: "Patient non trouvé",
      });
    }

    res.status(200).json({
      status: "success",
      // data: patientPaymentsAndActs,
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
  getPaymentOfPatient,
};
