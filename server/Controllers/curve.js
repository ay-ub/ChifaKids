const { curve } = require("../Models");

const createCurve = async (req, res) => {
  try {
    const { gender, type, data } = req.body;
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a data",
      });
    }
    await curve.destroy({
      where: {
        gender,
        type,
      },
    });
    const newCurve = await curve.create(req.body);
    return res.status(201).json({
      status: "success",
      data: newCurve,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getCurve = async (req, res) => {
  try {
    const { gender } = req.body;
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "sil vous plait entrer le type et le genre",
      });
    }
    const weightCurves = await curve.findAll({
      where: {
        type: "WEIGHT",
        gender,
      },
    });
    const heightCurves = await curve.findAll({
      where: {
        type: "HEIGHT",
        gender,
      },
    });
    return res.status(200).json({
      status: "success",
      data: {
        weightCurves,
        heightCurves,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports = {
  getCurve,
  createCurve,
};
