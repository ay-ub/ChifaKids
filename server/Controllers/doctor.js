const { doctor } = require("../Models");
const createDoctor = async (req, res) => {
  try {
    console.log("from createDoctor = ", req.body);
    const result = await doctor.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createDoctor,
};
