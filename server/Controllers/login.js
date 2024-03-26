const { user } = require("../Models/index");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secretKey = process.env.ACCES_TOKEN_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await user.findByPk(email);
    if (!userInfo) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, userInfo.password);
      if (!passwordMatch) {
        return res.status(400).json({
          status: "fail",
          message: "Password or email invalid",
        });
      } else {
        const token = jwt.sign(
          {
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            typeUser: userInfo.typeUser,
          },
          secretKey,
          { expiresIn: "1h" }
        );
        console.log(token);
        return res.status(200).json({
          status: "success",
          data: {
            token: token,
            user: {
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

module.exports = {
  login,
};
