const jwt = require("jsonwebtoken");
const { user, doctor, nurse } = require("../Models");

console.log("Protect Route Middleware");
const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    console.log("Decoded: ", decoded);
    const userData = await user.findOne({
      where: { email: decoded.email },
      attributes: { exclude: ["password"] },
    });

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized - Invalid User" });
    }
    if (
      userData.dataValues.typeUser === "ADMIN" ||
      userData.dataValues.typeUser === "DOCTOR"
    ) {
      const doctorData = await doctor.findOne({
        where: { userEmail: userData.dataValues.email },
      });
      console.log("Doctor Data: ", doctorData.dataValues.id);
      req.user = {
        ...userData.dataValues,
        id: doctorData.dataValues.id,
      };
    } else {
    }
    next();
  } catch (error) {
    console.error("Error on protectRoute: ", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectRoute;
