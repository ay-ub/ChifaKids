const { user } = require("../Models/index");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, typeUser } = req.body;
    const userExist = await user.findByPk(email);
    if (userExist) {
      return res.status(500).json({
        status: "fail",
        massege: "password or email invalid",
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

      return res.status(201).json({
        status: "success",
        data: { user: NewUser },
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      massege: error.message,
    });
  }
};

module.exports = {
  register,
};
