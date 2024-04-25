const { curve } = require("../Models");

const curveData = [];

const convertToCurve = (data) => {
  const curve = {
    Month: data[0],
    L: data[1],
    M: data[2],
    S: data[3],
    SD: data[4],
    SD3neg: data[5],
    SD2neg: data[6],
    SD1neg: data[7],
    SD0: data[8],
    SD1: data[9],
    SD2: data[10],
    SD3: data[11],
  };
  curveData.push(curve);
};

const createCurve = async (req, res) => {
  try {
    // const queryResult = await curve.create(req.body);
    // console.log(req.body);
    req.body.forEach((element, index) => {
      if (index > 0) {
        convertToCurve(element);
      }
    });
    console.log(curveData);
    return res.status(200).json({
      status: "success",
      // data: queryResult,
      msg: "Curve created successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteCurve = async (req, res) => {
  try {
    await curve.destroy();
    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createCurve,
  deleteCurve,
};
