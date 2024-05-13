const { user, doctor, nurse } = require("../Models/index");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, typeUser } = req.body;
    const userExist = await user.findByPk(email);
    if (userExist) {
      return res.status(500).json({
        status: "fail",
        data: { massege: "cet email est deja utilisé" },
      });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const NewUser = await user.create({
        email,
        password: passwordHash,
        firstName,
        lastName,
        typeUser,
      });

      if (NewUser.typeUser === "DOCTOR" || NewUser.typeUser === "ADMIN") {
        await doctor.create({ userEmail: NewUser.email });
      }
      if (NewUser.typeUser === "NURSE") {
        await nurse.create({ userEmail: NewUser.email });
      }

      return res.status(201).json({
        status: "success",
        data: {
          user: {
            email: NewUser.email,
            firstName: NewUser.firstName,
            lastName: NewUser.lastName,
            typeUser: NewUser.typeUser,
          },
        },
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      massege: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["email", "firstName", "lastName", "typeUser"],
    });
    return res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      massege: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await user.findByPk(email);
    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        data: { massege: "cet email n'existe pas" },
      });
    } else {
      await user.destroy({
        where: {
          email,
        },
      });
      return res.status(200).json({
        status: "success",
        data: { massege: "utilisateur supprimé" },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      massege: error.message,
    });
  }
};

const updateUserType = async (req, res) => {
  try {
    const { email } = req.params;
    const { typeUser } = req.body;
    const userExist = await user.findByPk(email);
    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        data: { massege: "cet email n'existe pas" },
      });
    } else {
      const updated = await user.update(
        { typeUser },
        {
          where: {
            email,
          },
        }
      );
      if (updated[0] === 0) {
        return res.status(404).json({
          status: "fail",
          data: { massege: "cet email n'existe pas" },
        });
      }
      if (typeUser === "DOCTOR" || typeUser === "ADMIN") {
        await nurse.destroy({
          where: {
            userEmail: email,
          },
        });
        await doctor.create({ userEmail: email });
      }
      if (typeUser === "NURSE") {
        await doctor.destroy({
          where: {
            userEmail: email,
          },
        });
        await nurse.create({ userEmail: email });
      }
      return res.status(200).json({
        status: "success",
        data: { massege: "utilisateur modifié" },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      massege: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUserType,
};
