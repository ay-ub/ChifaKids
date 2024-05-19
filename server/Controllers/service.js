const { act } = require("../Models");

const createService = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ status: "fail", message: "nom et prix sont obligatoires" });
    }
    const foundService = await act.findOne({
      where: { name, price },
    });
    if (foundService) {
      return res
        .status(400)
        .json({ status: "fail", message: "act déjà existant" });
    }
    const newService = await act.create(req.body);
    return res.status(201).json({ status: "success", data: newService });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await act.findAll();
    return res.status(200).json({ status: "success", data: services });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceToDelete = await act.findByPk(id);
    if (!serviceToDelete) {
      return res
        .status(404)
        .json({ status: "fail", message: "service non trouvé" });
    }
    await serviceToDelete.destroy();
    return res.status(200).json({ status: "success", data: serviceToDelete });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceToUpdate = await act.update(req.body, { where: { id } });
    return res.status(200).json({ status: "success", data: null });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};
module.exports = {
  createService,
  getServices,
  deleteService,
  updateService,
};
