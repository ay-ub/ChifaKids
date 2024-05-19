const { user, doctor, nurse } = require("../Models/index");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await user.findByPk(email);
    if (!userInfo) {
      return res.status(404).json({
        status: "fail",
        message: "email incorrect",
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, userInfo.password);
      if (!passwordMatch) {
        return res.status(400).json({
          status: "fail",
          message: "mot de passe incorrect",
        });
      } else {
        const token = jwt.sign(
          {
            email: userInfo.email,
          },
          process.env.ACCES_TOKEN_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, {
          maxAge: 60 * 60 * 1000,
        });

        if (userInfo.typeUser === "DOCTOR" || userInfo.typeUser === "ADMIN") {
          const doctorInfo = await doctor.findOne({
            where: { userEmail: email },
          });
          return res.status(200).json({
            status: "success",
            data: {
              user: {
                id: doctorInfo.id,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                typeUser: userInfo.typeUser,
              },
            },
          });
        }
        const nurseInfo = await nurse.findOne({
          where: { userEmail: email },
        });
        return res.status(200).json({
          status: "success",
          data: {
            user: {
              id: nurseInfo.id,
              email: userInfo.email,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              typeUser: userInfo.typeUser,
            },
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      status: "success",
      message: "utilisateur déconnecté",
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

module.exports = {
  login,
  logout,
};
